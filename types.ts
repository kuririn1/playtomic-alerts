// Type definitions for the tournament JSON output

export type Tournaments= Tournament[];

export interface Tournament {
  tournament_id: string;
  name: string;
  sport_id: string;
  start_date: string; // ISO 8601
  end_date: string;   // ISO 8601
  type: string;
  visibility: string;
  teams: Team[];
  tenant: Tenant;
  available_places: number;
  registration_info: RegistrationInfo;
  cancellation_info: null;
  metadata: Metadata;
  status: string;
  resources: any[];
  images: any[];
}

export interface Team {
  team_id: string;
  players: Player[];
  avg_level_value: number;
  owner_id: string | null;
}

export interface Player {
  name: string;
  user_id: string;
  contact_id: string | null;
  picture: string | null;
  email: string | null;
  gender: string | null;
  phone: string | null;
  level_value: number;
  referrer_user_id: string;
  communications_language: string | null;
}

export interface Tenant {
  tenant_id: string;
  tenant_name: string;
  address: Address;
  images: string[];
  properties: Record<string, any>;
  playtomic_status: string;
}

export interface Address {
  street: string;
  postal_code: string;
  city: string;
  sub_administrative_area: string;
  administrative_area: string;
  country: string;
  country_code: string;
  coordinate: Coordinate;
  timezone: string;
}

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface RegistrationInfo {
  open_time: string; // ISO 8601
  closing_time: string; // ISO 8601
  min_players: number;
  max_players: number;
  gender: string;
  min_level_value: number;
  max_level_value: number;
  level_policy: string;
  configurations: Configuration[];
  custom_price_configurations: any[];
  registrations: Registration[];
  status: string;
  gender_policy: string;
}

export interface Configuration {
  registration_type: string;
  price: string;
}

export interface Registration {
  user_id: string;
  contact_id: string | null;
  price: string;
  custom_price: string;
  payment_price: string;
  fixed_price: string | null;
  payment_id: string | null;
  payment_reference: string | null;
  payment_method_type: string | null;
  registration_date: string; // ISO 8601
  registration_type: string;
  payment_date: string | null;
  payer_id: string | null;
  payable: boolean;
  invited_by_manager: boolean;
  paid_at_merchant: boolean;
  payment_b2b_billing_type: string | null;
  category_id: string | null;
}

export interface Metadata {
  description: string;
  prizes: string;
  welcome_pack: string;
}
