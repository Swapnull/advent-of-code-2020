import fs from "fs";
import { chunk, uniq } from "lodash";

const fileInput = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = fileInput.split("\n");

const start = rows[0].split("").findIndex((char) => char === "S");
console.log("start", start);
const totalRows = rows.length - 1;

const cache = new Map<string, number>();

const processRow = (input: number[], rowIndex: number): number => {
  if (rowIndex > totalRows) {
    return 1;
  }

  const row = rows[rowIndex].split("");
  const rowitems = row.filter((_, index) => input.includes(index));

  const output: number[] = [];
  rowitems.forEach((item, index) => {
    if (item === "^") {
      output.push(input[index] - 1);
      output.push(input[index] + 1);
    } else if (item === ".") {
      output.push(input[index]);
    }
  });

  const uniqOutput = uniq(output);

  let res = 0;
  uniqOutput.forEach((item) => {
    const key = `${rowIndex + 1}-${item}`;
    if (cache.has(key)) {
      res += cache.get(key)!;
    } else {
      const subResult = processRow([item], rowIndex + 1);
      cache.set(key, subResult);
      res += subResult;
    }
  });

  return res;
};

console.log("total", processRow([start], 1));
