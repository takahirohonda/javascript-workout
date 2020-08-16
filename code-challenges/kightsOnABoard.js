/* Code Challenge: Knights on a Board

https://edabit.com/challenge/YFkyAh5sm9Guqth85

Write a function that returns true if the knights are placed on a chessboard such that no knight can capture another knight. 
Here, 0s represent empty squares and 1s represent knights.
*/

const canCapture = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0]
];

const nightCapturePositions = [
  [-2, 1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [-2, -1],
  [-1, 2],
  [1, 2],
  [2, 1]
];

const scanBoardCanAnyKnightCapture = (board) => {

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 1) {
        const capturePos = getCapturePositions([i, j]);
        if (canCaptureKnight(capturePos, board)) {
          // console.log('this can capture: ', i, j)
          return true;
        }
      }
    }
  }
  return false;
}

// find if there are any other knight in a capture position
const canCaptureKnight = (capturePositions, inputArray) => {

  for (let i = 0; i < capturePositions.length; i++) {
    if (inputArray[capturePositions[i][0]][capturePositions[i][1]] === 1) {
      // console.log('this positon is 1: ', capturePositions[i])
      return true;
    }
  }
  return false;
}

// find all the locations where the knight can capture another knight.
const getCapturePositions = (nightPosition) => {
  const outputArray = [];
  nightCapturePositions.forEach((capturePos) => {
    const calculatedPos = addArray(nightPosition, capturePos);
    const isValid = validateArray(calculatedPos);
    if (isValid) {
      outputArray.push(calculatedPos);
    }
  });
  return outputArray;
}

// Same length array. Subtract each. e.g: [4, 2] - [2, 2] = [2, 0]
const addArray = (array1, array2) => {
  const output = [];
  array1.forEach((value, index) => {
    output.push(value + array2[index]);
  });
  return output;
}

// Validate position array
const validateArray = (positionArray) => {
  let valid = true;
  positionArray.forEach((value) => {
    if (value <= -1 || value >= 8) {
      valid = false;
    };
  });
  return valid;
}

module.exports = {
  getCapturePositions,
  addArray,
  validateArray,
  canCaptureKnight,
  scanBoardCanAnyKnightCapture
}