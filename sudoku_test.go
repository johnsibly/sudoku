package main

import (
	"testing"
)

func isPuzzleSolved(puzzle [][]string) bool {
	isSolved := true
	for _, row := range puzzle {
		for _, cell := range row {
			if len(cell) > 1 {
				isSolved = false
			}
		}
	}

	return isSolved
}

func TestPuzzle1Easy(t *testing.T) {
	puzzle := [][]string{{"5", "3", "0", "0", "7", "0", "0", "0", "0"},
		{"6", "0", "0", "1", "9", "5", "0", "0", "0"},
		{"0", "9", "8", "0", "0", "0", "0", "6", "0"},
		{"8", "0", "0", "0", "6", "0", "0", "0", "3"},
		{"4", "0", "0", "8", "0", "3", "0", "0", "1"},
		{"7", "0", "0", "0", "2", "0", "0", "0", "6"},
		{"0", "6", "0", "0", "0", "0", "2", "8", "0"},
		{"0", "0", "0", "4", "1", "9", "0", "0", "5"},
		{"0", "0", "0", "0", "8", "0", "0", "7", "9"}}
	// Passed by reference to solution is written to puzzle
	solveSudoku(puzzle)

	solved := isPuzzleSolved(puzzle)

	if !solved {
		t.Error("Should have been able to solve puzzle")
	}
}
