import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const results = [];

for (const game of rows) {
  const [id, sets] = game.split(":");
  const setsSplit = sets.split(";");
  const blue = [];
  const red = [];
  const green = [];

  setsSplit.map((set) => {
    const cubes = set.split(",");
    cubes.filter((cube) => {
      if (cube.includes("red")) {
        red.push(parseInt(cube));
      } else if (cube.includes("green")) {
        green.push(parseInt(cube));
      } else if (cube.includes("blue")) {
        blue.push(parseInt(cube));
      }
    });
  });

  results.push(max(blue) * max(red) * max(green));
}

console.log(results);
console.log(sum(results));
