// Generate 9x9 sudoku cells dynamically and retain styling/behaviour
window.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('sudoku-grid');
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '9';
    input.className = 'sudoku-cell';
    grid.appendChild(input);
  }
  // Restrict each input to accept only a single digit (0-9)
  grid.querySelectorAll('.sudoku-cell').forEach(function(input) {
    input.addEventListener('input', function(e) {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 1) val = val[0];
      e.target.value = val;
    });
  });

 

  // Add listener to the Reset button
  document.getElementById('reset-btn').addEventListener('click', function() {
    const cells = grid.querySelectorAll('.sudoku-cell');
    cells.forEach(function(input) {
      input.value = '';
    });
  });

  // JavaScript Program to solve Sudoku problem

// Function to check if it is safe to place num at mat[row][col]
function isSafe(mat, row, col, num) {
    // Check if num exists in the row
    for (let x = 0; x < 9; x++)
        if (mat[row][x] === num)
            return false;

    // Check if num exists in the col
    for (let x = 0; x < 9; x++)
        if (mat[x][col] === num)
            return false;

    // Check if num exists in the 3x3 sub-matrix
    const startRow = row - (row % 3),
          startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (mat[i + startRow][j + startCol] === num)
                return false;

    return true;
}

// Function to solve the Sudoku problem
function solveSudokuRec(mat, row, col) {

    // base case: Reached nth column of the last row
    if (row === 8 && col === 9)
        return true;

    // If last column of the row go to the next row
    if (col === 9) {
        row++;
        col = 0;
    }

    // If cell is already occupied then move forward
    if (mat[row][col] !== 0)
        return solveSudokuRec(mat, row, col + 1);

    for (let num = 1; num <= 9; num++) {
        // If it is safe to place num at current position
        if (isSafe(mat, row, col, num)) {
            mat[row][col] = num;
            if (solveSudokuRec(mat, row, col + 1))
                return true;
            mat[row][col] = 0;
        }
    }

    return false;
}

function solveSudoku(mat) {
    return solveSudokuRec(mat, 0, 0);
}

  // Add listener to the Solve button
  // This will read the grid, solve the Sudoku, and update the grid
  // with the solved values
  // It assumes the grid is filled with numbers from 0-9, where 0 represents an empty cell
  // and the rest are filled with numbers 1-9.
  document.getElementById('solve-btn').addEventListener('click', function() {
    const cells = grid.querySelectorAll('.sudoku-cell');
    const matrix = [];
    for (let row = 0; row < 9; row++) {
      const rowArr = [];
      for (let col = 0; col < 9; col++) {
        const idx = row * 9 + col;
        let val = cells[idx].value;
        rowArr.push(val === '' ? 0 : parseInt(val, 10));
      }
      matrix.push(rowArr);
    }
    let solvable = solveSudoku(matrix);
    // Update the grid with the solved values
    if (!solvable)
      alert('Sudoku cannot be solved'); // Test
    else
    {
      for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const idx = row * 9 + col;
        cells[idx].value = matrix[row][col] || '';
      }
    }
    }
    
  });
});
