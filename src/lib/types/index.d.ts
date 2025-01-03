export interface ILocation {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface ILandingZone {
  id: string;
  full_name: string;
  status: string;
  location: ILocation;
  landing_type: string;
  attempted_landings: number;
  successful_landings: number;
  wikipedia: string;
  details: string;
}