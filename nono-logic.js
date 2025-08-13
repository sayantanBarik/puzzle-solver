// Nonogram UI and loading modal logic
document.addEventListener('DOMContentLoaded', function() {
  // Track which input to focus after re-render
  let focusNext = { type: null, index: null };
  const loadingScreen = document.getElementById('loading-screen');
  const form = document.getElementById('nonogram-form');
  const rowsInputs = document.getElementById('rows-inputs');
  const colsInputs = document.getElementById('cols-inputs');
  const addRowBtn = document.getElementById('add-row');
  const addColBtn = document.getElementById('add-col');
  const showExampleBtn = document.getElementById('show-example');

  // Initial state
  let rowClues = [[1]];
  let colClues = [[1]];

  function renderClueInputs() {
    // Render row clues
    rowsInputs.innerHTML = '';
  rowClues.forEach((clueArr, rIdx) => {
      const groupDiv = document.createElement('div');
      groupDiv.style.marginBottom = '6px';
  clueArr.forEach((clue, cIdx) => {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.min = '1';
        inp.value = clue;
        inp.removeAttribute('max');
  inp.style.width = '60px';
        inp.style.marginRight = '4px';
        inp.disabled = false;
        inp.addEventListener('input', function() {
          rowClues[rIdx][cIdx] = inp.value;
        });
        inp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });
        groupDiv.appendChild(inp);
        // Focus logic for new block
        if (focusNext.type === 'row' && focusNext.index === rIdx && cIdx === clueArr.length - 1) {
          setTimeout(() => inp.focus(), 0);
        }
      });
      // Add button to add another block to this row
      const addBlockBtn = document.createElement('button');
      addBlockBtn.type = 'button';
      addBlockBtn.textContent = '+';
      addBlockBtn.style.marginLeft = '4px';
      addBlockBtn.onclick = function() {
        rowClues[rIdx].push(1);
        focusNext = { type: 'row', index: rIdx };
        renderClueInputs();
        focusNext = { type: null, index: null };
      };
      groupDiv.appendChild(addBlockBtn);
      // Always show remove row button, but only remove the last clue if only one row remains
      const removeRowBtn = document.createElement('button');
      removeRowBtn.type = 'button';
      removeRowBtn.textContent = '–';
      removeRowBtn.style.marginLeft = '4px';
      removeRowBtn.onclick = function() {
        if (rowClues.length === 1 && rowClues[rIdx].length > 1) {
          // Remove last clue in the only row
          rowClues[rIdx].pop();
        } else if (rowClues.length > 1) {
          rowClues.splice(rIdx, 1);
        }
        renderClueInputs();
      };
      groupDiv.appendChild(removeRowBtn);
      rowsInputs.appendChild(groupDiv);
    });
    // Render column clues
    colsInputs.innerHTML = '';
  colClues.forEach((clueArr, cIdx) => {
      const groupDiv = document.createElement('div');
      groupDiv.style.marginBottom = '6px';
  clueArr.forEach((clue, bIdx) => {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.min = '1';
        inp.value = clue;
        inp.removeAttribute('max');
  inp.style.width = '60px';
        inp.style.marginRight = '4px';
        inp.disabled = false;
        inp.addEventListener('input', function() {
          colClues[cIdx][bIdx] = inp.value;
        });
        inp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        });
        groupDiv.appendChild(inp);
        // Focus logic for new block
        if (focusNext.type === 'col' && focusNext.index === cIdx && bIdx === clueArr.length - 1) {
          setTimeout(() => inp.focus(), 0);
        }
      });
  // Prevent any accidental form submission globally
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }
      // Add block button
      const addBlockBtn = document.createElement('button');
      addBlockBtn.type = 'button';
      addBlockBtn.textContent = '+';
      addBlockBtn.style.marginLeft = '4px';
      addBlockBtn.onclick = function() {
        colClues[cIdx].push(1);
        focusNext = { type: 'col', index: cIdx };
        renderClueInputs();
        focusNext = { type: null, index: null };
      };
      groupDiv.appendChild(addBlockBtn);
      // Always show remove col button, but only remove the last clue if only one col remains
      const removeColBtn = document.createElement('button');
      removeColBtn.type = 'button';
      removeColBtn.textContent = '–';
      removeColBtn.style.marginLeft = '4px';
      removeColBtn.onclick = function() {
        if (colClues.length === 1 && colClues[cIdx].length > 1) {
          // Remove last clue in the only column
          colClues[cIdx].pop();
        } else if (colClues.length > 1) {
          colClues.splice(cIdx, 1);
        }
        renderClueInputs();
      };
      groupDiv.appendChild(removeColBtn);
      colsInputs.appendChild(groupDiv);
    });
  }

  // Add row/col event handlers
  addRowBtn.onclick = function() {
    rowClues.push([1]);
    setTimeout(() => {
      // Focus the first input of the new row
      const allRows = document.querySelectorAll('#rows-inputs > div');
      if (allRows.length) {
        const inputs = allRows[allRows.length - 1].querySelectorAll('input');
        if (inputs.length) inputs[0].focus();
      }
    }, 0);
    renderClueInputs();
  };
  addColBtn.onclick = function() {
    colClues.push([1]);
    setTimeout(() => {
      // Focus the first input of the new column
      const allCols = document.querySelectorAll('#cols-inputs > div');
      if (allCols.length) {
        const inputs = allCols[allCols.length - 1].querySelectorAll('input');
        if (inputs.length) inputs[0].focus();
      }
    }, 0);
    renderClueInputs();
  };

  // Show Example event handler
  showExampleBtn.onclick = function() {
    rowClues = [[2], [4], [6], [4, 3], [5, 4], [2, 3, 2], [3, 5], [5], [3], [2], [2], [6]];
    colClues = [[3], [5], [3, 2, 1], [5, 1, 1], [12], [3, 7], [4, 1, 1, 1], [3, 1, 1], [4], [2]];
    renderClueInputs();
    // Highlight the Solve Nonogram button
    const solveBtn = document.getElementById('solve-btn');
    if (solveBtn) {
      solveBtn.classList.add('highlight');
      setTimeout(() => solveBtn.classList.remove('highlight'), 2000);
      solveBtn.focus();
    }
  };

  // Initial render
  renderClueInputs();

  if (!form) return;
  form.onsubmit = function(e) {
    e.preventDefault();
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
      // Get clues from UI
  const ROWS_VALUES = rowClues.map(arr => arr.map(v => parseInt(v, 10)).filter(v => !isNaN(v) && v > 0));
  const COLS_VALUES = colClues.map(arr => arr.map(v => parseInt(v, 10)).filter(v => !isNaN(v) && v > 0));
      setTimeout(function() {
        const board = nonogramSolver({ ROWS_VALUES, COLS_VALUES });
        loadingScreen.style.display = 'none';
        let cluesVisible = false;
        function buildGrid(showClues) {
          let html = '<div style="display:flex; justify-content:center; width:100%;">';
          html += '<table style="border-collapse:collapse;">';
          if (showClues) {
            html += '<tr>';
            html += '<td></td>';
            for (let c = 0; c < COLS_VALUES.length; c++) {
              html += `<td style="text-align:center; font-size:0.9em; color:#007bff; padding:2px 4px;">${COLS_VALUES[c].length ? COLS_VALUES[c].join(' ') : '-'}</td>`;
            }
            html += '</tr>';
          }
          for (let r = 0; r < board.length; r++) {
            html += '<tr>';
            if (showClues) {
              html += `<td style="text-align:right; font-size:0.9em; color:#007bff; padding:2px 4px;">${ROWS_VALUES[r].length ? ROWS_VALUES[r].join(' ') : '-'}</td>`;
            }
            for (let c = 0; c < board[0].length; c++) {
              html += `<td class="${board[r][c] === 1 ? 'filled' : 'empty'}" style="width:28px; height:28px; text-align:center; font-size:1.3em; border:1px solid #444; background:${board[r][c] === 1 ? '#222' : '#fff'}; color:${board[r][c] === 1 ? '#fff' : '#222'};">${board[r][c] === 1 ? '&#9632;' : ''}</td>`;
            }
            html += '</tr>';
          }
          html += '</table></div>';
          return html;
        }
        document.getElementById('output').innerHTML = buildGrid(cluesVisible);
        document.getElementById('clues-section').style.display = 'none';
        document.getElementById('new-nonogram').style.display = 'block';
        document.getElementById('toggle-grid-clues').style.display = 'block';
        document.getElementById('toggle-grid-clues').textContent = 'Show Clues';
        document.getElementById('toggle-grid-clues').onclick = function() {
          cluesVisible = !cluesVisible;
          document.getElementById('output').innerHTML = buildGrid(cluesVisible);
          this.textContent = cluesVisible ? 'Hide Clues' : 'Show Clues';
        };
        document.getElementById('new-nonogram').onclick = function() {
          location.reload();
        };
        
      }, 600);
    }, 0);
  };
});
// NonogramSolver as a function (not a class)
function nonogramSolver({
  ROWS_VALUES = [[2], [4], [6], [4, 3], [5, 4], [2, 3, 2], [3, 5], [5], [3], [2], [2], [6]],
  COLS_VALUES = [[3], [5], [3, 2, 1], [5, 1, 1], [12], [3, 7], [4, 1, 1, 1], [3, 1, 1], [4], [2]],
  savepath = ''
} = {}) {
  const no_of_rows = ROWS_VALUES.length;
  const no_of_cols = COLS_VALUES.length;
  let rows_changed = Array(no_of_rows).fill(0);
  let rows_done = Array(no_of_rows).fill(0);
  let cols_changed = Array(no_of_cols).fill(0);
  let cols_done = Array(no_of_cols).fill(0);
  let solved = false;
  let shape = [no_of_rows, no_of_cols];
  let board = Array.from({ length: no_of_rows }, () => Array(no_of_cols).fill(0));
  let n = savepath !== '' ? 0 : undefined;

  // Helper functions
  function create_possibilities(values, no_of_other) {
    let possibilities = [];
    for (const v of values) {
      let groups = v.length;
      let no_empty = no_of_other - v.reduce((a, b) => a + b, 0) - groups + 1;
      let ones = v.map(x => Array(x).fill(1));
      let res = _create_possibilities(no_empty, groups, ones);
      possibilities.push(res);
    }
    return possibilities;
  }

  function _create_possibilities(n_empty, groups, ones) {
    let res_opts = [];
    function combinations(arr, k) {
      let result = [];
      function combi(temp, start, k) {
        if (k === 0) {
          result.push([...temp]);
          return;
        }
        for (let i = start; i <= arr.length - k; i++) {
          temp.push(arr[i]);
          combi(temp, i + 1, k - 1);
          temp.pop();
        }
      }
      combi([], 0, k);
      return result;
    }
    let indices = Array.from({ length: groups + n_empty }, (_, i) => i);
    for (const p of combinations(indices, groups)) {
      let selected = Array(groups + n_empty).fill(-1);
      let ones_idx = 0;
      for (const val of p) {
        selected[val] = ones_idx;
        ones_idx += 1;
      }
      let res_opt = selected.map(val => val > -1 ? ones[val].concat([-1]) : [-1]);
      res_opt = [].concat(...res_opt).slice(0, -1);
      res_opts.push(res_opt);
    }
    return res_opts;
  }

  function select_index_not_done(possibilities, row_ind) {
    let s = possibilities.map(i => i.length);
    if (row_ind) {
      return s.map((n, i) => rows_done[i] === 0 ? [i, n, row_ind] : null).filter(x => x);
    } else {
      return s.map((n, i) => cols_done[i] === 0 ? [i, n, row_ind] : null).filter(x => x);
    }
  }

  function get_only_one_option(values) {
    let arr = values[0].map((_, colIndex) => values.map(row => row[colIndex]));
    let result = [];
    arr.forEach((i, n) => {
      let unique = [...new Set(i)];
      if (unique.length === 1) result.push([n, unique[0]]);
    });
    return result;
  }

  function remove_possibilities(possibilities, i, val) {
    return possibilities.filter(p => p[i] === val);
  }

  function display_board() {
    console.table(board);
  }

  function save_board(increase_size = 20) {
    // Not directly doable in JS, would require canvas
  }

  function update_done(row_ind, idx) {
    let vals = row_ind ? board[idx] : board.map(row => row[idx]);
    if (!vals.includes(0)) {
      if (row_ind) rows_done[idx] = 1;
      else cols_done[idx] = 1;
    }
  }

  function check_done(row_ind, idx) {
    return row_ind ? rows_done[idx] : cols_done[idx];
  }

  function check_solved() {
    if (!rows_done.includes(0) && !cols_done.includes(0)) {
      solved = true;
    }
  }

  // Step 1: Defining all possible solutions for every row and col
  let rows_possibilities = create_possibilities(ROWS_VALUES, no_of_cols);
  let cols_possibilities = create_possibilities(COLS_VALUES, no_of_rows);

  // Main solving loop
  while (!solved) {
    let lowest_rows = select_index_not_done(rows_possibilities, true);
    let lowest_cols = select_index_not_done(cols_possibilities, false);
    let lowest = [...lowest_rows, ...lowest_cols].sort((a, b) => a[1] - b[1]);

    for (const [ind1, _, row_ind] of lowest) {
      if (!check_done(row_ind, ind1)) {
        let values = row_ind ? rows_possibilities[ind1] : cols_possibilities[ind1];
        let same_ind = get_only_one_option(values);
        for (const [ind2, val] of same_ind) {
          let ri, ci;
          if (row_ind) { ri = ind1; ci = ind2; }
          else { ri = ind2; ci = ind1; }
          if (board[ri][ci] === 0) {
            board[ri][ci] = val;
            if (row_ind) {
              cols_possibilities[ci] = remove_possibilities(cols_possibilities[ci], ri, val);
            } else {
              rows_possibilities[ri] = remove_possibilities(rows_possibilities[ri], ci, val);
            }
            // clear_output(wait=True) - Not applicable in JS
            display_board();
            // if (savepath !== '') { save_board(); n += 1; }
          }
        }
        update_done(row_ind, ind1);
      }
    }
    check_solved();
  }

  // Return the solved board
  return board;
}
