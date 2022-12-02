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

console.log(max(elves.map((elf) => sum(elf))));
