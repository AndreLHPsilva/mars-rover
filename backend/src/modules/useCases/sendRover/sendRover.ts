import { IPosition } from "@entities/position";
import { prisma } from "@repositories/implementations/prisma";
import { CartesianPlane } from "entities/cartesianPlane";
import { Rover } from "entities/rover";
import { IPositionRepoContract } from "repositories/position.contract";
import { IRoverRepoContract } from "repositories/rover.contract";

interface IInputDTO {
  initialPosition: string;
  instruction: string;
  planSize: {
    sizeX: number;
    sizeY: number;
  };
}

interface IResponseDTO {
  positions: IPosition[];
  instruction: string;
  initialPosition: IPosition;
  planSize: {
    sizeX: number;
    sizeY: number;
  };
  lastPosition?: IPosition;
}

export default class SendRoverUseCase {
  constructor(
    private roverRepository: IRoverRepoContract,
    private positionRepository: IPositionRepoContract
  ) {}

  async execute({
    initialPosition,
    instruction,
    planSize,
  }: IInputDTO): Promise<IResponseDTO> {
    const cartesianPlane = new CartesianPlane(planSize.sizeX, planSize.sizeY);
    const rover = new Rover(cartesianPlane);
    const initialPositionFormatted =
      rover.formatInitialPosition(initialPosition);
    rover.setPosition(initialPositionFormatted);

    rover.moveRover({
      instructions: instruction,
    });

    const dataReturn: IResponseDTO = {
      positions: [...rover.getPositions()],
      instruction,
      initialPosition: initialPositionFormatted,
      planSize,
    };

    const lastPosition = rover.removeLastPosition();
    const firstPosition = rover.removeFirstPosition();

    lastPosition!.is_last_position = true;
    firstPosition!.is_first_position = true;

    dataReturn["lastPosition"] = lastPosition;

    const roverCreated = await this.roverRepository.insert(rover);

    const positions = rover.getPositions();

    await Promise.all([
      await this.positionRepository.insert({
        position: firstPosition!,
        rover_id: roverCreated.getId()!,
      }),
      ...positions.map(async (position) => {
        await this.positionRepository.insert({
          position,
          rover_id: roverCreated.getId()!,
        });
      }),
      await this.positionRepository.insert({
        position: lastPosition!,
        rover_id: roverCreated.getId()!,
      }),
    ]);

    const teste = await prisma.rover.findMany({});
    const teste2 = await prisma.position.findMany({});
    console.log(teste, teste2);

    return dataReturn;
  }
}
