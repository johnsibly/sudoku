package main

import (
	"fmt"
	"strings"
)

func prettyPrint(array [][]string) {
	for x := range array {
		fmt.Println(array[x])
	}
}

func main() {
	// Using a string due to lack of variant type in Go
	samplePuzzle := [][]string{{"0", "7", "0", "0", "8", "0", "0", "0", "0"},
		{"0", "0", "4", "0", "0", "0", "0", "0", "5"},
		{"0", "0", "0", "5", "0", "6", "0", "0", "1"},
		{"1", "0", "3", "0", "6", "0", "0", "9", "0"},
		{"0", "9", "0", "1", "0", "5", "0", "3", "0"},
		{"0", "2", "0", "0", "3", "0", "1", "0", "6"},
		{"9", "0", "0", "4", "0", "3", "0", "0", "0"},
		{"2", "0", "0", "0", "0", "0", "6", "0", "0"},
		{"0", "0", "0", "0", "2", "0", "0", "5", "0"}}

	solveSudoku(samplePuzzle)
}

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

func printPuzzleSize(puzzle [][]string) {
	size := 0
	for _, row := range puzzle {
		for _, cell := range row {
			size += len(cell)
		}
	}
	fmt.Printf("size is %d\n", size)
}

func columnIncludesKnownValue(columnIndex int, value string, puzzle [][]string) bool {
	containsValue := false
	for rowIndex, _ := range puzzle {
		if (len(puzzle[rowIndex][columnIndex]) == 1) && puzzle[rowIndex][columnIndex] == value {
			containsValue = true
			break
		}
	}
	return containsValue
}

func removeOption(cell string, option string) string {
	return strings.Replace(cell, option, "", 1)
}

func solveSudoku(puzzle [][]string) {
	// Initialise array with potential values
	// A single digit means cell value is known
	// If a cell contains multiple digits instead, it contains the cell's potential values
	for _, row := range puzzle {
		for y, cell := range row {
			if cell == "0" {
				row[y] = "123456789"
			}
		}
	}
	printPuzzleSize(puzzle)
	const maxIterations = 20
	for iteration := 0; iteration < maxIterations && !isPuzzleSolved(puzzle); iteration++ {
		for row := 0; row < 9; row++ {
			for col := 0; col < 9; col++ {
				// If a cell in unsolved...
				if len(puzzle[row][col]) > 1 {
					// check to see if row already includes one of the options for this cell
					for _, option := range puzzle[row][col] {
						for checkCol := 0; checkCol < 9; checkCol++ {
							if puzzle[row][checkCol] == string(option) {
								// option already exists in this row, so remove it
								puzzle[row][col] = removeOption(puzzle[row][col], string(option))
							}
						}
					}
				}
			}
		}

		fmt.Printf("Iteration %d\n", iteration)
		printPuzzleSize(puzzle)

		// prettyPrint(puzzle)
	}

}
