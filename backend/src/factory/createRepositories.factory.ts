import PositionInMemoryRepository from "@repositories/implementations/memory/position.repo";
import { RoverInMemoryRepository } from "@repositories/implementations/memory/rover.repo";
import PositionRepository from "@repositories/implementations/prisma/position.repo";
import RoverRepository from "@repositories/implementations/prisma/rover.repo";

export class CreateRepositories {
  static execute() {
    if (process.env.NODE_ENV === "test") {
      return {
        roverRepository: RoverInMemoryRepository.getInstance(),
        positionRepository: PositionInMemoryRepository.getInstance(),
      };
    } else {
      return {
        roverRepository: new RoverRepository(),
        positionRepository: new PositionRepository(),
      };
    }
  }
}
