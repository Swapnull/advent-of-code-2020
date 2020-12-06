import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input
  .split("\n")
  .filter(Boolean)
  .map((row) => parseInt(row));

const totalFuel = rows.reduce(
  (total, row) => total + Math.floor(row / 3) - 2,
  0
);

console.log(totalFuel);
