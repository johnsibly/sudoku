/*
const samplePuzzle = [[0, 7, 0, 0, 8, 0, 0, 0, 0], 
[0, 0, 4, 0, 0, 0, 0, 0, 5],
[0, 0, 0, 5, 0, 6, 0, 0, 1],
[1, 0, 3, 0, 6, 0, 0, 9, 0],
[0, 9, 0, 1, 0, 5, 0, 3, 0],
[0, 2, 0, 0, 3, 0, 1, 0, 6],
[9, 0, 0, 4, 0, 3, 0, 0, 0],
[2, 0, 0, 0, 0, 0, 6, 0, 0],
[0, 0, 0, 0, 2, 0, 0, 5, 0]]; */

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
    for (cell = {y: 0, x: 0}; cell != null; cell = iterateNextCellInPuzzle(cell)) {
        if (puzzle[cell.y][cell.x] == 0) {
            puzzle[cell.y][cell.x] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
    }
    
    function columnIncludesKnownValue(columnIndex, value) {
        let containsValue = false;
        for(rowIndex = 0; rowIndex < 9; rowIndex++) {
            if ((typeof(puzzle[rowIndex][columnIndex]) == "number") && puzzle[rowIndex][columnIndex] == value) { // this cell is a number so contains a know value
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
        for (cell = {y: 0, x: 0}; cell != null; cell = iterateNextCellInPuzzle(cell)) {
            if (Array.isArray(puzzle[cell.y][cell.x])) {
                complete = false;
            }
        }
        return complete;
    }

    function iterateNextCellInPuzzle(cell) {
        if (cell.x == 8 && cell.y == 8) {
            cell = null; // we're on the last cell - set iterator to null
        } else if (cell.x < 8) {
            cell.x++;
        } else if (cell.x == 8) {
            cell.x = 0;
            cell.y++;
        } else {
            console.log("WFT this should not happen!")
        }
        return cell;
    }

    function iterateNextCellInBlock(cell) {
        if (cell.x == blockX + 2 && cell.y == blockY + 2) {
            cell = null; // we're on the last cell - set iterator to null
        } else if (cell.x < blockX + 2) {
            cell.x++;
        } else if (cell.x == blockX + 2) {
            cell.x = blockX;
            cell.y++;
        } else {
            console.log("WFT this should not happen!")
        }
        return cell;
    }

    function processCoupledCellsInBlock(blockY, blockX) {
        let keepProcessing = true;
        for (cell = {y: blockY, x: blockX}; cell != null && keepProcessing; cell = iterateNextCellInBlock(cell)) {
            if (Array.isArray(puzzle[cell.y][cell.x]) && puzzle[cell.y][cell.x].length == 2)
            for (cellToCompare = {y: blockY, x: blockX}; cellToCompare != null && keepProcessing; cellToCompare = iterateNextCellInBlock(cellToCompare)) {
                if (JSON.stringify(cell) != JSON.stringify(cellToCompare)) {
                    if (JSON.stringify(puzzle[cell.y][cell.x]) == JSON.stringify(puzzle[cellToCompare.y][cellToCompare.x])) {
                        // Remove coupled options from other cells in blocked
                        const cuplet1 = puzzle[cell.y][cell.x][0];
                        const cuplet2 = puzzle[cell.y][cell.x][1];
                        if (cuplet1 == undefined) {
                            console.log("argh!!")
                        }
                        // console.log(`Found couplet in block! ${cuplet1} and ${cuplet2}`);

                        for (cellToRemoveFrom = {y: blockY, x: blockX}; cellToRemoveFrom != null; cellToRemoveFrom = iterateNextCellInBlock(cellToRemoveFrom)) {
                            if (JSON.stringify(cellToRemoveFrom) != JSON.stringify(cellToCompare) && JSON.stringify(cell) != JSON.stringify(cellToRemoveFrom) ) {
                                puzzle[cellToRemoveFrom.y][cellToRemoveFrom.x] = arrayRemove(puzzle[cellToRemoveFrom.y][cellToRemoveFrom.x], cuplet1);
                                puzzle[cellToRemoveFrom.y][cellToRemoveFrom.x] = arrayRemove(puzzle[cellToRemoveFrom.y][cellToRemoveFrom.x], cuplet2);
                            }
                        }
                        keepProcessing = false;
                    }
                }
            }
        }
    }

    function checkRowBlockAffinity(){
        const blockBitMask = {
            NONE: 0b000,
            ONE: 0b001,
            TWO: 0b010,
            THREE: 0b100
        }

        function incrementBlockCount(blockCount, col) {
            const index = Math.floor(col/3);
            blockCount[index]++;
        }
        function getBlockAffinityInRow(row, option) {
            let blockAffinityIndex = blockBitMask.NONE;
            let blockCount = [0, 0, 0];
            for (col = 0; col < 9; col++) {
                const cell = puzzle[row][col];
                if (Array.isArray(cell)) {
                    if (cell.includes(option)) {
                        incrementBlockCount(blockCount, col);
                    }
                } else if (cell == option) {
                    incrementBlockCount(blockCount, col);
                }
            }

            if (blockCount[0] == 0 && blockCount[1] == 0) {
                blockAffinityIndex = blockBitMask.THREE;
            } else if (blockCount[0] == 0 && blockCount[2] == 0) {
                blockAffinityIndex = blockBitMask.TWO;
            } else if (blockCount[1] == 0 && blockCount[2] == 0) {
                blockAffinityIndex = blockBitMask.ONE;
            }

            return blockAffinityIndex;
        }

        function removeOtherOptionsFromRow(rowAffinity, rowIndex, option) {
            for (col = 0; col < 9; col++) {
                if (rowAffinity == blockBitMask.ONE && col > 2) {
                    puzzle[rowIndex][col] = arrayRemove(puzzle[rowIndex][col], option);
                } else if (rowAffinity == blockBitMask.TWO && (col < 3 || col > 5)) {
                    puzzle[rowIndex][col] = arrayRemove(puzzle[rowIndex][col], option);
                } else if (rowAffinity == blockBitMask.THREE && col < 6) {
                    puzzle[rowIndex][col] = arrayRemove(puzzle[rowIndex][col], option);
                }
            }
        }
        
        const onlyLastThreeBits = 0b111;
        for (option = 0; option < 9; option++){
            // check top set of blocks
            let row0Affinity = getBlockAffinityInRow(0, option);
            let row1Affinity = getBlockAffinityInRow(1, option);
            let row2Affinity = getBlockAffinityInRow(2, option);

            if (row1Affinity && row2Affinity) {
                row0Affinity = onlyLastThreeBits & ~(row1Affinity | row2Affinity);
                removeOtherOptionsFromRow(row0Affinity, 0, option)
            } else if (row0Affinity && row2Affinity) {
                row1Affinity = onlyLastThreeBits & ~(row0Affinity | row2Affinity);
                removeOtherOptionsFromRow(row1Affinity, 1, option)
            } else if (row0Affinity && row1Affinity) {
                row2Affinity = onlyLastThreeBits & ~(row0Affinity | row1Affinity);
                removeOtherOptionsFromRow(row2Affinity, 2, option)
            }

            // check middle set of blocks
            let row3Affinity = getBlockAffinityInRow(3, option);
            let row4Affinity = getBlockAffinityInRow(4, option);
            let row5Affinity = getBlockAffinityInRow(5, option);

            if (row4Affinity && row5Affinity) {
                row3Affinity = onlyLastThreeBits & ~(row4Affinity | row5Affinity);
                removeOtherOptionsFromRow(row3Affinity, 3, option)
            } else if (row3Affinity && row5Affinity) {
                row4Affinity = onlyLastThreeBits & ~(row3Affinity | row5Affinity);
                removeOtherOptionsFromRow(row4Affinity, 4, option)
            } else if (row3Affinity && row4Affinity) {
                row5Affinity = onlyLastThreeBits & ~(row3Affinity | row4Affinity);
                removeOtherOptionsFromRow(row5Affinity, 5, option)
            }

            // check bottom set of blocks
            let row6Affinity = getBlockAffinityInRow(6, option);
            let row7Affinity = getBlockAffinityInRow(7, option);
            let row8Affinity = getBlockAffinityInRow(8, option);

            if (row7Affinity && row8Affinity) {
                row6Affinity = onlyLastThreeBits & ~(row7Affinity | row8Affinity);
                removeOtherOptionsFromRow(row6Affinity, 6, option)
            } else if (row6Affinity && row8Affinity) {
                row7Affinity = onlyLastThreeBits & ~(row6Affinity | row8Affinity);
                removeOtherOptionsFromRow(row7Affinity, 7, option)
            } else if (row6Affinity && row7Affinity) {
                row8Affinity = onlyLastThreeBits & ~(row6Affinity | row7Affinity);
                removeOtherOptionsFromRow(row8Affinity, 8, option)
            }
        }
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
                            if (row != u_row)  {
                                if (Array.isArray(puzzle[u_row][col])) {
                                    hasOptionBeenFoundInColumn = puzzle[u_row][col].includes(puzzle[row][col][optionIndex]);
                                } else {
                                    try {
                                    hasOptionBeenFoundInColumn = puzzle[u_row][col] == puzzle[row][col][optionIndex];
                                    } catch (ex) {
                                        console.log(ex + "can't process " + puzzle[u_row][col])
                                    }
                                }
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
                            if (col != u_col) {
                                if (Array.isArray(puzzle[row][u_col])) {
                                    hasOptionBeenFoundInRow = puzzle[row][u_col].includes(puzzle[row][col][optionIndex]);
                                } else {
                                    try {
                                        hasOptionBeenFoundInRow = puzzle[row][u_col] == puzzle[row][col][optionIndex];
                                    } catch (ex) {
                                        console.log(ex + "can't process " + puzzle[row][u_col])
                                    }
                                }
                            }
                        }
                        // if the option we're looking at for this cell, does not exist in any other cell in the column, we must accept it
                        if (!hasOptionBeenFoundInRow) {
                            puzzle[row][col] = puzzle[row][col][optionIndex];
                            break;
                        }
                    }
                }

                // Coupling: e.g. [1,2] & [1,2] in block/row/column => remove these options from rest of block/row/column
                if (Array.isArray(puzzle[row][col]) && puzzle[row][col].length == 2) {
                    for (u_col = 0; u_col < 9; u_col++) {
                        if (col != u_col) {
                            if (JSON.stringify(puzzle[row][u_col]) == JSON.stringify(puzzle[row][col])) {
                                // console.log("Coupling found in row: " + puzzle[row][u_col]);
                                const cuplet1 = puzzle[row][u_col][0];
                                const cuplet2 = puzzle[row][u_col][1];

                                for (remove_col = 0; remove_col < 9; remove_col++) {
                                    if (remove_col != col && remove_col != u_col) {
                                        puzzle[row][remove_col] = arrayRemove(puzzle[row][remove_col], cuplet1);
                                        puzzle[row][remove_col] = arrayRemove(puzzle[row][remove_col], cuplet2);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                if (Array.isArray(puzzle[row][col]) && puzzle[row][col].length == 2) {
                    for (u_row = 0; u_row < 9; u_row++) {
                        if (row != u_row) {
                            if (JSON.stringify(puzzle[u_row][col]) == JSON.stringify(puzzle[row][col])) {
                                // console.log("Coupling found in column: " + puzzle[u_row][col]);
                                const cuplet1 = puzzle[u_row][col][0];
                                const cuplet2 = puzzle[u_row][col][1];

                                for (remove_row = 0; remove_row < 9; remove_row++) {
                                    if (remove_row != row && remove_row != u_row) {
                                        puzzle[remove_row][col] = arrayRemove(puzzle[remove_row][col], cuplet1);
                                        puzzle[remove_row][col] = arrayRemove(puzzle[remove_row][col], cuplet2);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
        
        // Check within each 3x3 block which cells have a value
        for(blockX = 0; blockX < 9; blockX = blockX + 3 ) {
            for(blockY = 0; blockY < 9; blockY = blockY + 3) {
                for (cell = {y: blockY, x: blockX}; cell != null; cell = iterateNextCellInBlock(cell)) {
                    checkForValuesInBlock(cell.y, cell.x, blockY, blockX);
                }
                // Coupling check
                processCoupledCellsInBlock(blockY, blockX);
            }
        }

        checkRowBlockAffinity();

        // Possible TODO... Option uniqueness: [3,4,5,7,9] in last block - 7 is the only value this can be. Cell has a unique option for row, col or block
    }
    printProgress();
    return puzzle;
}

module.exports.solveSudoku = solveSudoku;