const sudoku = require('../sudoku');

beforeEach(() => {
});

it('Test puzzle 1 (easy)', async () => {
  const puzzle = [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
                  [6, 0, 0, 1, 9, 5, 0, 0, 0],
                  [0, 9, 8, 0, 0, 0, 0, 6, 0],
                  [8, 0, 0, 0, 6, 0, 0, 0, 3],
                  [4, 0, 0, 8, 0, 3, 0, 0, 1],
                  [7, 0, 0, 0, 2, 0, 0, 0, 6],
                  [0, 6, 0, 0, 0, 0, 2, 8, 0],
                  [0, 0, 0, 4, 1, 9, 0, 0, 5],
                  [0, 0, 0, 0, 8, 0, 0, 7, 9]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);

  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 2 (easy)', async () => {
  const puzzle = [[3, 0, 0, 8, 0, 1, 0, 0, 2], 
                  [2, 0, 1, 0, 3, 0, 6, 0, 4],
                  [0, 0, 0, 2, 0, 4, 0, 0, 0],
                  [8, 0, 9, 0, 0, 0, 1, 0, 6],
                  [0, 6, 0, 0, 0, 0, 0, 5, 0],
                  [7, 0, 2, 0, 0, 0, 4, 0, 9],
                  [0, 0, 0, 5, 0, 9, 0, 0, 0],
                  [9, 0, 4, 0, 8, 0, 7, 0, 5],
                  [6, 0, 0, 1, 0, 7, 0, 0, 3]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);

  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 3 (easy)', async () => {
  const puzzle = [[0, 2, 1, 0, 7, 6, 0, 0, 0], 
                  [4, 0, 0, 0, 0, 3, 0, 0, 2],
                  [5, 0, 7, 0, 0, 9, 3, 0, 0],
                  [0, 4, 6, 0, 0, 0, 2, 0, 9],
                  [9, 8, 0, 0, 0, 0, 0, 5, 7],
                  [2, 0, 5, 0, 0, 0, 4, 6, 0],
                  [0, 0, 9, 2, 0, 0, 5, 0, 4],
                  [8, 0, 0, 7, 0, 0, 0, 0, 6],
                  [0, 0, 0, 1, 9, 0, 7, 3, 0]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 4 (medium)', async () => {
  const puzzle = [[3, 6, 0, 0, 0, 0, 0, 0, 8], 
                  [2, 0, 0, 0, 0, 0, 0, 1, 0],
                  [1, 0, 0, 4, 0, 0, 0, 0, 0],
                  [0, 9, 0, 0, 6, 0, 0, 8, 2],
                  [0, 8, 4, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 3, 0, 6, 0, 5],
                  [0, 0, 7, 0, 0, 5, 1, 0, 0],
                  [0, 0, 0, 7, 0, 9, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 2, 0, 6]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 5 (medium)', async () => {
  const puzzle = [[4, 0, 0, 0, 3, 9, 8, 0, 0], 
                  [0, 0, 9, 1, 0, 0, 7, 4, 0],
                  [0, 0, 5, 0, 6, 0, 0, 9, 0],
                  [9, 4, 0, 0, 0, 6, 0, 0, 0],
                  [0, 0, 0, 5, 8, 2, 0, 0, 0],
                  [0, 0, 0, 4, 0, 0, 0, 1, 8],
                  [0, 5, 0, 0, 7, 0, 1, 0, 0],
                  [0, 9, 4, 0, 0, 1, 5, 0, 0],
                  [0, 0, 7, 8, 4, 0, 0, 0, 2]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 6 (hard)', async () => {
  const puzzle = [[2, 0, 0, 0, 1, 0, 3, 0, 0], 
                  [0, 0, 0, 2, 0, 0, 0, 1, 0],
                  [0, 0, 0, 4, 0, 9, 0, 2, 0],
                  [9, 3, 7, 0, 0, 0, 0, 0, 1],
                  [5, 4, 0, 0, 0, 0, 0, 7, 8],
                  [1, 0, 0, 0, 0, 0, 6, 3, 9],
                  [0, 7, 0, 3, 0, 8, 0, 0, 0],
                  [0, 8, 0, 0, 0, 6, 0, 0, 0],
                  [0, 0, 2, 0, 7, 0, 0, 0, 5]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 7 (evil)', async () => {
  const puzzle = [[0, 7, 0, 0, 8, 0, 0, 0, 0], 
                  [0, 0, 4, 0, 0, 0, 0, 0, 5],
                  [0, 0, 0, 5, 0, 6, 0, 0, 1],
                  [1, 0, 3, 0, 6, 0, 0, 9, 0],
                  [0, 9, 0, 1, 0, 5, 0, 3, 0],
                  [0, 2, 0, 0, 3, 0, 1, 0, 6],
                  [9, 0, 0, 4, 0, 3, 0, 0, 0],
                  [2, 0, 0, 0, 0, 0, 6, 0, 0],
                  [0, 0, 0, 0, 2, 0, 0, 5, 0]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 8 (hard from Take a break magazine)', async () => {
  const puzzle = [[4, 0, 0, 0, 0, 0, 0, 0, 0], 
                  [0, 0, 0, 6, 5, 0, 0, 1, 0],
                  [9, 0, 0, 0, 0, 0, 2, 6, 0],
                  [0, 7, 0, 0, 4, 0, 6, 0, 0],
                  [0, 0, 0, 0, 0, 0, 9, 0, 4],
                  [0, 6, 0, 1, 0, 0, 0, 0, 0],
                  [0, 0, 8, 0, 0, 9, 0, 0, 0],
                  [3, 0, 0, 8, 0, 2, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 5, 3]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 9 (hard from Take a break magazine)', async () => {
  const puzzle = [[0, 0, 5, 0, 0, 0, 8, 0, 0], 
                  [0, 0, 0, 9, 8, 0, 0, 0, 0],
                  [6, 0, 7, 0, 0, 0, 5, 0, 0],
                  [0, 0, 0, 3, 1, 6, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 8],
                  [0, 0, 0, 0, 0, 0, 4, 0, 2],
                  [0, 0, 0, 0, 0, 7, 2, 3, 0],
                  [0, 0, 6, 4, 0, 3, 0, 7, 0],
                  [0, 5, 0, 0, 0, 0, 0, 0, 0]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});

it('Test puzzle 10 (hard from Take a break magazine)', async () => {
  const puzzle = [[8, 0, 0, 4, 0, 0, 0, 1, 0], 
                  [0, 0, 0, 6, 0, 0, 0, 9, 0],
                  [0, 0, 0, 2, 0, 0, 4, 3, 0],
                  [0, 0, 0, 0, 0, 0, 3, 4, 6],
                  [0, 0, 7, 0, 0, 0, 0, 0, 0],
                  [0, 0, 5, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 5, 0, 0, 9],
                  [0, 3, 0, 0, 0, 0, 0, 6, 0],
                  [1, 4, 0, 0, 0, 2, 0, 0, 0]];
  const solved = sudoku.solveSudoku(puzzle);
  const stringPuzzle = JSON.stringify(solved);
  expect(stringPuzzle.length).toEqual(181);
});