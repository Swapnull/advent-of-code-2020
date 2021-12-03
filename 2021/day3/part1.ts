import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const numbers = input
  .split("\n")
  .filter(Boolean)
  .map((n) => n.split("").map((b) => Number(b)));

const positions: Array<number> = [];

numbers.map((binary) => {
  binary.map((bit, index) => {
    positions[index] = (positions[index] || 0) + bit;
  });
});

const finalG = positions.map((pos) => (pos > numbers.length / 2 ? 1 : 0));
const finalE = positions.map((pos) => (pos < numbers.length / 2 ? 1 : 0));

console.log(finalG, parseInt(finalG.join(""), 2));
console.log(finalE, parseInt(finalE.join(""), 2));

console.log(parseInt(finalG.join(""), 2) * parseInt(finalE.join(""), 2));
