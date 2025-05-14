import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import { getPlaytomicTournaments } from '../lib/playtomic';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { lastTournaments } from '../db/schema';
import { sendSlackMessage } from '../lib/slack';

// Array of tournament name keyword groups to filter by (case insensitive)
// A tournament name must contain ALL keywords within ANY of these groups
const TOURNAMENT_NAME_KEYWORD_GROUPS = [
  ["Americano", "początkujących"],  // Must contain both "Americano" AND "dla"
  ["Americano", "C2"],  // Must contain both "Americano" AND "C2"
  ["Mexicano", "C1"],   // Must contain both "Mexicano" AND "C1"
  ["Mexicano", "początkujących"],   // Must contain both "Mexicano" AND "początkujących"
  ["Król", "kortu"],         // Must contain "Król kortu"
  ["Akademia"],
  ["Szkolenie"]
];

export class PlaytomicAlertsWorkflow extends WorkflowEntrypoint<Env, void> {
  async run(event: WorkflowEvent<void>, step: WorkflowStep) {
    // Can access bindings on `this.env`

    const tournaments = await step.do('get playtomic tournaments', async () => {
        return await getPlaytomicTournaments();
    });

    const prevTournaments = await step.do('load tournaments', async () => {
        const db = drizzle(this.env.DB, {schema: {lastTournaments}});
        const lastTournamentsData = await db.select().from(lastTournaments);
        return lastTournamentsData[0]?.data;
    });

    await step.do('compare tournaments', async () => {
        if (prevTournaments) {
            // Find new tournaments (those not in previous tournaments list)
            const newTournaments = tournaments.filter(t => !prevTournaments.some(pt => pt.tournament_id === t.tournament_id));
            
            // Filter new tournaments to include only those with names matching all keywords in any keyword group
            const filteredTournaments = newTournaments.filter(tournament => {
                const tournamentName = tournament.name.toLowerCase();
                
                // Check if the tournament name matches any of the keyword groups
                return TOURNAMENT_NAME_KEYWORD_GROUPS.some(keywordGroup => {
                    // For a group to match, ALL keywords in that group must be in the tournament name
                    return keywordGroup.every(keyword => 
                        tournamentName.includes(keyword.toLowerCase())
                    );
                });
            });
            
            if (filteredTournaments.length > 0) {
                await step.do('send slack message', async () => {
                    await sendSlackMessage(`Playtomic: ${filteredTournaments.map(t => t.name).join(', ')}`);
                });
            }
        }
    });

    await step.do('save tournaments', async () => {
        const db = drizzle(this.env.DB, {schema: {lastTournaments}});
        const existingRecords = await db.select().from(lastTournaments);
        
        if (existingRecords.length > 0) {
            // Update existing record
            await db.update(lastTournaments)
                .set({ data: tournaments })
                .where(eq(lastTournaments.id, existingRecords[0].id));
        } else {
            // Insert new record
            await db.insert(lastTournaments).values({
                data: tournaments
            });
        }
    });

    //await step.sleep('wait and repeat', '30 seconds');
  }
}