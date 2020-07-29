import React from 'react';
import About from './components/About';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className='app'>
      <h1>Conway's Game of Life</h1>

      <div className='content'>
        <Board/>
        <About />
      </div>
    </div>
  )
}

export default App;

