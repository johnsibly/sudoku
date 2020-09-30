package main

import (
	"fmt"
	"strings"
)

func prettyPrint(array [][]string) {
	for x := range array {
		for _, c := range array[x] {
			fmt.Printf("%s\t", string(c))
		}
		fmt.Printf("\n")
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
	for rowIndex := range puzzle {
		if (len(puzzle[rowIndex][columnIndex]) == 1) && puzzle[rowIndex][columnIndex] == value {
			containsValue = true
			break
		}
	}
	return containsValue
}

func checkForValuesInBlock(puzzle [][]string, cellY int, cellX int, blockY int, blockX int) {
	if len(puzzle[cellY][cellX]) > 1 {
		for _, possibleOption := range puzzle[cellY][cellX] {
			foundOptionInBlock := false
			for blockOffsetY := 0; blockOffsetY < 3; blockOffsetY++ {
				for blockOffsetX := 0; blockOffsetX < 3; blockOffsetX++ {
					if cellY != (blockY+blockOffsetY) && cellX != (blockX+blockOffsetX) {
						foundOptionInBlock = foundOptionInBlock || string(possibleOption) == puzzle[blockY+blockOffsetY][blockX+blockOffsetX]
					}
				}
			}
			if foundOptionInBlock {
				puzzle[cellY][cellX] = removeOption(puzzle[cellY][cellX], string(possibleOption))
			}
		}
	}
}

func removeOption(cell string, option string) string {
	if len(cell) == 1 {
		panic("We're trying to remove the final option - something's gone badly wrong")
	}
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

	const maxIterations = 20
	for iteration := 0; iteration < maxIterations && !isPuzzleSolved(puzzle); iteration++ {

		for row := 0; row < 9; row++ {
			for col := 0; col < 9; col++ {
				// If a cell in unsolved...
				if len(puzzle[row][col]) > 1 {
					// check to see if row already includes one of the options for this cell
					for _, option := range puzzle[row][col] {
						for checkCol := 0; checkCol < 9; checkCol++ {
							if checkCol != col && puzzle[row][checkCol] == string(option) {
								// option already exists in this row, so remove it
								puzzle[row][col] = removeOption(puzzle[row][col], string(option))
							}
						}
					}
				}

				// Check if one of the cell's options is unique to that column
				if len(puzzle[row][col]) > 1 {
					for _, option := range puzzle[row][col] {
						hasOptionBeenFoundInColumn := false
						for uRow := 0; uRow < 9 && !hasOptionBeenFoundInColumn; uRow++ {
							if row != uRow {
								hasOptionBeenFoundInColumn = strings.Index(puzzle[uRow][col], string(option)) != -1
							}
						}
						// if the option we're looking at for this cell, does not exist in any other cell in the column, we must accept it
						if !hasOptionBeenFoundInColumn {
							puzzle[row][col] = string(option)
							break
						}
					}
				}

				// If a cell in unsolved...
				if len(puzzle[row][col]) > 1 {
					// check to see if column already includes one of the options for this cell
					for _, option := range puzzle[row][col] {
						for checkRow := 0; checkRow < 9; checkRow++ {
							if row != checkRow && puzzle[checkRow][col] == string(option) {
								// option already exists in this column, so remove it
								puzzle[row][col] = removeOption(puzzle[row][col], string(option))
							}
						}
					}
				}

				// Check if one of cell's options unique to that row
				if len(puzzle[row][col]) > 1 {
					for _, option := range puzzle[row][col] {
						hasOptionBeenFoundInRow := false
						for uCol := 0; uCol < 9 && !hasOptionBeenFoundInRow; uCol++ {
							if col != uCol {
								hasOptionBeenFoundInRow = strings.Index(puzzle[row][uCol], string(option)) != -1
							}
						}
						// if the option we're looking at for this cell, does not exist in any other cell in the column, we must accept it
						if !hasOptionBeenFoundInRow {
							puzzle[row][col] = string(option)
							break
						}
					}
				}

				// Check within each 3x3 block which options are rulled out by already solved value
				for blockX := 0; blockX < 9; blockX = blockX + 3 {
					for blockY := 0; blockY < 9; blockY = blockY + 3 {
						checkForValuesInBlock(puzzle, blockY, blockX, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY, blockX+1, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY, blockX+2, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+1, blockX, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+1, blockX+1, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+1, blockX+2, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+2, blockX, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+2, blockX+1, blockY, blockX)
						checkForValuesInBlock(puzzle, blockY+2, blockX+2, blockY, blockX)
					}
				}

				// Check if one of cell's options is unique to that 3x3 block
			}
		}

		// fmt.Printf("Iteration %d\n", iteration)
		// printPuzzleSize(puzzle)
	}
}
