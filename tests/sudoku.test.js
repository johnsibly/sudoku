const sudoku = require('../sudoku');

beforeEach(() => {
});

it('Test simple puzzle 1', async () => {
    const puzzle = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
                    [6, 0, 0, 1, 9, 5, 0, 0, 0],
                    [0, 9, 8, 0, 0, 0, 0, 6, 0],
                    [8, 0, 0, 0, 6, 0, 0, 0, 3],
                    [4, 0, 0, 8, 0, 3, 0, 0, 1],
                    [7, 0, 0, 0, 2, 0, 0, 0, 6],
                    [0, 6, 0, 0, 0, 0, 2, 8, 0],
                    [0, 0, 0, 4, 1, 9, 0, 0, 5],
                    [0, 0, 0, 0, 8, 0, 0, 7, 9]];
  console.log(sudoku);
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);

  expect(stringPuzzle.length).toEqual(181);
});

it('Test simple puzzle 2', async () => {
  const puzzle = [[3, 0, 0, 8, 0, 1, 0, 0, 2], 
                  [2, 0, 1, 0, 3, 0, 6, 0, 4],
                  [0, 0, 0, 2, 0, 4, 0, 0, 0],
                  [8, 0, 9, 0, 0, 0, 1, 0, 6],
                  [0, 6, 0, 0, 0, 0, 0, 5, 0],
                  [7, 0, 2, 0, 0, 0, 4, 0, 9],
                  [0, 0, 0, 5, 0, 9, 0, 0, 0],
                  [9, 0, 4, 0, 8, 0, 7, 0, 5],
                  [6, 0, 0, 1, 0, 7, 0, 0, 3]];
  console.log(sudoku);
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);

  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 3 (medium complexity)', async () => {
    const puzzle = [[3, 6, 0, 0, 0, 0, 0, 0, 8], 
                    [2, 0, 0, 0, 0, 0, 0, 1, 0],
                    [1, 0, 0, 4, 0, 0, 0, 0, 0],
                    [0, 9, 0, 0, 6, 0, 0, 8, 2],
                    [0, 8, 4, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 3, 0, 6, 0, 5],
                    [0, 0, 7, 0, 0, 5, 1, 0, 0],
                    [0, 0, 0, 7, 0, 9, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 2, 0, 6]];
  console.log(sudoku);
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);

  expect(stringPuzzle.length).toEqual(181);
});

