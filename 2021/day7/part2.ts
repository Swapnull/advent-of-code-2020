import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const data = input.split(",").map(Number);

const min = Math.min(...data);
const max = Math.max(...data);

const positions = new Array(max).fill(0);

const getFuelCost = (index: number) => {
  let res = 0;
  for (let i = 1; i <= index; i++) {
    res += i;
  }
  return res;
};

const output = positions.map((pos, index) =>
  data.reduce((agg, crab) => agg + getFuelCost(Math.abs(index - crab)), 0)
);

console.log(Math.min(...output));
