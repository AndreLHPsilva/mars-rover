
import { CartesianPlane } from '@entities/cartesianPlane';
import { Rover } from '@entities/rover';
import { ApiError } from '@errors/ApiError';

describe('Rover', () => {
  let cartesianPlane: CartesianPlane;
  let rover: Rover;

  beforeEach(() => {
    cartesianPlane = new CartesianPlane(10, 10);
    rover = new Rover(cartesianPlane);
  });

  test('should format initial position correctly', () => {
    const initialPosition = rover.formatInitialPosition('12N');

    expect(initialPosition).toEqual({ x: 1, y: 2, direction: 'N' });
  });

  test('should throw an error for incorrect initial position format', () => {
    expect(() => {
      rover.formatInitialPosition('1234');
    }).toThrow("Posição inicial incorreta, deve ter 3 caracteres.");

    expect(() => {
      rover.formatInitialPosition('');
    }).toThrow("Posição inicial incorreta, deve ter 3 caracteres.");
  });

  test('should set and get ID correctly', () => {
    rover.setId('12345');
    expect(rover.getId()).toBe('12345');
  });

  test('should set and get created_at correctly', () => {
    const date = new Date().toISOString();
    rover.setCreatedAt(date);
    expect(rover.getCreatedAt()).toBe(date);
  });

  test('should set and get updated_at correctly', () => {
    const date = new Date().toISOString();
    rover.setUpdatedAt(date);
    expect(rover.getUpdatedAt()).toBe(date);
  });

  test('should add and get positions correctly', () => {
    const position = "12N";

    const initialPositionFormatted =
    rover.formatInitialPosition(position);
    rover.setPosition(initialPositionFormatted);

    const positionExpected = { x: 1, y: 2, direction: 'N' };
    expect(rover.getPositions()).toContainEqual(positionExpected);
  });

  test('should remove first position correctly', () => {
    const initPosition = "12N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    rover.setPosition({ x: 3, y: 4, direction: 'E' });

    const firstPosition = rover.removeFirstPosition();

    expect(firstPosition).toEqual({ x: 1, y: 2, direction: 'N' });
    expect(rover.getPositions()).not.toContainEqual(firstPosition);
  });

  test('should remove last position correctly', () => {
    const initPosition = "12N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    rover.setPosition({ x: 3, y: 4, direction: 'E' });

    const lastPosition = rover.removeLastPosition();

    expect(lastPosition).toEqual({ x: 3, y: 4, direction: 'E' });
    expect(rover.getPositions()).not.toContainEqual(lastPosition);
  });

  test('should move forward correctly', () => {
    const initPosition = "00N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    rover.moveRover({ instructions: 'M' });
    expect(rover.getCurrentPosition()).toEqual({ x: 0, y: 1, direction: 'N' });
  });

  test('should turn left correctly', () => {
    const initPosition = "00N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    rover.moveRover({ instructions: 'L' });
    expect(rover.getCurrentPosition()).toEqual({ x: 0, y: 0, direction: 'W' });
  });

  test('should turn right correctly', () => {
    const initPosition = "00N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    rover.moveRover({ instructions: 'R' });
    expect(rover.getCurrentPosition()).toEqual({ x: 0, y: 0, direction: 'E' });
  });

  test('should throw error for unavailable position', () => {
    jest.spyOn(cartesianPlane, 'verifyAvailablePosition').mockReturnValue(false);
    const initialPositionFormatted =
    rover.formatInitialPosition("99S");
  
    expect(() => {
      rover.setPosition(initialPositionFormatted);
    }).toThrow(ApiError);
  });

  test('should throw error for invalid move instructions', () => {
    const initPosition = "00N";
    const initialPositionFormatted = rover.formatInitialPosition(initPosition);
    rover.setPosition(initialPositionFormatted);
    expect(() => {
      rover.moveRover({ instructions: 'X' });
    }).toThrow("Movimento não disponível: X");
  });
});
