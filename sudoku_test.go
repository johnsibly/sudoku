package main

import (
	"fmt"
	"testing"
)

func isPuzzleSolved(array [][]int) bool {
	for row := range array {
		fmt.Println(row)
		// for cell := range row {
		//	fmt.Println(cell)
		//}
	}

	return false
}

func TestPuzzle1Easy(t *testing.T) {
	puzzle := [][]int{{5, 3, 0, 0, 7, 0, 0, 0, 0},
		{6, 0, 0, 1, 9, 5, 0, 0, 0},
		{0, 9, 8, 0, 0, 0, 0, 6, 0},
		{8, 0, 0, 0, 6, 0, 0, 0, 3},
		{4, 0, 0, 8, 0, 3, 0, 0, 1},
		{7, 0, 0, 0, 2, 0, 0, 0, 6},
		{0, 6, 0, 0, 0, 0, 2, 8, 0},
		{0, 0, 0, 4, 1, 9, 0, 0, 5},
		{0, 0, 0, 0, 8, 0, 0, 7, 9}}
	solvedPuzzle := solveSudoku(puzzle)
	solved := isPuzzleSolved(solvedPuzzle)

	if !solved {
		t.Error("Should have been able to solve puzzle")
	}
}
