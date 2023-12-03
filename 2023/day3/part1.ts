import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const symbols = [];
const numbers = [];

rows.map((row, ri) => {
  let curr = "";
  let currStart = null;
  row.split("").map((col, ci) => {
    const isNum = !isNaN(parseInt(col));
    const isDot = col === ".";
    const isSymbol = !isDot && !isNum;

    if (isNum) {
      curr += col;
      if (currStart === null) currStart = ci;
    }

    if (isDot || isSymbol || ci === row.length - 1) {
      if (currStart !== null) {
        numbers.push({ number: parseInt(curr), r: ri, cs: currStart, ce: ci - 1 });
        curr = "";
        currStart = null;
      }
    }

    if (isSymbol) {
      symbols.push({ symbol: col, r: ri, c: ci });
    }
  });
});

const valid = [];

numbers.forEach((num) => {
  const { number, r, cs, ce } = num;
  const symbol = symbols.findIndex((sym) => {
    if (sym.r >= r - 1 && sym.r <= r + 1) {
      if (sym.c >= cs - 1 && sym.c <= ce + 1) {
        return true;
      }
    }
  });
  if (symbol !== -1) {
    valid.push(number);
  }
});

console.log(valid);
console.log(sum(valid));
