/*
let puzzle =   [[5, 3, 0, 0, 7, 0, 0, 0, 0], 
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]];

let puzzle =   [[3, 6, 0, 0, 0, 0, 0, 0, 8], 
                [2, 0, 0, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 4, 0, 0, 0, 0, 0],
                [0, 9, 0, 0, 6, 0, 0, 8, 2],
                [0, 8, 4, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 6, 0, 5],
                [0, 0, 7, 0, 0, 5, 1, 0, 0],
                [0, 0, 0, 7, 0, 9, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 2, 0, 6]];
*/
module.exports.solveSudoku = function solveSudoku(puzzle) {
    let iterations = 0;
    const maxIterations = 10;
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

    function columnIncludes(columnIndex, value) {
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
        console.log(`Current size of stringified puzzle ${stringPuzzle.length}. Iterations = ${iterations}`);
        puzzle.forEach(row => {
            console.log(JSON.stringify(row));
        });
    }

    function arrayRemove(arrayToRemoveFrom, value) { 
        if (!Array.isArray(arrayToRemoveFrom)) {
            return arrayToRemoveFrom;
        }
        const newArray = arrayToRemoveFrom.filter(function(element){ return element != value; });
        // if only 1 item is left in the array, convert to number
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
        // printProgress();
        iterations++;
        // Analyse each row
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                if (typeof(puzzle[row][col]) == "object") { // this cell is an array so is unsolved
                    puzzle[row][col].forEach(possibleOption => {
                        // check all the possible items for the cell. If there already exists one of the options in the row, then remove it as an option
                        if (puzzle[row].includes(possibleOption)) {
                            puzzle[row][col] = arrayRemove(puzzle[row][col], possibleOption);
                        }
                    });
                }
            }
        }
        // Analyse each column
        for (col = 0; col < 9; col++) {
            for (row = 0; row < 9; row++) {
                if (Array.isArray(puzzle[row][col])) { // this cell is an array so is unsolved
                    puzzle[row][col].forEach(possibleOption => {
                        // check all the possible items for the cell. If there already exists one of the options in the column, then remove it as an option
                        if (columnIncludes(col, possibleOption)) {
                            puzzle[row][col] = arrayRemove(puzzle[row][col], possibleOption);
                        }
                    });
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