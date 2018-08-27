/**
 * Creates an m x n canvas.
 * @param {number} width - The width (columns) of the canvas.
 * @param {number} height - The height (rows) of the canvas.
 * @returns {string[][]} An array of cells.
 */
function createCanvas(width, height) {
  if (!width || !height || width < 1 || height < 1) {
    throw new Error('Invalid canvas size.');
  }

  const canvas = [];

  for (let i = 0; i < height; i++) {
    const row = new Array(width);

    row.fill(' ', 0);
    canvas.push(row);
  }

  return canvas;
}

/**
 * Renders the canvas.
 * @param {string[][]} cells - The cells of the canvas.
 * @returns {string} The rendered canvas.
 */
function renderCanvas(cells) {
  const canvas = [];

  canvas.push(generateHorizontalBorder(cells[0].length));
  cells.forEach((row) => canvas.push(['|', ...row, '|']));
  canvas.push(generateHorizontalBorder(cells[0].length));

  return canvas.reduce((rows, row) => {
    rows.push(row.join(''));

    return rows;
  }, []).join('\n');
}

/**
 * Generates an array of dashes (-) to be used for the top/bottom border.
 * @param {number} length - The number of columns the canvas has.
 * @returns {string[]} An array of dashes (-).
 */
function generateHorizontalBorder(length) {
  const border = new Array(length + 2);

  border.fill('-', 0);

  return border;
}

/**
 * Draws a horizontal or vertical line bsaed on the given coordinates.
 * @param {string[][]} cells - The cells of the canvas.
 * @param {number} x1 - The x coordinate of the start point.
 * @param {number} y1 - The y coordinate of the start point.
 * @param {number} x2 - The x coordinate of the end point.
 * @param {number} y2 - The y coordinate of the end point.
 * @returns {string[][]} The updated array of cells.
 */
function drawLine(cells, x1, y1, x2, y2) {
  if ([x1, y1, x2, y2].some((point) => point < 1)
    || x1 > cells[0].length
    || x2 > cells[0].length
    || y1 > cells.length
    || y2 > cells.length) {
    throw new Error('Draw inside the canvas.');
  }

  if(x1 !== x2 && y1 !== y2) {
    throw new Error('Only vertical or horizontal lines are supported.');
  }

  const updatedCells = cells.map((row) => row.slice(0));

  // Horizontal
  if (x1 !== x2) {
    // Switch coordinates if x1 is greater than x2.
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }

    updatedCells[y1 - 1].fill('x', x1 - 1, x2);

    return updatedCells;
  }

  // Vertical
  // Switch coordinates if y1 is greater than y2.
  if (y1 > y2) {
    [y1, y2] = [y2, y1];
  }

  for (let i = y1 - 1; i < y2; i++) {
    updatedCells[i][x1 - 1] = 'x';
  }

  return updatedCells;
}

/**
 * Draws a rectangle from the upper left corner (x1, y1) to its lower
 * right corner (x2, y2).
 * @param {string[][]} cells - The cells of the canvas.
 * @param {number} x1 - The x coordinate of the upper left corner.
 * @param {number} y1 - The y coordinate of the upper left corner.
 * @param {number} x2 - The x coordinate of the lower right corner.
 * @param {number} y2 - The y coordinate of the lower right corner.
 * @returns {string[][]} The updated array of cells.
 */
function drawRectangle(cells, x1, y1, x2, y2) {
  let updated = drawLine(cells, x1, y1, x2, y1);
  updated = drawLine(updated, x2, y1, x2, y2);
  updated = drawLine(updated, x2, y2, x1, y2);
  return drawLine(updated, x1, y2, x1, y1);
}

/**
 * Fills the entire area connected to x, y with "color" that is bound by other shapes.
 * (Behaves like Paint's "bucket fill" tool.)
 * @param {string[][]} cells - The cells of the canvas.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @param {string} color - The "color" to fill the area with, i.e., "c", fills the space with "c".
 * @returns {string[][]} The updated array of cells.
 */
function fillArea(cells, x, y, color) {
  const updatedCells = cells.map((row) => row.slice(0));

  fill(updatedCells, x, y, cells[y][x], color);

  return updatedCells;
}

// Algorithm from: https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/
/**
 * Fills the entire area connected to x, y with "color" that is bound by other shapes.
 * (Behaves like Paint's "bucket fill" tool.)
 * @param {string[][]} cells - The cells of the canvas.
 * @param {number} x - The x coordinate of the point.
 * @param {number} y - The y coordinate of the point.
 * @param {string} previousColor - The previous "color".
 * @param {string} newColor - The "color" to fill the area with, i.e., "c", fills the space with "c".
 */
function fill(cells, x, y, previousColor, newColor) {
  if (x < 0 || y < 0
    || x >= cells[0].length || y >= cells.length
    || cells[y][x] !== previousColor) {
    return;
  }
  
  cells[y][x] = newColor;

  fill(cells, x + 1, y, previousColor, newColor);
  fill(cells, x - 1, y, previousColor, newColor);
  fill(cells, x, y + 1, previousColor, newColor);
  fill(cells, x, y - 1, previousColor, newColor);
}

module.exports = {
  createCanvas,
  renderCanvas,
  generateHorizontalBorder,
  drawLine,
  drawRectangle,
  fillArea,
};
