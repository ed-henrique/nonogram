# Nonogram [WIP]

This is a Nonogram generator that can randomly allocate pixels or read pixel art, and includes a solver.

## What Will I Learn?

- How to use vanilla JS
- How to use AI to solve nonograms
- How to create masks based on images

## Remaining Tasks

### Features

- Cross mode (So that you can mark the squares which are wrong)
- Generate some crosses around the board from the beginning to help the player
- Create a win animation
- Implement click and drag for faster playing
- Add error count
- Slightly fade already-made blocks to help the player
- Read a 15x15 image to turn it into a nonogram
- Create AI to solve nonograms automatically, with some fun methods to watch
- Add some ads to get revenue in the future

### Bugs

- Two-digit numbers are displaying oddly right now
  - Fix by using `<span>` tags
- There is a rare case of 0 squares in a line (Occurs 1 in ~32800 times)

### Optimizations

- Rendering on click feels sluggish
  - Maybe use `<canvas>` as an alternative to a grid of `<button>`s (This needs further research for its performance)