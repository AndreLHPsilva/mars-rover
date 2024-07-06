import { CartesianPlane } from "@entities/cartesianPlane";
import { TypeDirection } from "@entities/position";

describe('CartesianPlane', () => {
  let cartesianPlane: CartesianPlane;

  beforeEach(() => {
    cartesianPlane = new CartesianPlane(3, 3);
  })

  test('should set and get sizeX correctly', () => {
    const sizeX = 3;
    cartesianPlane.setSizeX(sizeX);
    expect(cartesianPlane.getSizeX()).toBe(sizeX);
  })

  test('should set and get sizeY correctly', () => {
    const sizeY = 3;
    cartesianPlane.setSizeY(sizeY);
    expect(cartesianPlane.getSizeY()).toBe(sizeY);
  })

  test('should verify if position is available', () => {
    const direction: TypeDirection = 'N';
    const position = {x: 0, y: 0, direction};

    const resp = cartesianPlane.verifyAvailablePosition(position);

    expect(resp).toBe(true);
  })

  test('should return false if position is not available', () => {
    const direction: TypeDirection = 'N';
    const position = {x: 5, y: 0, direction};

    const resp = cartesianPlane.verifyAvailablePosition(position);

    expect(resp).toBe(false);
  })

  test('should throw error for size X is 0', () => {
    const newCartesianPlane = new CartesianPlane(0, 3);
    const direction: TypeDirection = 'N';
    const position = {x: 5, y: 0, direction};

    expect(() => {
      newCartesianPlane.verifyAvailablePosition(position)
    }).toThrow("Tamanho do eixo X zerado.");
  })

  test('should throw error for size Y is 0', () => {
    const newCartesianPlane = new CartesianPlane(3, 0);
    const direction: TypeDirection = 'N';
    const position = {x: 5, y: 0, direction};

    expect(() => {
      newCartesianPlane.verifyAvailablePosition(position)
    }).toThrow("Tamanho do eixo Y zerado.");
  })
})