import fs from "fs";

const duplicates = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(",").map((pair) => pair.split("-").map((n) => parseInt(n))))
  .filter(
    ([[firstStart, firstEnd], [secondStart, secondEnd]]) =>
      (firstStart <= secondStart && secondEnd <= firstEnd) ||
      (secondStart <= firstStart && firstEnd <= secondEnd)
  );

console.log(duplicates.length);
