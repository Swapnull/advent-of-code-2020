import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => Number(row));

const numberIsValid = (
  input: number[],
  toFind: number,
  preambleLength: number
) => {
  for (let i = 0; i < preambleLength; i++) {
    if (input.find((row) => row + input[i] === toFind)) {
      return true;
    }
  }
  return false;
};

const loop = (fullInput: number[]) => {
  const preambleLength = 25;
  let index = 0 + preambleLength;
  let foundInvalid = false;

  while (!foundInvalid && index < fullInput.length) {
    const section = fullInput.slice(index - preambleLength, index);
    if (!numberIsValid(section, fullInput[index], preambleLength)) {
      foundInvalid = true;
      return fullInput[index];
    }
    index++;
  }
};

const numToFind = loop(rows) ?? 0;
console.log("Part 1:", numToFind);

const breakXmas = () => {
  let start = 0;
  let found = false;

  while (!found) {
    let result = [];
    let count = 0;

    for (let i = start; i < rows.length; i++) {
      count += rows[i];
      result.push(rows[i]);
      if (count === numToFind) {
        console.log("part 2:", Math.min(...result) + Math.max(...result));
        found = true;
        break;
      } else if (count > numToFind) {
        break;
      }
    }
    start++;
  }
};

breakXmas();
