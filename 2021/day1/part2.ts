import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const numbers = input
  .split("\n")
  .filter(Boolean)
  .map((n) => parseInt(n, 10));

let count = 0;
const sumOf = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0);

for (let i = 0; i < numbers.length; i++) {
  const sliceA = sumOf(numbers.slice(i, i + 3));
  const sliceB = sumOf(numbers.slice(i + 1, i + 4));
  if (sliceB > sliceA) count++;
}

console.log(count);
