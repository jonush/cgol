import React, { useState, useCallback, useRef } from 'react';
import { glider, spaceships, oscillator } from '../gridPresets';
import { produce } from 'immer';
import '../App.css';

// number of rows and columns for the grid
const numRows = 25;
const numCols = 25;

// reference for checking neighbor cells
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 0],
  [1, 1],
  [-1, 0]
]

// generate the grid
const generateGrid = () => {
  const rows = [];
    
  for ( let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }

  return rows;
}

const Board = () => {
  const [ grid, setGrid ] = useState(() => {
    return generateGrid();
  });

  const [ speed, setSpeed ] = useState(400)
  const [ gen, setGen ] = useState(0);

  // manage the current running state of the game board
  const [ running, setRunning ] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // increment the generations as the game progresses
    setGen(g => g + 1)

    // cellular automata core functionality
    setGrid(g => {
        return produce(g, gridCopy => {
            for (let i = 0; i< numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    let neighbors = 0;   
                    
                    // check the game board for neighboring cells for the next generation
                    operations.forEach(([x, y]) => {
                        const newI = (i + x + numCols) % numCols;
                        const newJ = (j + y + numRows) % numRows;
                        if(newI >= 0 & newI < numRows && newJ >= 0 && newJ < numCols) {
                            neighbors += g[newI][newJ]
                        }
                    })

                    // rules for cell life
                    if (neighbors < 2 || neighbors > 3) {
                        gridCopy[i][j] = 0;
                    } else if (g[i][j] === 0 && neighbors === 3) {
                        gridCopy[i][j] = 1;
                    }
                }
            }
        })
    })

    // set the timeout for each generation
    setTimeout(runSim, speed);
  }, [speed])

  return (
    <div>
        {/* presets */}
        <div>
            <button onClick={() => setGrid(glider)}>Glider</button>
            <button onClick={() => setGrid(spaceships)}>Spaceships</button>
            <button onClick={() => setGrid(oscillator)}>Oscillator</button>
        </div>
      
        {/* speed controls */}
        <div>
            <button onClick={() => setSpeed(1200)}>.5x</button>
            <button onClick={() => setSpeed(600)}>1x</button>
            <button onClick={() => setSpeed(300)}>2x</button>
            <button onClick={() => setSpeed(50)}>6x</button>
        </div>
      
        {/* play/pause the game */}
        <button onClick={() => {
            setRunning(!running);
            if (!running) {
                runningRef.current = true;
                runSim();
            }
        }}>{running ? 'Pause' : 'Play'}</button>

        {/* clear the game board */}
        <button onClick={() => {
            setGrid(generateGrid());
            setGen(0);
            setRunning(false);
        }}>Clear</button>

        {/* generate a random game board */}
        <button onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(
                Array.from(Array(numCols), () => (Math.random() > .5 ? 1 : 0))
                );
            }
            setGrid(rows);
            setRunning(false);
            setGen(0);
        }}>Random</button>

        {/* display the current generation */}
        <div>Generation: {gen}</div>

        {/* allow user to populate game board with cells on click*/}
        <div style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
        {
            grid.map((rows, i) =>
            rows.map((col, j) => (
            <div
                key={`${i}-${j}`}
                onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                        gridCopy[i][j] = grid[i][j] ? 0 : 1;
                    })
                    return !running ? setGrid(newGrid) : null;
                }}
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[i][j] ? "black" : undefined,
                    border: "solid 1px black"
                }}
            />))
            )}
        </div>
    </div>
  );
}

export default Board;