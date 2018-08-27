import { expect } from 'chai';
import {
  createCanvas,
  renderCanvas,
  generateHorizontalBorder,
  drawLine,
  drawRectangle,
  fillArea,
} from '../commands';

describe('Commands', () => {
  let canvas;

  beforeEach('Generate 20 x 4 canvas.', () => {
    canvas = createCanvas(20, 4);
  });
  
  describe('createCanvas', () => {
    it('should create an M x N canvas.', () => {
      const expected = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ];

      expect(canvas).to.deep.equal(expected);
    });

    it('should not allow dimensions smaller than 1 x 1.', () => {
      expect(createCanvas.bind(null, 0, 0)).to.throw('Invalid canvas size.');
    });
  });

  describe('drawLine', () => {
    describe('should draw a horizontal line', () => {
      it('from left to right if x1 is less than x2.', () => {
        const leftToRight = drawLine(canvas, 1, 2, 6, 2);
        const expected = [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];

        expect(leftToRight).to.deep.equal(expected);
      });

      it('from right to left if x1 is greater than x2.', () => {
        const rightToLeft = drawLine(canvas, 6, 2, 1, 2);
        const expected = [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          ['x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];

        expect(rightToLeft).to.deep.equal(expected);
      });
    });

    describe('should draw a vertical line', () => {
      it('from top to bottom if y1 is less than y2.', () => {
        const topToBottom = drawLine(canvas, 6, 3, 6, 4);
        const expected = [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];

        expect(topToBottom).to.deep.equal(expected);
      });

      it('from bottom to top if y1 is greater than y2.', () => {
        const topToBottom = drawLine(canvas, 6, 4, 6, 3);
        const expected = [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ];

        expect(topToBottom).to.deep.equal(expected);
      });
    });

    it('should not allow drawing lines that extend out of the canvas.', () => {
      expect(drawLine.bind(null, canvas, 1, 2, 30, 2)).to.throw('Draw inside the canvas.');
      expect(drawLine.bind(null, canvas, 1, 1, 1, 10)).to.throw('Draw inside the canvas.');
    });

    it('should not allow diagonal lines.', () => {
      expect(drawLine.bind(null, canvas, 1, 1, 4, 4)).to.throw('Only vertical or horizontal lines are supported.');
    });
  });

  describe('drawRectangle', () => {
    it('should draw a rectangle.', () => {
      const rectangle = drawRectangle(canvas, 14, 1, 18, 3);
      const expected = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'x', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'x', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ];

      expect(rectangle).to.deep.equal(expected);
    });

    it('should not allow rectangles that extend out of the canvas.', () => {
      expect(drawRectangle.bind(null, canvas, 14, 1, 30, 3)).to.throw('Draw inside the canvas.');
      expect(drawRectangle.bind(null, canvas, 14, 1, 18, 10)).to.throw('Draw inside the canvas.');
    });
  });

  describe('fillArea', () => {
    it('should fill the area surrounding the point.', () => {
      const filled = fillArea(canvas, 1, 1, 'c');
      const expected = [
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
        ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c'],
      ];

      expect(filled).to.deep.equal(expected);
    });

    it('should fill the area surrounding the point but avoiding other drawings.', () => {
      let canvasWithDrawings = drawLine(canvas, 1, 2, 6, 2);
      canvasWithDrawings = drawLine(canvasWithDrawings, 6, 3, 6, 4);
      canvasWithDrawings = drawRectangle(canvasWithDrawings, 14, 1, 18, 3);
      
      const filled = fillArea(canvasWithDrawings, 10, 3, 'o');
      const expected = [
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'x', 'o', 'o'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', ' ', ' ', ' ', 'x', 'o', 'o'],
        [' ', ' ', ' ', ' ', ' ', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'x', 'o', 'o'],
        [' ', ' ', ' ', ' ', ' ', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
      ];

      expect(filled).to.deep.equal(expected);
    });
  });

  describe('generateHorizontalBorder', () => {
    it('should generate an array of dashes equal to the length passed plus one on each end.', () => {
      const border = generateHorizontalBorder(4);
      const expected = ['-', '-', '-', '-', '-', '-'];

      expect(border).to.deep.equal(expected);
    });
  });

  describe('renderCanvas', () => {
    it('should render the canvas with the given cells and surrounded by borders.', () => {
      const rendered = renderCanvas(canvas);
      const expected = 
        '----------------------\n' +
        '|                    |\n' +
        '|                    |\n' +
        '|                    |\n' +
        '|                    |\n' +
        '----------------------'
      ;

      expect(rendered).to.equal(expected);
    });

    it('should render the canvas with drawings.', () => {
      let canvasWithDrawings = drawLine(canvas, 1, 2, 6, 2);
      canvasWithDrawings = drawLine(canvasWithDrawings, 6, 3, 6, 4);
      canvasWithDrawings = drawRectangle(canvasWithDrawings, 14, 1, 18, 3);

      const rendered = renderCanvas(canvasWithDrawings);
      const expected = 
        '----------------------\n' +
        '|             xxxxx  |\n' +
        '|xxxxxx       x   x  |\n' +
        '|     x       xxxxx  |\n' +
        '|     x              |\n' +
        '----------------------'
      ;

      expect(rendered).to.equal(expected);
    });

    it('should render the canvas with drawings and filled area.', () => {
      let canvasWithDrawings = drawLine(canvas, 1, 2, 6, 2);
      canvasWithDrawings = drawLine(canvasWithDrawings, 6, 3, 6, 4);
      canvasWithDrawings = drawRectangle(canvasWithDrawings, 14, 1, 18, 3);

      const filled = fillArea(canvasWithDrawings, 10, 3, 'o');
      const rendered = renderCanvas(filled);
      const expected = 
        '----------------------\n' +
        '|oooooooooooooxxxxxoo|\n' +
        '|xxxxxxooooooox   xoo|\n' +
        '|     xoooooooxxxxxoo|\n' +
        '|     xoooooooooooooo|\n' +
        '----------------------'
      ;

      expect(rendered).to.equal(expected);
    });
  });
});
