import { describe, it, expect } from 'vitest';
import { sendSlackMessage } from '../lib/slack';
import { getPlaytomicTournaments } from '../lib/playtomic';

describe('Check lib', () => {
	it('send slacks message', async () => {
		const jsonResponse = await sendSlackMessage('test');

		expect(jsonResponse).toMatchObject({
			ok: true,
		});
	});

    it('get playtomic tournaments', async () => {
        const tournaments = await getPlaytomicTournaments();
        expect(tournaments.length).toBeGreaterThan(0);
        expect(tournaments[0]).toMatchObject({
            tournament_id: expect.any(String),
            name: expect.any(String),
        });
    });
});
		