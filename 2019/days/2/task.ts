import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input
  .split(",")
  .filter(Boolean)
  .map((row) => parseInt(row));

rows[1] = 12;
rows[2] = 2;
let finished = false;

const runAction = (op: number, current: number) => {
  if (op === 1) {
    rows[rows[current + 2]] = rows[rows[current]] + rows[rows[current + 1]];
  } else if (op === 2) {
    rows[rows[current + 2]] = rows[rows[current]] * rows[rows[current + 1]];
  } else if (op === 99) {
    console.log("finished", op, current);
    finished = true;
  }
};

for (let i = 0; i < rows.length && !finished; i += 4) {
  runAction(rows[i], i + 1);
}

console.log(rows[0]);
