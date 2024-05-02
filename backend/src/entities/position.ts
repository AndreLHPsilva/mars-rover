export type TypeDirection = "N" | "S" | "E" | "W";

export interface IPosition {
  x: number;
  y: number;
  direction: TypeDirection;
  id?: string;
  created_at?: string;
  updated_at?: string;
  rover_id?: string;
  is_last_position?: boolean;
  is_first_position?: boolean;
}