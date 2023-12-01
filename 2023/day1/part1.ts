import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

console.log(rows);
const ans = rows.map((row) => {
  const numbers = row.match(/\d+/g).flatMap((num) => num.split(""));

  const first = numbers[0];
  const last = numbers[numbers.length - 1];

  return Number(`${first}${last}`);
});

console.log(ans);

console.log(ans.reduce((agg, num) => agg + num, 0));
