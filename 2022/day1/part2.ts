import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n");

let elves = [[]];
rows.map((row) => {
  if (row.length === 0) elves.push([]);
  else {
    elves[elves.length - 1].push(parseInt(row));
  }
});

const [elf1, elf2, elf3] = elves.map((elf) => sum(elf)).sort((a, b) => b - a);

console.log(elf1 + elf2 + elf3);
