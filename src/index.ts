export { PlaytomicAlertsWorkflow } from './workflow';

export default {
	async fetch(req) {
		const url = new URL(req.url);
		url.pathname = '/__scheduled';
		url.searchParams.append('cron', '* * * * *');
		return new Response(`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`);
	},
	async scheduled(event, env, ctx): Promise<void> {
		await env.WORKFLOW.create();
	},
} satisfies ExportedHandler<Env>;
