import { CreateRepositories } from "@factory/createRepositories.factory";
import SendRoverUseCase from "./sendRover";

const { roverRepository, positionRepository } = CreateRepositories.execute();

export const sendRoverUseCase = new SendRoverUseCase(
  roverRepository,
  positionRepository
);
