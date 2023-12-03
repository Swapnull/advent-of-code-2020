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

const gears = symbols.filter((sym) => sym.symbol === "*");
gears.forEach((gear) => {
  const { r, c } = gear;
  const adjacent = numbers.filter((num) => {
    if (r >= num.r - 1 && r <= num.r + 1) {
      if (c >= num.cs - 1 && c <= num.ce + 1) {
        return true;
      }
    }
  });
  if (adjacent.length === 2) {
    valid.push(adjacent[0].number * adjacent[1].number);
  }
});

console.log(valid);
console.log(sum(valid));
