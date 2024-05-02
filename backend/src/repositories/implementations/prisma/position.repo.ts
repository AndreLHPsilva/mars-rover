import { prisma } from ".";
import { format } from "date-fns";
import {
  IInsert,
  IPositionRepoContract,
} from "@repositories/position.contract";
import { IPosition } from "@entities/position";

export default class PositionRepository implements IPositionRepoContract {
  constructor(private repository = prisma.position) {}

  async getAll(rover_id: string): Promise<IPosition[]> {
    const positions = await this.repository.findMany({
      where: {
        rover_id,
      },
    });

    const positionsFormatted: IPosition[] = positions.map((position: any) => {
      return {
        direction: position.direction,
        created_at: format(position.created_at, "yyyy-MM-dd"),
        updated_at: format(position.updated_at, "yyyy-MM-dd"),
        id: position.id,
        rover_id: position.rover_id,
        x: position.axisX,
        y: position.axisY,
      };
    });

    return positionsFormatted;
  }

  async insert({ position, rover_id }: IInsert): Promise<IPosition> {
    const positionData = {
      axisX: position.x,
      axisY: position.y,
      direction: position.direction,
      is_last_position: position.is_last_position
        ? position.is_last_position
        : false,
    };

    const positionCreated = await this.repository.create({
      data: {
        ...positionData,
        rover: {
          connect: { id: rover_id },
        },
      },
    });

    return {
      direction: positionCreated.direction,
      created_at: format(positionCreated.created_at, "yyyy-MM-dd"),
      updated_at: format(positionCreated.updated_at, "yyyy-MM-dd"),
      id: positionCreated.id,
      rover_id: positionCreated.rover_id,
      x: positionCreated.axisX,
      y: positionCreated.axisY,
    };
  }
}
