import fs from "fs";
import { countBy, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");
const columns = [[], []];

rows.map((row) => {
  const [left, right] = row.split("   ");
  columns[0].push(left);
  columns[1].push(right);
});

let counts = [];
for (let i = 0; i < columns[0].length; i++) {
  const toCompare = columns[0][i];
  const found = columns[1].filter((c) => c === toCompare);
  counts.push(found.length * toCompare);
}

console.log(counts);
console.log(sum(counts));

//24941624
