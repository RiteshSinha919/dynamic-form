import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { elevatorStore } from '../../store/ElevatorStore';

const Elevator: React.FC = observer(() => {
  const [fromFloor, setFromFloor] = useState('');
  const [toFloor, setToFloor] = useState('');

  const handleRequestElevator = () => {
    const floor = parseInt(fromFloor);
    if (floor >= 1 && floor <= 10) {
      elevatorStore.requestElevator(floor);
      setFromFloor('');
    }
  };

  const handleSetDestination = () => {
    const floor = parseInt(toFloor);
    if (floor >= 1 && floor <= 10) {
      elevatorStore.setDestination(floor);
      setToFloor('');
    }
  };

  const getShortId = (id: string) => id.substring(0, 8);

  return (
    <div>
      <h1>Elevator Simulation</h1>
      
      <div>
        <h2>Add Elevator</h2>
        <button 
          onClick={elevatorStore.addElevator}
          disabled={elevatorStore.elevators.length >= elevatorStore.maxElevators}
        >
          Add Elevator ({elevatorStore.elevators.length}/{elevatorStore.maxElevators})
        </button>
      </div>

      <div>
        <h2>Request Elevator</h2>
        <div>
          <label>From Floor (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            value={fromFloor}
            onChange={(e) => setFromFloor(e.target.value)}
            disabled={elevatorStore.userRequest.isWaiting}
          />
          <button 
            onClick={handleRequestElevator}
            disabled={!fromFloor || elevatorStore.userRequest.isWaiting}
          >
            Request Elevator
          </button>
        </div>
      </div>

      {elevatorStore.userRequest.isWaiting && (
        <div>
          <h2>Select Destination</h2>
          <div>
            <label>To Floor (1-10):</label>
            <input
              type="number"
              min="1"
              max="10"
              value={toFloor}
              onChange={(e) => setToFloor(e.target.value)}
            />
            <button 
              onClick={handleSetDestination}
              disabled={!toFloor}
            >
              Set Destination
            </button>
          </div>
        </div>
      )}

      <div>
        <h2>Elevator Status</h2>
        <div>
          {elevatorStore.elevators.map(elevator => (
            <div key={elevator.id}>
              <strong>Elevator {getShortId(elevator.id)}:</strong>
              <span> Floor {elevator.currentFloor}</span>
              <span> Direction: {elevator.direction}</span>
              <span> Moving: {elevator.isMoving ? 'Yes' : 'No'}</span>
              {elevator.targetFloor && (
                <span> Target: {elevator.targetFloor}</span>
              )}
              {elevatorStore.assignedElevatorId === elevator.id && (
                <span> (Assigned to user)</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>User Status</h2>
        <div>
          {elevatorStore.userRequest.isWaiting ? (
            <div>
              <p>Waiting for elevator on floor {elevatorStore.userRequest.fromFloor}</p>
              {elevatorStore.assignedElevator && (
                <p>Assigned elevator: {getShortId(elevatorStore.assignedElevator.id)} (currently on floor {elevatorStore.assignedElevator.currentFloor})</p>
              )}
              {elevatorStore.userRequest.toFloor && (
                <p>Destination: Floor {elevatorStore.userRequest.toFloor}</p>
              )}
            </div>
          ) : (
            <p>No active request</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Elevator; 