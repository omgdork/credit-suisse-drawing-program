# Simple Drawing Program
A simple drawing program that can create a canvas, draw horizontal or vertical lines, draw rectangles, and fill areas.

```
Command         Description
C w h           Creates a new canvas of width w and height h.
L x1 y1 x2 y2   Creates a new line from (x1, y1) to (x2, y2). Currently only
                horizontal or vertical lines are supported. Horizontal and vertical lines
                will be drawn using the "x" character.
R x1 y1 x2 y2   Creates a new rectangle, whose upper left corner is (x1, y1) and
                lower right corner is (x2, y2). Horizontal and vertical lines will be drawn
                using the 'x' character.
B x y c         Fills the entire area connected to (x, y) with "colour" c. The
                behaviour of this is the same as that of the "bucket fill" tool in paint
                programs.
Q               Quits the program.
```

## Installation
Run `npm install` or `yarn install`.

## Running the App
Run `npm start` or `yarn start`.

## Running the Tests
Run `npm run test` or `yarn test`.
