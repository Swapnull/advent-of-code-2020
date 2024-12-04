import fs from "fs";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const puzzle = input.split("\n").map((i) => i.split(""));

const colLen = puzzle[0].length;

const checkDirection = (x: number, y: number) => {
  // Define all 8 directions as [dx, dy] pairs
  const directions = [
    [0, -1], // North
    [1, -1], // Northeast
    [1, 0], // East
    [1, 1], // Southeast
    [0, 1], // South
    [-1, 1], // Southwest
    [-1, 0], // West
    [-1, -1], // Northwest
  ];

  const found = [];

  for (const [dx, dy] of directions) {
    // Calculate the three positions to check
    const positions = [
      [x + dx, y + dy], // M
      [x + dx * 2, y + dy * 2], // A
      [x + dx * 3, y + dy * 3], // S
    ];

    // Check if all positions are within bounds
    const withinBounds = positions.every(
      ([px, py]) => px >= 0 && px < colLen && py >= 0 && py < puzzle.length
    );

    if (withinBounds) {
      const hasM = puzzle[positions[0][0]][positions[0][1]] === "M";
      const hasA = puzzle[positions[1][0]][positions[1][1]] === "A";
      const hasS = puzzle[positions[2][0]][positions[2][1]] === "S";

      if (hasM && hasA && hasS) {
        console.log("FOUND", positions);
        found.push(positions);
      }
    }
  }

  return found.length;
};

let res = 0;

console.log(puzzle.length, colLen);

for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < colLen; x++) {
    const foundX = puzzle[x][y] === "X";

    if (foundX) {
      console.log("FOUND X", foundX, y, x);

      const found = checkDirection(x, y);
      res += found;
      console.log(found);
    }
  }
}

console.log(res);
