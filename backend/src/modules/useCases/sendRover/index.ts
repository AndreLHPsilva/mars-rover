import RoverRepository from "@repositories/implementations/prisma/rover.repo";
import SendRoverUseCase from "./sendRover";
import PositionRepository from "@repositories/implementations/prisma/position.repo";

const roverRepository = new RoverRepository();
const positionRepository = new PositionRepository();
export const sendRoverUseCase = new SendRoverUseCase(
  roverRepository,
  positionRepository
);
