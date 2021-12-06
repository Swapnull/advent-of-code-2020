/* This version runs out of memory even quicker than the first attempt */
import fs from "fs";
import { flattenDeep } from "lodash";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "testinput.txt"), "utf-8");
const initialState = input.split(",").map(Number);
console.log(initialState);

let fishies = [...initialState];

const iterateFish = (fish: number, currentDay: number) => {
  if (currentDay === 256) return fish;
  if (fish > 0) {
    return iterateFish(fish - 1, currentDay + 1);
  } else if (fish === 0) {
    return [iterateFish(6, currentDay + 1), iterateFish(8, currentDay + 1)];
  }
  return fish;
};

const res = fishies.map((fish) => {
  return flattenDeep(iterateFish(fish, 0)).length;
});

console.log(res.reduce((agg, num) => agg + num, 0));
