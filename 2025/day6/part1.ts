import fs from "fs";
import { chunk, uniq } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = input.split("\n");

const rowItems = [];
rows.forEach((row) => {
  let currRow = "";
  let currRowItems = [];
  row.split("").forEach((char, index) => {
    if (char !== " ") {
      currRow += char;
    }
    if (char === " " && currRow.length > 0) {
      currRowItems.push(currRow);
      currRow = "";
    }
    if (index === row.length - 1) {
      currRowItems.push(currRow);
    }
  });
  rowItems.push(currRowItems);

  console.log("currRowItems", currRowItems);
});

const formattedRows = [];

for (let i = 0; i < rowItems[0].length; i++) {
  let calc = [];
  for (let j = 0; j < rowItems.length - 1; j++) {
    const isValid = !!rowItems[j][i];
    if (isValid) {
      calc.push(rowItems[j][i]);
    }
  }
  formattedRows.push(calc);
  console.log("calc", calc);
}

console.log("formattedRows", formattedRows);

let results = [];

for (let i = 0; i < formattedRows.length; i++) {
  const row = formattedRows[i];
  console.log("row", row);

  const method = rowItems[rowItems.length - 1][i];
  if (method) {
    console.log("method", method);
  }

  if (method === "*") {
    const result = row.reduce((acc, curr) => {
      console.log("acc", acc);
      return acc * Number(curr);
    }, 1);
    console.log("result", result);
    results.push(result);
  } else if (method === "+") {
    const result = row.reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);
    console.log("result", result);
    results.push(result);
  } else if (method === "-") {
    const result = row.reduce((acc, curr) => {
      return acc - Number(curr);
    }, 0);
    console.log("result", result);
    results.push(result);
  } else if (method === "/") {
    const result = row.reduce((acc, curr) => {
      return acc / Number(curr);
    }, 1);
    console.log("result", result);
    results.push(result);
  }
}

console.log(
  "results",
  results.reduce((acc, curr) => acc + curr, 0)
);
