export type ElevatorDirection = 'idle' | 'up' | 'down';

export interface Elevator {
  id: string;
  currentFloor: number;
  direction: ElevatorDirection;
  isMoving: boolean;
  targetFloor?: number;
}

export interface UserRequest {
  fromFloor: number;
  toFloor?: number;
  isWaiting: boolean;
} 