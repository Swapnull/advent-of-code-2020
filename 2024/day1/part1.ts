import fs from "fs";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");
const columns = [[], []];

rows.map((row) => {
  const [left, right] = row.split("   ");
  columns[0].push(left);
  columns[1].push(right);
});

const sortedColumns = columns.map((col) => col.sort((a, b) => a - b));

console.log(sortedColumns);

let total = 0;
for (let i = 0; i < sortedColumns[0].length; i++) {
  const diff = Math.abs(sortedColumns[0][i] - sortedColumns[1][i]);
  total += diff;
}

console.log(total);

//2086478
