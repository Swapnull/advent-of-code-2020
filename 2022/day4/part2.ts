import fs from "fs";

const overlap = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(",").map((pair) => pair.split("-").map((n) => parseInt(n))))
  .filter(
    ([[firstStart, firstEnd], [secondStart, secondEnd]]) =>
      firstStart <= secondEnd && secondStart <= firstEnd
  );

console.log(overlap.length);
