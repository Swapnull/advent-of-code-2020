import fs from "fs";
import { chunk, uniq } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = input.split("\n");

const rowsWithNumbers = rows.slice(0, -1);

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

  // console.log("currRowItems", currRowItems);
});

// const formattedRows = [];

// console.log("formatted", checkRow(rowToCheck));

const methodRow = rows[rows.length - 1];

const methodIndexes = [];

console.log("methodRow", methodRow);
methodRow.split("").forEach((char, index) => {
  if (char !== " ") {
    methodIndexes.push(index);
  }
});
console.log("methodRow", methodRow);
console.log("methodIndexes", methodIndexes);

const checkRow = (methodIndex: number) => {
  console.log("row", rowsWithNumbers[0]);

  const result = [];

  let allEmpty = false;

  let currentIndex = methodIndex;

  while (!allEmpty && currentIndex < methodIndex + 5) {
    const numbers = [];
    for (let i = 0; i < rowsWithNumbers.length; i++) {
      if (rowsWithNumbers[i][currentIndex] !== " ") {
        numbers.push(rowsWithNumbers[i][currentIndex]);
      }
    }

    if (numbers.length === 0) {
      allEmpty = true;
    } else {
      console.log("numbers", numbers);
      result.push(numbers.join(""));
    }

    currentIndex++;
  }

  return result;
};

console.log("checkRow", checkRow(methodIndexes[1]));

const formattedRows = [];

let results = [];

for (let i = 0; i < methodIndexes.length; i++) {
  console.log("---------");
  const row = checkRow(methodIndexes[i]);
  console.log("row result", row);

  const method = rows[rows.length - 1][methodIndexes[i]];
  if (method) {
    console.log("method", method);
  }

  if (method === "*") {
    const result = row.reduce((acc, curr) => {
      console.log("acc", acc, curr);
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

console.log("results", results);

console.log(
  "final result",
  results.reduce((acc, curr) => acc + curr, 0)
);
