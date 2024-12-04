import fs from "fs";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const checkIfValid = (data: Array<number>) => {
  const isIncreasing = data[0] < data[data.length - 1];

  for (let i = 0; i < data.length - 1; i++) {
    const first = data[i];
    const second = data[i + 1];
    const diff = Math.abs(second - first);
    const validLevelJump = diff >= 1 && diff <= 3;

    const validIncrease = first < second && isIncreasing && validLevelJump;
    const validDecrease = second < first && !isIncreasing && validLevelJump;

    if (validLevelJump && (validIncrease || validDecrease)) {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

const results = [];
rows.forEach((row) => {
  const levels = row.split(" ").map(Number);

  const isValid = checkIfValid(levels);

  if (isValid) {
    // valid without needing to skip;
    results.push(true);
  } else {
    let hasValidOption = false;

    // check the array with every item removed
    for (let i = 0; i < levels.length; i++) {
      const toTry = [...levels];
      toTry.splice(i, 1);
      if (checkIfValid(toTry)) {
        hasValidOption = true;
        break;
      }
    }

    results.push(hasValidOption);
  }
});

console.log(results.filter((r) => r).length);

//540
