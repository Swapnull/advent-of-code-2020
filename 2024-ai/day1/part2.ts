function calculateSimilarityScore(input: string): number {
  // Split input into lines and parse into two arrays
  const lines = input.trim().split("\n");
  const [leftNumbers, rightNumbers] = lines.reduce(
    (acc, line) => {
      const [left, right] = line.trim().split(/\s+/).map(Number);
      acc[0].push(left);
      acc[1].push(right);
      return acc;
    },
    [[] as number[], [] as number[]]
  );

  // Calculate score by counting occurrences and multiplying
  return leftNumbers.reduce((total, leftNum) => {
    const occurrences = rightNumbers.filter((rightNum) => rightNum === leftNum).length;
    return total + leftNum * occurrences;
  }, 0);
}

// Read input from file using Node.js fs module with correct path
import { readFileSync } from "fs";
const input = readFileSync("2024-ai/day1/input.txt", "utf-8");
console.log(calculateSimilarityScore(input));
