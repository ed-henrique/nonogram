# Nonogram

This is a Nonogram generator that can randomly allocate pixels or read pixel art, and includes a solver.

## What Will I Learn?

- How to use vanilla JS
- How to use AI to solve nonograms
- How to create masks based on images

## Remaining Tasks

### Features

- [x] Cross mode (So that you can mark the squares which are wrong)
- [x] Generate some crosses around the board to help the player
- [ ] Create a win animation
- [x] Implement click and drag for faster playing
- [ ] Add error count
- [ ] Slightly fade already-made blocks to help the player
- [ ] Read a 15x15 image to turn it into a nonogram
- [ ] Create AI to solve nonograms automatically, with some fun methods to watch
- [ ] Add some ads to get revenue in the future
- [ ] Allow the user to change the difficulty of the nonogram
  - [ ] Size
  - [ ] Randomness

### Bugs

- [x] Two-digit numbers are displaying oddly right now
  - [x] Fix by using `<span>` tags
- [ ] CSS takes a while to render after the HTML, so the screen flashes before displaying correctly
- [ ] Dragging is OP because it doesn't limit to the row/column you started the drag in
- [ ] If you click inside the board, drag to the outside, and then release, you basically activate a dragging mode without the need to press the mouse button
- [ ] There is a rare case of 0 squares in a line (Occurs 1 in ~32800 times)
  - [ ] Check for it when creating a new board

### Optimizations

- [ ] Rendering on click feels sluggish
  - [ ] Maybe use `<canvas>` as an alternative to a grid of `<button>`s (This needs further research for its performance)
- [ ] Refactor