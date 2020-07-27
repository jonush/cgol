import React, { useState, useCallback, useRef } from 'react';
import { glider, spaceships, oscillator } from '../gridPresets';
import { produce } from 'immer';
import play from '../images/play.svg';
import pause from '../images/pause.svg';
import random from '../images/random.svg';
import clear from '../images/cancel.svg';
import glide from '../images/gliders.png';
import space from '../images/spaceships.png';
import osc from '../images/oscillators.png';
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
    // initialize game board
    const [ grid, setGrid ] = useState(() => {
        return generateGrid();
    });

    // set the speed of the game
    const [ speed, setSpeed ] = useState(160)

    // log the generations
    const [ gen, setGen ] = useState(0);

    // manage the current running state of the game board
    const [ running, setRunning ] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSim = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
    
        // increment the generations as the game progresses
        setGen(g => g + 1)

        // cellular automata core functionality
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
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
    <div className='board'>      
        <div className='game-controls'>
            <div className='board-controls'>
                {/* play/pause the game */}
                <button onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSim();
                    }
                }}>{running ? <img alt='pause' className='pause' src={pause}/> : <img alt='play' className='play' src={play}/>}</button>

                {/* clear the game board */}
                <button onClick={() => {
                    setGrid(generateGrid());
                    setGen(0);
                    setRunning(false);
                }}><img alt='clear' className='clear' src={clear}/></button>

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
                }}><img alt='random' className='random' src={random}/></button>
            </div>

            {/* speed controls */}
            <div className='speed-controls'>
                <button className={speed === 320 ? "current" : "inactive"} onClick={() => setSpeed(320)}>.5x</button>
                <button className={speed === 160 ? "current" : "inactive"} onClick={() => setSpeed(160)}>1x</button>
                <button className={speed === 80 ? "current" : "inactive"} onClick={() => setSpeed(80)}>2x</button>
                <button className={speed === 10 ? "current" : "inactive"} onClick={() => setSpeed(10)}>8x</button>
            </div>
        </div>
        

        <div className='game'>
            {/* presets */}
            <div className='presets'>
                <button onClick={() => setGrid(glider)}><div>Gliders</div><img src={glide}/></button>
                <button onClick={() => setGrid(spaceships)}><div>Spaceships</div><img src={space}/></button>
                <button onClick={() => setGrid(oscillator)}><div>Oscillators</div><img src={osc}/></button>
            </div>

            {/* allow user to populate game board with cells on click*/}
            <div className='grid' style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 15px)`}}>
                {
                    grid.map((rows, i) =>
                        rows.map((col, j) => (
                            <div
                                className='cell'
                                key={`${i}-${j}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                    })
                                    return !running ? setGrid(newGrid) : null;
                                }}
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: grid[i][j] ? "#49fb35" : undefined,
                                    border: "solid 1px #49fb35",
                                    boxShadow: grid[i][j] ? '0px 0px 20px #49fb35' : undefined
                                }}
                            />
                        ))
                    )
                }
            </div>
        </div>

        {/* display the current generation */}
        <div className='generation'>Generation <span>{gen}</span></div>
    </div>
  );
}

export default Board;