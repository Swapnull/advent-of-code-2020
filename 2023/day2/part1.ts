import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const goalRed = 12;
const goalGreen = 13;
const goalBlue = 14;

const validGames = [];

for (const game of rows) {
  const [id, sets] = game.split(":");
  const setsSplit = sets.split(";");

  const ans = setsSplit.map((set) => {
    const cubes = set.split(",");
    const valid = cubes.filter((cube) => {
      if (cube.includes("red")) {
        return parseInt(cube) <= goalRed;
      } else if (cube.includes("green")) {
        return parseInt(cube) <= goalGreen;
      } else if (cube.includes("blue")) {
        return parseInt(cube) <= goalBlue;
      }
    });
    return valid.length === cubes.length;
  });
  const isValid = !ans.includes(false);
  if (isValid) {
    const [_, gameNum] = id.split(" ");
    validGames.push(parseInt(gameNum));
  }
}

console.log(validGames);
console.log(sum(validGames));
