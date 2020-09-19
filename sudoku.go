package main

import (
	"fmt"
)

func prettyPrint(array [][]string) {
	for x := range array {
		fmt.Println(array[x])
	}
}

func main() {
	samplePuzzle := [][]string{{"0", "7", "0", "0", "8", "0", "0", "0", "0"},
		{"0", "0", "4", "0", "0", "0", "0", "0", "5"},
		{"0", "0", "0", "5", "0", "6", "0", "0", "1"},
		{"1", "0", "3", "0", "6", "0", "0", "9", "0"},
		{"0", "9", "0", "1", "0", "5", "0", "3", "0"},
		{"0", "2", "0", "0", "3", "0", "1", "0", "6"},
		{"9", "0", "0", "4", "0", "3", "0", "0", "0"},
		{"2", "0", "0", "0", "0", "0", "6", "0", "0"},
		{"0", "0", "0", "0", "2", "0", "0", "5", "0"}}

	//	for x > zero {
	//		x := x * i / ((i + 1) * 4)
	//		pi += x / (i + 2)
	//		i += 2
	//	}

	fmt.Println("hi")
	solveSudoku(samplePuzzle)
}

func solveSudoku(puzzle [][]string) [][]string {
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
	prettyPrint(puzzle)
	return nil
}
