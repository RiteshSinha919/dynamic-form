import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { Elevator, ElevatorDirection, UserRequest } from '../../types/ElevatorType';

class ElevatorStore {
  elevators: Elevator[] = [
    { id: uuidv4(), currentFloor: Math.floor(Math.random() * 10) + 1, direction: 'idle', isMoving: false },
    { id: uuidv4(), currentFloor: Math.floor(Math.random() * 10) + 1, direction: 'idle', isMoving: false },
    { id: uuidv4(), currentFloor: Math.floor(Math.random() * 10) + 1, direction: 'idle', isMoving: false },
  ];
  
  userRequest: UserRequest = { fromFloor: 0, isWaiting: false };
  maxElevators: number = 5;
  floorsPerSecond: number = 0.5;  
  assignedElevatorId?: string;
  private movementInterval?: NodeJS.Timeout;

  constructor() {
    makeAutoObservable(this);
    this.startMovementTimer();
  }

  addElevator = () => {
    if (this.elevators.length >= this.maxElevators) return;
    
    this.elevators.push({
      id: uuidv4(),
      currentFloor: Math.floor(Math.random() * 10) + 1,
      direction: 'idle',
      isMoving: false,
    });
  };

  requestElevator = (fromFloor: number) => {
    this.userRequest = { fromFloor, isWaiting: true };
    this.assignedElevatorId = undefined;
    this.assignBestElevator(fromFloor);
  };

  setDestination = (toFloor: number) => {
    this.userRequest = { ...this.userRequest, toFloor };
  };

  private assignBestElevator = (fromFloor: number) => {
    const availableElevators = this.elevators.filter(elevator => {
      if (elevator.isMoving) return false;
      if (elevator.direction === 'idle') return true;
      
      if (elevator.direction === 'up' && elevator.currentFloor <= fromFloor) return true;
      if (elevator.direction === 'down' && elevator.currentFloor >= fromFloor) return true;
      
      return false;
    });

    if (availableElevators.length === 0) return;

    const bestElevator = availableElevators.reduce((closest, current) => {
      const closestDistance = Math.abs(closest.currentFloor - fromFloor);
      const currentDistance = Math.abs(current.currentFloor - fromFloor);
      return currentDistance < closestDistance ? current : closest;
    });

    this.assignedElevatorId = bestElevator.id;
    this.moveElevator(bestElevator.id, fromFloor);
  };

  private moveElevator = (elevatorId: string, targetFloor: number) => {
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) {
      elevator.targetFloor = targetFloor;
      elevator.isMoving = true;
    }
  };

  private updateElevatorFloor = (elevatorId: string, floor: number) => {
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) {
      elevator.currentFloor = floor;
    }
  };

  private setElevatorDirection = (elevatorId: string, direction: ElevatorDirection) => {
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) {
      elevator.direction = direction;
    }
  };

  private setElevatorMoving = (elevatorId: string, isMoving: boolean) => {
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) {
      elevator.isMoving = isMoving;
    }
  };

  private completeRequest = () => {
    this.userRequest = { fromFloor: 0, isWaiting: false };
    this.assignedElevatorId = undefined;
  };

  private startMovementTimer = () => {
    this.movementInterval = setInterval(() => {
      runInAction(() => {
        this.elevators.forEach(elevator => {
          if (elevator.isMoving && elevator.targetFloor !== undefined) {
            const currentFloor = elevator.currentFloor;
            const targetFloor = elevator.targetFloor;
            
            if (currentFloor === targetFloor) {
              this.setElevatorMoving(elevator.id, false);
              this.setElevatorDirection(elevator.id, 'idle');
              
              if (this.userRequest.isWaiting && 
                  currentFloor === this.userRequest.fromFloor && 
                  this.userRequest.toFloor && 
                  this.assignedElevatorId === elevator.id) {
                this.moveElevator(elevator.id, this.userRequest.toFloor);
              }
              else if (this.userRequest.isWaiting && 
                       currentFloor === this.userRequest.toFloor && 
                       this.assignedElevatorId === elevator.id) {
                this.completeRequest();
              }
            } else {
              const direction = currentFloor < targetFloor ? 'up' : 'down';
              const newFloor = direction === 'up' ? currentFloor + 1 : currentFloor - 1;
              
              this.setElevatorDirection(elevator.id, direction);
              this.updateElevatorFloor(elevator.id, newFloor);
            }
          }
        });
      });
    }, 1000 / this.floorsPerSecond); 
  };

  findBestElevator = (fromFloor: number): Elevator | null => {
    const availableElevators = this.elevators.filter(elevator => {
      if (elevator.isMoving) return false;
      if (elevator.direction === 'idle') return true;
      
      if (elevator.direction === 'up' && elevator.currentFloor <= fromFloor) return true;
      if (elevator.direction === 'down' && elevator.currentFloor >= fromFloor) return true;
      
      return false;
    });

    if (availableElevators.length === 0) return null;

    return availableElevators.reduce((closest, current) => {
      const closestDistance = Math.abs(closest.currentFloor - fromFloor);
      const currentDistance = Math.abs(current.currentFloor - fromFloor);
      return currentDistance < closestDistance ? current : closest;
    });
  };

  get assignedElevator(): Elevator | undefined {
    return this.assignedElevatorId 
      ? this.elevators.find(e => e.id === this.assignedElevatorId)
      : undefined;
  }

  dispose = () => {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
    }
  };
}

export const elevatorStore = new ElevatorStore(); 