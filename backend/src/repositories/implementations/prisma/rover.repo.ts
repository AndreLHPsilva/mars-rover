import { Rover } from "@entities/rover";
import { IRoverRepoContract } from "@repositories/rover.contract";
import { prisma } from ".";
import { CartesianPlane } from "@entities/cartesianPlane";
import { format } from "date-fns";

export default class RoverRepository implements IRoverRepoContract {
  constructor(private repository = prisma.rover) {}

  async getAll(): Promise<Rover[]> {
    const rovers = await this.repository.findMany({
      include: { positions: true },
    });

    const roversClass = rovers.map((rover: any) => {
      const plan = new CartesianPlane(rover.plan_size_x, rover.plan_size_y);
      const instRover = new Rover(plan);

      const positions = rover.positions;

      positions.forEach((position: any) => {
        instRover.setPosition({
          direction: position.direction,
          x: position.axisX,
          y: position.axisY,
        });
      });

      return instRover;
    });

    return roversClass;
  }

  async insert(rover: Rover): Promise<Rover> {
    const cartesianPlane = rover.getCartesianPlane();

    const sizeX = cartesianPlane.getSizeX();
    const sizeY = cartesianPlane.getSizeY();

    const roverData = {
      plan_size_x: sizeX,
      plan_size_y: sizeY,
    };

    const roverCreated = await this.repository.create({
      data: {
        ...roverData,
      },
    });

    rover.setId(roverCreated.id);
    rover.setCreatedAt(format(roverCreated.created_at, "yyyy-MM-dd"));
    rover.setUpdatedAt(format(roverCreated.updated_at, "yyyy-MM-dd"));

    return rover;
  }
}
