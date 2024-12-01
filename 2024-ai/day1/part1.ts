import * as fs from "fs";
import * as path from "path";

function calculateTotalDistance(input: string): number {
  // Split input into lines and parse into two arrays
  const pairs = input
    .trim()
    .split("\n")
    .map((line) => {
      const [left, right] = line.trim().split(/\s+/).map(Number);
      return { left, right };
    });

  // Separate into left and right arrays
  const leftNumbers = pairs.map((p) => p.left);
  const rightNumbers = pairs.map((p) => p.right);

  // Sort both arrays
  leftNumbers.sort((a, b) => a - b);
  rightNumbers.sort((a, b) => a - b);

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < leftNumbers.length; i++) {
    const distance = Math.abs(leftNumbers[i] - rightNumbers[i]);
    totalDistance += distance;
  }

  return totalDistance;
}

// Read input from file
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
console.log(calculateTotalDistance(input));
