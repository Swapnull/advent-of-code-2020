import fs from "fs";
import path from "path";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input
  .split("\n")
  .filter(Boolean)
  .map((row: string) => row.replace(":", "").split(" "));

const part1 = () => {
  let validCount = 0;

  rows.forEach((row) => {
    const [counts, letter, password] = row;
    const [min, max] = counts.split("-");
    const occurances =
      password.length - password?.split(letter).join("")?.length;
    if (occurances >= Number(min) && occurances <= Number(max)) {
      validCount++;
    }
  });
  return validCount;
};

console.log(part1());

const part2 = () => {
  let validCount = 0;

  rows.forEach((row) => {
    const [positions, letter, password] = row;
    const [pos1, pos2] = positions.split("-");

    const isPos1 = password[Number(pos1) - 1] === letter;
    const isPos2 = password[Number(pos2) - 1] === letter;

    if ((isPos1 && !isPos2) || (!isPos1 && isPos2)) {
      validCount++;
    }
  });
  return validCount;
};

console.log(part2());
