import fs from "fs";
import { chunk, uniq } from "lodash";

const fileInput = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = fileInput.split("\n");

const start = rows[0].split("").findIndex((char) => char === "S");
console.log("start", start);
const totalRows = rows.length - 1;

let totalSplits = 0;

const processRow = (input: number[], rowIndex: number) => {
  const row = rows[rowIndex].split("");
  const rowitems = row.filter((_, index) => input.includes(index));

  const output = [];
  rowitems.forEach((item, index) => {
    if (item === "^") {
      output.push(input[index] - 1);
      output.push(input[index] + 1);
    } else if (item === ".") {
      output.push(input[index]);
    }
  });

  totalSplits += output.length - input.length;

  const uniqOutput = uniq(output);
  console.log("rowitems", rowitems, uniqOutput, totalSplits);

  return uniqOutput;
};

let input = [start];

for (let i = 1; i <= totalRows; i++) {
  const result = processRow(input, i);
  input = result;
}
// console.log("row result", processRow([start], 2));

console.log("totalSplits", totalSplits);
