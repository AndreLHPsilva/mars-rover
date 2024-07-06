import { Rover } from "@entities/rover";
import { IRoverRepoContract } from "@repositories/rover.contract";
import { format } from "date-fns";

export class RoverInMemoryRepository implements IRoverRepoContract {
  private rovers: Rover[] = [];

  static instance: RoverInMemoryRepository;

  private constructor() {}

  public static getInstance(): RoverInMemoryRepository {
    if (!RoverInMemoryRepository.instance) {
      RoverInMemoryRepository.instance = new RoverInMemoryRepository();
    }

    return RoverInMemoryRepository.instance;
  }

  async getAll(): Promise<Rover[]> {
    return this.rovers;
  }

  async insert(rover: Rover): Promise<Rover> {
    const cartesianPlane = rover.getCartesianPlane();
    const sizeX = cartesianPlane.getSizeX();
    const sizeY = cartesianPlane.getSizeY();

    const roverData = {
      id: crypto.randomUUID(),
      plan_size_x: sizeX,
      plan_size_y: sizeY,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const roverInstance = new Rover(cartesianPlane);
    roverInstance.setId(roverData.id);
    roverInstance.setCreatedAt(format(roverData.created_at, "yyyy-MM-dd"));
    roverInstance.setUpdatedAt(format(roverData.updated_at, "yyyy-MM-dd"));

    this.rovers.push(roverInstance);

    return roverInstance;
  }
}
