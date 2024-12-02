import fs from "fs";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const results = [];
rows.forEach((row) => {
  const levels = row.split(" ").map(Number);
  const [first, second] = levels;
  const isIncreasing = second - first > 0;

  let isSafe = true;

  for (let i = 0; i < levels.length - 1; i++) {
    const first = levels[i];
    const second = levels[i + 1];
    const diff = Math.abs(second - first);
    const validLevelJump = diff >= 1 && diff <= 3;

    if (!validLevelJump) {
      isSafe = false;
      break;
    }

    const validIncrease = first < second && isIncreasing && validLevelJump;
    const validDecrease = second < first && !isIncreasing && validLevelJump;

    if (validIncrease || validDecrease) {
      continue;
    } else {
      isSafe = false;
      break;
    }
  }

  results.push(isSafe);
});

console.log(results);

console.log(results.filter((r) => r).length);
