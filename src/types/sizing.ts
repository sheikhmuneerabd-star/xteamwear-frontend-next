export interface PlayerRow {
  size: string;
  name: string;
  number: string;
}

export interface SizingFormData {
  teamName: string;
  playerNumberOption: string;
  logo: string;
  sponsorOption: string;
  sponsorLocation: string;
  note: string;
  players: PlayerRow[];
}