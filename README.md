
# Puzzle Solver Web App

A responsive web-based dashboard for solving Sudoku and Nonogram puzzles, built with modular HTML, CSS, and JavaScript files.

## Features
- Dashboard to select between Sudoku and Nonogram solvers
- Sudoku: 9x9 grid, responsive design, input validation, solve/reset, hints, modal for unsolvable puzzles
- Nonogram: Dynamic clue input, responsive grid, solve/reset, hints, show/hide clues, example puzzles
- Consistent dark/light theme, modern UI, mobile-friendly

## Usage
1. Open `index.html` in your browser to access the dashboard.
2. Select either Sudoku Solver or Nonogram Solver.
3. Use the respective solver's features to solve your puzzle.

## Project Structure
- `index.html` — Dashboard for selecting puzzle type
- `styles.css` — Dashboard styles
- `sudoku.html` — Sudoku solver UI
- `sudoku-logic.js` — Sudoku grid generation, input handling, and solving logic
- `sudoku-styles.css` — Sudoku solver styles
- `nonogram.html` — Nonogram solver UI
- `nono-logic.js` — Nonogram solving logic
- `nonogram-styles.css` — Nonogram solver styles

## How it works
- Sudoku grid and Nonogram clues are generated dynamically
- Sudoku uses a backtracking algorithm for solving
- Nonogram uses logic-based solving from clues
- All UI is fully responsive and touch-friendly

## Developers
- [sayantanBarik](https://github.com/sayantanBarik)
- [GitHub Copilot](https://github.com/features/copilot)

