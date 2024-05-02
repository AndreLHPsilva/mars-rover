import { IPosition } from "@entities/position";

export interface IInsert {
  position: IPosition;
  rover_id: string;
}

export interface IPositionRepoContract {
  getAll(rover_id: string): Promise<IPosition[]>;
  insert(data: IInsert): Promise<IPosition>;
}
