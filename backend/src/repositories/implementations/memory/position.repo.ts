import { IPosition } from "@entities/position";
import {
  IInsert,
  IPositionRepoContract,
} from "@repositories/position.contract";

export default class PositionInMemoryRepository
  implements IPositionRepoContract
{
  static instance: PositionInMemoryRepository;
  positions: IPosition[] = [];

  private constructor() {}

  public static getInstance(): PositionInMemoryRepository {
    if (!PositionInMemoryRepository.instance) {
      PositionInMemoryRepository.instance = new PositionInMemoryRepository();
    }

    return PositionInMemoryRepository.instance;
  }

  async getAll(rover_id: string): Promise<IPosition[]> {
    const positions = this.positions.filter(
      (position) => position.rover_id === rover_id
    );
    return positions;
  }

  async insert(data: IInsert): Promise<IPosition> {
    const { position, rover_id } = data;
    const positionData = {
      x: position.x,
      y: position.y,
      direction: position.direction,
      is_last_position: position.is_last_position
        ? position.is_last_position
        : false,
      is_first_position: position.is_first_position
        ? position.is_first_position
        : false,

      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      id: crypto.randomUUID(),
      rover_id,
    };

    this.positions.push(positionData);

    return positionData;
  }
}
