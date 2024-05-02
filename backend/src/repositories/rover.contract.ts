import { Rover } from "entities/rover";

export interface IRoverRepoContract{
  getAll(): Promise<Rover[]>
  insert(rover: Rover): Promise<Rover>
}