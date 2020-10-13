package main

import (
	"fmt"
	"math"
	"strconv"
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
	wasSolved := isPuzzleSolved(samplePuzzle)
	if wasSolved {
		println("Successully solved")
	} else {
		println("Puzzle could not be solved")
	}
	prettyPrint(samplePuzzle)
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
			if len(puzzle[cellY][cellX]) > 1 && foundOptionInBlock {
				puzzle[cellY][cellX] = removeOption(puzzle[cellY][cellX], string(possibleOption))
			}
		}
	}
}

// type blockBitMask byte

const (
	none  = byte(0b000)
	one   = byte(0b001)
	two   = byte(0b010)
	three = byte(0b100)
)

func incrementBlockCount(blockCount []int, col int) {
	index := math.Floor(float64(col) / 3)
	blockCount[int(index)]++
}

func getBlockAffinityInRow(puzzle [][]string, row int, option string) byte {
	blockAffinityIndex := none
	blockCount := []int{0, 0, 0}
	for col, cell := range puzzle[row] {
		if len(cell) > 1 {
			if strings.Index(cell, option) != -1 {
				incrementBlockCount(blockCount, col)
			}
		} else if cell == option {
			incrementBlockCount(blockCount, col)
		}
	}

	if blockCount[0] == 0 && blockCount[1] == 0 {
		blockAffinityIndex = three
	} else if blockCount[0] == 0 && blockCount[2] == 0 {
		blockAffinityIndex = two
	} else if blockCount[1] == 0 && blockCount[2] == 0 {
		blockAffinityIndex = one
	}

	return blockAffinityIndex
}

func removeOtherOptionsFromRow(puzzle [][]string, rowAffinity byte, rowIndex int, option string) {
	for col := 0; col < 9; col++ {
		if rowAffinity == one && col > 2 {
			puzzle[rowIndex][col] = removeOption(puzzle[rowIndex][col], string(option))
		} else if rowAffinity == two && (col < 3 || col > 5) {
			puzzle[rowIndex][col] = removeOption(puzzle[rowIndex][col], string(option))
		} else if rowAffinity == three && col < 6 {
			puzzle[rowIndex][col] = removeOption(puzzle[rowIndex][col], string(option))
		}
	}
}

func checkRowBlockAffinity(puzzle [][]string) {
	const onlyLastThreeBits = byte(0b111)
	for o := 1; o <= 9; o++ {
		// check top set of blocks
		option := strconv.Itoa(o)
		row0Affinity := getBlockAffinityInRow(puzzle, 0, option)
		row1Affinity := getBlockAffinityInRow(puzzle, 1, option)
		row2Affinity := getBlockAffinityInRow(puzzle, 2, option)

		if row1Affinity > 0 && row2Affinity > 0 {
			row0Affinity = onlyLastThreeBits & ^(row1Affinity | row2Affinity)
			removeOtherOptionsFromRow(puzzle, row0Affinity, 0, option)
		} else if row0Affinity > 0 && row2Affinity > 0 {
			row1Affinity = onlyLastThreeBits & ^(row0Affinity | row2Affinity)
			removeOtherOptionsFromRow(puzzle, row1Affinity, 1, option)
		} else if row0Affinity > 0 && row1Affinity > 0 {
			row2Affinity = onlyLastThreeBits & ^(row0Affinity | row1Affinity)
			removeOtherOptionsFromRow(puzzle, row2Affinity, 2, option)
		}

		// check middle set of blocks
		row3Affinity := getBlockAffinityInRow(puzzle, 3, option)
		row4Affinity := getBlockAffinityInRow(puzzle, 4, option)
		row5Affinity := getBlockAffinityInRow(puzzle, 5, option)

		if row4Affinity > 0 && row5Affinity > 0 {
			row3Affinity = onlyLastThreeBits & ^(row4Affinity | row5Affinity)
			removeOtherOptionsFromRow(puzzle, row3Affinity, 3, option)
		} else if row3Affinity > 0 && row5Affinity > 0 {
			row4Affinity = onlyLastThreeBits & ^(row3Affinity | row5Affinity)
			removeOtherOptionsFromRow(puzzle, row4Affinity, 4, option)
		} else if row3Affinity > 0 && row4Affinity > 0 {
			row5Affinity = onlyLastThreeBits & ^(row3Affinity | row4Affinity)
			removeOtherOptionsFromRow(puzzle, row5Affinity, 5, option)
		}

		// check bottom set of blocks
		row6Affinity := getBlockAffinityInRow(puzzle, 6, option)
		row7Affinity := getBlockAffinityInRow(puzzle, 7, option)
		row8Affinity := getBlockAffinityInRow(puzzle, 8, option)

		if row7Affinity > 0 && row8Affinity > 0 {
			row6Affinity = onlyLastThreeBits & ^(row7Affinity | row8Affinity)
			removeOtherOptionsFromRow(puzzle, row6Affinity, 6, option)
		} else if row6Affinity > 0 && row8Affinity > 0 {
			row7Affinity = onlyLastThreeBits & ^(row6Affinity | row8Affinity)
			removeOtherOptionsFromRow(puzzle, row7Affinity, 7, option)
		} else if row6Affinity > 0 && row7Affinity > 0 {
			row8Affinity = onlyLastThreeBits & ^(row6Affinity | row7Affinity)
			removeOtherOptionsFromRow(puzzle, row8Affinity, 8, option)
		}
	}
}

func removeOption(cell string, option string) string {
	if len(cell) == 1 && cell == option {
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
							if len(puzzle[row][col]) > 1 && checkCol != col && puzzle[row][checkCol] == string(option) {
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
							if len(puzzle[row][col]) > 1 && row != checkRow && puzzle[checkRow][col] == string(option) {
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
				// Check if one of cell's options is unique to that 3x3 block
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

		checkRowBlockAffinity(puzzle)
		// fmt.Printf("Iteration %d\n", iteration)
		// printPuzzleSize(puzzle)
	}
}
