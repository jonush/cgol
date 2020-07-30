# Conway's Game of Life

## About

Conway's Game of Life was invented by mathematician John Conway. It is game that requires no players and will simulate life cycles on its own. This configuration does allow for initial interaction when setting up the game board. There are also options to randomize cell population or select preset cell grids. You can also control the speed of each cycle. The grid and cell structure were designed using `<div>`'s. Players have the option to manually populate the grid with cells.

## Resources

This project was made using React. All features of the app were built using React hooks and function components. Most of the functionality was built using vanilla JavaScript. A part of the grid/cell logic was built using [immer](https://immerjs.github.io/immer/docs/introduction), an immutable-state package. The sound effects were implemented using a [useSound](https://joshwcomeau.com/react/announcing-use-sound-react-hook/) hook.

## Components

The app is split into **two** main components and loaded inside `<App />`:

- `<About />`: Information about Conway's Game of Life and its rules
- `<Board />`: All of the game logic for game controls, the grid, and cells

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
