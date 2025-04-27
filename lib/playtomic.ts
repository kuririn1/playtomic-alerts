import { Tournaments } from '../types';

/**
 * Fetches available Playtomic tournaments
 * @returns Promise with array of Tournament objects
 */
export async function getPlaytomicTournaments(): Promise<Tournaments> {
  const url = 'https://api.playtomic.io/v2/tournaments?available_places=true&coordinate=53.013790199999995,18.5984437&enable_price_calculation=true&page=0&radius=50000&registration_status=OPEN&size=20&sort=start_date,created_at,ASC&sport_id=PADEL&status=PENDING&visibility=PUBLIC';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to fetch Playtomic tournaments: ${response.status} ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data as Tournaments;
}
