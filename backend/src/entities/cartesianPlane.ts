import { ApiError } from "@errors/ApiError";
import { IPosition } from "./position";

export class CartesianPlane {
  constructor(private sizeX: number, private sizeY: number) {}

  getSizeX() {
    return this.sizeX;
  }

  setSizeX(sizeX: number) {
    this.sizeX = sizeX;

    return this;
  }

  getSizeY() {
    return this.sizeY;
  }

  setSizeY(sizeY: number) {
    this.sizeY = sizeY;

    return this;
  }

  verifyAvailablePosition(position: IPosition): boolean {
    if (this.getSizeX() == 0) {
      throw new ApiError("Tamanho do eixo X zerado.");
    }

    if (this.getSizeY() == 0) {
      throw new ApiError("Tamanho do eixo Y zerado.");
    }

    const maximumPositionXAxis = this.getSizeX() - 1;
    const maximumPositionYAxis = this.getSizeY() - 1;

    return (
      position.x >= 0 &&
      position.x <= maximumPositionXAxis &&
      position.y >= 0 &&
      position.y <= maximumPositionYAxis
    );
  }
}
