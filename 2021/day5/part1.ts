import fs from "fs";
import { uniq } from "lodash";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n").filter(Boolean);

const coords = rows.map((row) =>
  row.split(" -> ").map((pos) => pos.split(",").map((n) => Number(n)))
);

const straightLines = coords.filter(([x, y]) => x[0] === y[0] || x[1] === y[1]);

console.log(straightLines.length);

const generateCoords = (row: Array<Array<number>>) => {
  const [x, y] = row;
  const hits: Array<string> = [];
  if (x[0] === y[0]) {
    const [start, end] = [x[1], y[1]].sort();
    for (let i = start; i < end + 1; i++) {
      hits.push(`${x[0]}-${i}`);
    }
  } else {
    const [start, end] = [x[0], y[0]].sort();
    for (let i = start; i < end + 1; i++) {
      hits.push(`${i}-${y[1]}`);
    }
  }

  return hits;
};
const allCoords = straightLines.map((line) => generateCoords(line));

/*
fs.writeFile(
  path.join(__dirname, "debug.txt"),
  JSON.stringify({ coords: allCoords.splice(0, 20) }),
  (err) => console.log(err)
);*/

const seen: Array<{ id: string; count: number }> = [];

allCoords.flat().map((coord) => {
  const seenIndex = seen.findIndex(({ id }) => id === coord);
  if (seenIndex >= 0) {
    seen[seenIndex].count += 1;
  } else {
    seen.push({ id: coord, count: 1 });
  }
});

/*
fs.writeFile(
  path.join(__dirname, "debug2.txt"),
  JSON.stringify({ coords: seen.filter(({ count }) => count > 1) }),
  (err) => console.log(err)
);*/

const duplicates = seen.filter(({ count }) => count > 1);

console.log("allCoords", allCoords.flat().length);
console.log("uniqAllCords", uniq(allCoords.flat()).length);

console.log(seen.length);

console.log(duplicates.length);

// 6898 too low
// 97703 too high
