import fs from "fs";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const puzzle = input.split("\n").map((i) => i.split(""));

const colLen = puzzle[0].length;

const checkDirection = (x: number, y: number) => {
  // Define all 8 directions as [dx, dy] pairs
  const directions = [
    [1, -1], // Northeast
    [1, 1], // Southeast
    [-1, 1], // Southwest
    [-1, -1], // Northwest
  ];

  const found = [];

  for (const [dx, dy] of directions) {
    // Calculate the positions to check
    const positionToCheck = [x + dx, y + dy];

    console.log("POSITION TO CHECK", positionToCheck);

    // Check if all positions are within bounds
    const withinBounds =
      positionToCheck[0] >= 0 &&
      positionToCheck[0] < puzzle.length &&
      positionToCheck[1] >= 0 &&
      positionToCheck[1] < colLen;

    if (withinBounds) {
      const getPos = puzzle[positionToCheck[1]][positionToCheck[0]];
      found.push(getPos);
    } else {
      found.push(null);
    }
  }

  console.log("FOUND", found);

  let count = 0;

  if (found[0] === "M" && found[2] === "S") {
    count++;
  }
  if (found[0] === "S" && found[2] === "M") {
    count++;
  }
  if (found[1] === "S" && found[3] === "M") {
    count++;
  }
  if (found[1] === "M" && found[3] === "S") {
    count++;
  }

  return count == 2 ? 1 : 0;
};

let res = 0;

for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < colLen; x++) {
    const foundA = puzzle[y][x] === "A";

    if (foundA) {
      res += checkDirection(x, y);
    }
  }
}

console.log(res);

//2029
