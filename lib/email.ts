import { Resend } from 'resend';
import type { Tournament } from '../types';
import { env } from 'cloudflare:workers';

const polishDays = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

function formatStartDate(startDate: string): string {
	const date = new Date(startDate);
	const dayOfWeek = polishDays[date.getDay()];
	const time = date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Warsaw' });
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${dayOfWeek} ${time} (${day}-${month}-${year})`;
}

export async function sendEmailNotification(tournament: Tournament) {
	const resend = new Resend(env.RESEND_TOKEN);
	const subject = `🎾 ${tournament.name} - ${formatStartDate(tournament.start_date)}`;

	try {
		const { data, error } = await resend.emails.send({
			from: `Playtomic Alerts <${env.EMAIL_FROM}>`,
			to: [env.EMAIL],
			subject: subject,
			text: `${tournament.available_places} wolnych miejsc`,
		});

		if (error) {
			console.error(`Error sending email for tournament ${tournament.tournament_id}:`, error);
			return;
		}

		console.log(`Email for tournament ${tournament.tournament_id} sent successfully: ${data?.id}`);
	} catch (error) {
		console.error(`Failed to send email for tournament ${tournament.tournament_id}:`, error);
	}
}
