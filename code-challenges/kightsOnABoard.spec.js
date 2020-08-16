const { expect } = require('chai');
const {
  addArray,
  validateArray,
  getCapturePositions,
  canCaptureKnight,
  scanBoardCanAnyKnightCapture
} = require('./kightsOnABoard');


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

describe('knightsOnABoard', () => {
  describe('addArray()', () => {
    it('should return correct value', () => {
      const output = addArray([4, 2], [1, -2]);
      expect(output).to.deep.equal([5, 0]);
    });
  });

  describe('validateArray()', () => {
    it('should validate input array correctly', () => {
      const inputArray = [
        [0, 0],
        [1, 2],
        [-1, 2],
        [-2, -2],
        [8, 6],
        [7, 8]
      ];
      const expectedOutput = [true, true, false, false, false, false];
      
      inputArray.forEach((value, index) => {
        const output = validateArray(value);
        expect(output).to.equal(expectedOutput[index]);
      });
    });
  });

  describe('getCapturePositions()', () => {
    it('should return only valid capture positions', () => {
      const position = [0, 3];
      const output = getCapturePositions(position);
      expect(output).to.deep.equal([ [ 1, 1 ], [ 2, 2 ], [ 1, 5 ], [ 2, 4 ] ]);
    })
  });

  describe('canCaptureKnight()', () => {
    it('should return true when knight can capture each other', () => {
      const canCapture = [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0]
      ];
      const capturePos = [[ 1, 1 ], [ 2, 2 ], [ 1, 5 ], [ 2, 4 ]];
      const output = canCaptureKnight(capturePos, canCapture);
      expect(output).to.be.true;
    });
    it('should return false when knight cannot capture each other', () => {
      const cannotCapture = [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0]
      ];
      const capturePos = [[ 1, 1 ], [ 2, 2 ], [ 1, 5 ], [ 2, 4 ]];
      const output = canCaptureKnight(capturePos, cannotCapture);
      expect(output).to.be.false;
    });
  });


  describe('scanBoardCanAnyKnightCapture()', () => {
    it('should return false if any knight cannot capture', () => {
      const testCaseForFalse = [
        [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1]
      ]
    ];
    testCaseForFalse.forEach((board) => {
      const output = scanBoardCanAnyKnightCapture(board);
      expect(output).to.be.false;
    });
    });
    it('should return true if any knight can capture', () => {
      const testCaseForTrue = [[
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 1]
      ],
      [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 0, 1]
      ],
      [
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0]
      ]
    ];
    testCaseForTrue.forEach((board) => {
      const output = scanBoardCanAnyKnightCapture(board);
      expect(output).to.be.true;
      });
    });
  }); // end of describe
  
});