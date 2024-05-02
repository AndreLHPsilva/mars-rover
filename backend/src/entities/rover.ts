import { ApiError } from "@errors/ApiError";
import { CartesianPlane } from "./cartesianPlane";
import { IPosition, TypeDirection } from "./position";

interface IMoveRover {
  instructions: string;
}

export class Rover {
  private positions: IPosition[] = [];
  private id?: string;
  private created_at?: string;
  private updated_at?: string;

  constructor(private cartesianPlane: CartesianPlane) {}

  removeFirstPosition() {
    const firstPosition = this.positions.shift();

    return firstPosition;
  }

  removeLastPosition() {
    const lastPosition = this.positions.pop();

    return lastPosition;
  }

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;

    return this;
  }

  getCreatedAt() {
    return this.created_at;
  }

  setCreatedAt(created_at: string) {
    this.created_at = created_at;

    return this;
  }

  getUpdatedAt() {
    return this.updated_at;
  }

  setUpdatedAt(updated_at: string) {
    this.updated_at = updated_at;

    return this;
  }

  getCartesianPlane() {
    return this.cartesianPlane;
  }

  formatInitialPosition(initialPosition: string): IPosition {
    const splitted = initialPosition.split("");

    if (splitted.length > 3 || splitted.length == 0) {
      throw new ApiError("Posição inicial incorreta, deve ter 3 caracteres.");
    }

    const [x, y, direction] = splitted;

    return {
      direction: direction as TypeDirection,
      x: Number(x),
      y: Number(y),
    };
  }

  setPosition(position: IPosition) {
    const isAvailablePosition =
      this.cartesianPlane.verifyAvailablePosition(position);

    if (!isAvailablePosition) {
      throw new ApiError(
        `Posição X: ${position.x}, Y: ${position.y}, Direção: ${position.direction} não disponível.`
      );
    }

    return this.positions.push(position);
  }

  getPositions(): IPosition[] {
    return this.positions;
  }

  getCurrentPosition(): IPosition {
    if (this.positions.length == 0) {
      throw new ApiError("Nenhum movimento encontrado");
    }

    return this.positions[this.positions.length - 1];
  }

  moveRover({ instructions }: IMoveRover) {
    for (const instruction of instructions) {
      switch (instruction) {
        case "L":
          this.turnLeft();
          break;
        case "R":
          this.turnRight();
          break;
        case "M":
          this.moveForward();
          break;
        default:
          throw new ApiError(`Movimento não disponível: ${instruction}`);
      }
    }
  }

  private turnLeft() {
    const currentPosition = this.getCurrentPosition();

    switch (currentPosition.direction) {
      case "N":
        this.setPosition({
          ...currentPosition,
          direction: "W",
        });
        break;
      case "W":
        this.setPosition({
          ...currentPosition,
          direction: "S",
        });
        break;
      case "S":
        this.setPosition({
          ...currentPosition,
          direction: "E",
        });
        break;
      case "E":
        this.setPosition({
          ...currentPosition,
          direction: "N",
        });
        break;
    }
  }

  private turnRight() {
    const currentPosition = this.getCurrentPosition();

    switch (currentPosition.direction) {
      case "N":
        this.setPosition({
          ...currentPosition,
          direction: "E",
        });
        break;
      case "E":
        this.setPosition({
          ...currentPosition,
          direction: "S",
        });
        break;
      case "S":
        this.setPosition({
          ...currentPosition,
          direction: "W",
        });
        break;
      case "W":
        this.setPosition({
          ...currentPosition,
          direction: "N",
        });
        break;
    }
  }

  private moveForward() {
    const currentPosition = this.getCurrentPosition();

    let newPosition = {
      ...currentPosition,
    };

    switch (currentPosition.direction) {
      case "N":
        newPosition.y += 1;
        break;
      case "S":
        newPosition.y -= 1;
        break;
      case "E":
        newPosition.x += 1;
        break;
      case "W":
        newPosition.x -= 1;
        break;
    }

    this.setPosition(newPosition);
  }
}
