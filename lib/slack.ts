import { env } from 'cloudflare:workers';

/**
 * Sends a message to Slack
 * @param text The message text to send
 * @returns Promise with the response from Slack API
 */
export async function sendSlackMessage(text: string): Promise<Response> {
  const url = 'https://slack.com/api/chat.postMessage';
  
  const payload = {
    channel: 'C08PXR38542',
    text,
    username: 'Padel'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SLACK_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to send Slack message: ${response.status} ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
