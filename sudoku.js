const samplePuzzle = [[0, 7, 0, 0, 8, 0, 0, 0, 0], 
[0, 0, 4, 0, 0, 0, 0, 0, 5],
[0, 0, 0, 5, 0, 6, 0, 0, 1],
[1, 0, 3, 0, 6, 0, 0, 9, 0],
[0, 9, 0, 1, 0, 5, 0, 3, 0],
[0, 2, 0, 0, 3, 0, 1, 0, 6],
[9, 0, 0, 4, 0, 3, 0, 0, 0],
[2, 0, 0, 0, 0, 0, 6, 0, 0],
[0, 0, 0, 0, 2, 0, 0, 5, 0]];

solveSudoku(samplePuzzle);
function solveSudoku(puzzle) {
    const startTime = new Date();
    let iterations = 0;
    const maxIterations = 20;
    // Initialise array with potential values
    // A single digit means cell value is known
    // If a cell contains an array instead, it contains the cell's potential values
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (puzzle[row][col] == 0) {
                puzzle[row][col] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        }
    }

    function columnIncludesKnownValue(columnIndex, value) {
        let containsValue = false;
        for(rowIndex = 0; rowIndex < 9; rowIndex++) {
            if ((typeof(puzzle[rowIndex][columnIndex]) == "number") && puzzle[rowIndex][columnIndex] == value) { // this cell is an array so is unsolved
                containsValue = true;
                break;
            }
        }
        return containsValue;
    }

    function printProgress() {
        const stringPuzzle = JSON.stringify(puzzle);
        const executionTime = (new Date()) - startTime;
        let solvedPuzzleString = `Current size of stringified puzzle ${stringPuzzle.length}. Iterations = ${iterations}. Execution time = ${executionTime}ms\n`;
        puzzle.forEach(row => {
            solvedPuzzleString += JSON.stringify(row) + '\n';
        });
        console.log(solvedPuzzleString);
    }

    function arrayRemove(arrayToRemoveFrom, value) { 
        if (!Array.isArray(arrayToRemoveFrom)) {
            return arrayToRemoveFrom;
        }
        const newArray = arrayToRemoveFrom.filter(function(element){ return element != value; });
        // if only 1 item is left in the array, convert to number since we've just solved this cell
        return newArray.length == 1 ? newArray[0] : newArray;
    }

    function checkForValuesInBlock(cellY, cellX, blockY, blockX) {
        if (Array.isArray(puzzle[cellY][cellX])) {
            puzzle[cellY][cellX].forEach(possibleOption => {
                let foundOptionInBlock = false;
                for(blockOffsetY = 0; blockOffsetY < 3; blockOffsetY++) {
                    for(blockOffsetX = 0; blockOffsetX < 3; blockOffsetX++) {
                        foundOptionInBlock = foundOptionInBlock || possibleOption == puzzle[blockY+blockOffsetY][blockX+blockOffsetX];
                    }
                }
                if (foundOptionInBlock) {
                    puzzle[cellY][cellX] = arrayRemove(puzzle[cellY][cellX], possibleOption);
                }
            });
        }
    }

    function isPuzzleComplete() {
        let complete = true;
        for (row = 0; row < 9 && complete; row++) {
            for (col = 0; col < 9 && complete; col++) {
                if (Array.isArray(puzzle[row][col])) {
                    complete = false;
                }
            }
        }
        return complete;
    }

    while(iterations < maxIterations && !isPuzzleComplete()) {
        iterations++;
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                if (Array.isArray(puzzle[row][col])) { // this cell is an array so is unsolved
                    puzzle[row][col].forEach(possibleOption => {
                        // check all the possible items for the cell. If there already exists one of the options in the row, then remove it as an option
                        if (puzzle[row].includes(possibleOption)) {
                            puzzle[row][col] = arrayRemove(puzzle[row][col], possibleOption);
                        }
                    });
                }

                // check to see if one of the cell's options is unique to that column
                if (Array.isArray(puzzle[row][col])) {
                    for (optionIndex = 0; optionIndex < puzzle[row][col].length; optionIndex++) {
                        let hasOptionBeenFoundInColumn  = false;
                        for (u_row = 0; u_row < 9 && !hasOptionBeenFoundInColumn; u_row++) {
                            if (row != u_row && Array.isArray(puzzle[u_row][col])) {
                                hasOptionBeenFoundInColumn = puzzle[u_row][col].includes(puzzle[row][col][optionIndex]);
                            }
                        }
                        // if the option we're looking at for this cell, does not exist in any other cell in the column, we must accept it
                        if (!hasOptionBeenFoundInColumn) {
                            puzzle[row][col] = puzzle[row][col][optionIndex];
                            break;
                        }
                    }
                }

                if (Array.isArray(puzzle[row][col])) { // this cell is an array so is unsolved
                    // The column that this cell in is
                    // check all the possible items for the cell. If there already exists one of the options in the column, then remove it as an option
                    puzzle[row][col].forEach(possibleOption => {
                        if (columnIncludesKnownValue(col, possibleOption)) {
                            puzzle[row][col] = arrayRemove(puzzle[row][col], possibleOption);
                        }
                    });
                }

                // Check if one of cell's options unique to that row
                if (Array.isArray(puzzle[row][col])) {
                    for (optionIndex = 0; optionIndex < puzzle[row][col].length; optionIndex++) {
                        let hasOptionBeenFoundInRow  = false;
                        for (u_col = 0; u_col < 9 && !hasOptionBeenFoundInRow; u_col++) {
                            if (row != u_col && Array.isArray(puzzle[u_col][col])) {
                                hasOptionBeenFoundInRow = puzzle[u_col][col].includes(puzzle[row][col][optionIndex]);
                            }
                        }
                        // if the option we're looking at for this cell, does not exist in any other cell in the column, we must accept it
                        if (!hasOptionBeenFoundInRow) {
                            puzzle[row][col] = puzzle[row][col][optionIndex];
                            break;
                        }
                    }
                }
            }
        }
        
        // Check within each 3x3 block which cells have a value
        for(blockX = 0; blockX < 9; blockX = blockX + 3 ) {
            for(blockY = 0; blockY < 9; blockY = blockY + 3) {
                checkForValuesInBlock(blockY,   blockX,   blockY, blockX);
                checkForValuesInBlock(blockY,   blockX+1, blockY, blockX);
                checkForValuesInBlock(blockY,   blockX+2, blockY, blockX);
                checkForValuesInBlock(blockY+1, blockX,   blockY, blockX);
                checkForValuesInBlock(blockY+1, blockX+1, blockY, blockX);
                checkForValuesInBlock(blockY+1, blockX+2, blockY, blockX);
                checkForValuesInBlock(blockY+2, blockX,   blockY, blockX);
                checkForValuesInBlock(blockY+2, blockX+1, blockY, blockX);
                checkForValuesInBlock(blockY+2, blockX+2, blockY, blockX);
            }
        }
    }
    printProgress();
    return puzzle;
}

module.exports.solveSudoku = solveSudoku;