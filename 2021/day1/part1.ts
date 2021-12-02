import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const numbers = input
  .split("\n")
  .filter(Boolean)
  .map((n) => parseInt(n, 10));

let prev = numbers[0];
let curr = numbers[1];
let count = 0;

for (let i = 1; i <= numbers.length; i++) {
  if (curr > prev) count++;
  prev = curr;
  curr = numbers[i + 1];
}

console.log(count);
