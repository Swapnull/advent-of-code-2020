import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n").filter(Boolean);

const coords = rows.map((row) =>
  row.split(" -> ").map((pos) => pos.split(",").map((n) => Number(n)))
);

console.log("total", coords.length);

const handleStraightLines = () => {
  const straightLines = coords.filter(
    ([x, y]) => x[0] === y[0] || x[1] === y[1]
  );

  console.log("straights", straightLines.length);

  const generateStraightLineCoords = (row: Array<Array<number>>) => {
    const [x, y] = row;
    const hits: Array<string> = [];
    if (x[0] === y[0]) {
      const [start, end] = [x[1], y[1]].sort((a, b) => a - b);
      for (let i = start; i < end + 1; i++) {
        hits.push(`${x[0]}-${i}`);
      }
    } else {
      const [start, end] = [x[0], y[0]].sort((a, b) => a - b);
      for (let i = start; i < end + 1; i++) {
        hits.push(`${i}-${y[1]}`);
      }
    }

    return hits;
  };

  const straightCoords = straightLines.map((line) =>
    generateStraightLineCoords(line)
  );
  return straightCoords.flat();
};

const handleDiagonals = () => {
  const diagonals = coords.filter(([x, y]) => x[0] !== y[0] && x[1] !== y[1]);

  console.log("diagonals", diagonals.length);

  const generateDiagonalCoords = (row: Array<Array<number>>) => {
    const [x, y] = row;

    const foundCoords: Array<string> = [`${x[0]}-${x[1]}`];

    let curr = [...x];
    while (curr[0] !== y[0] && curr[1] !== y[1]) {
      let newX = curr[0];
      let newY = curr[1];
      if (newX !== y[0]) {
        if (newX > y[0]) {
          newX -= 1;
        } else {
          newX += 1;
        }
      }
      if (newY !== y[1]) {
        if (newY > y[1]) {
          newY -= 1;
        } else {
          newY += 1;
        }
      }
      foundCoords.push(`${newX}-${newY}`);
      curr = [newX, newY];
    }
    return foundCoords;
  };
  return diagonals.map((line) => generateDiagonalCoords(line)).flat();
};

const allCoords = [...handleStraightLines(), ...handleDiagonals()];

const seen: Array<{ id: string; count: number }> = [];

allCoords.flat().map((coord) => {
  const seenIndex = seen.findIndex(({ id }) => id === coord);
  if (seenIndex >= 0) {
    seen[seenIndex].count += 1;
  } else {
    seen.push({ id: coord, count: 1 });
  }
});

const duplicates = seen.filter(({ count }) => count > 1);

console.log(duplicates.length);
