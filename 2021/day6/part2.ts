import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const initialState = input.split(",").map(Number);

let fishies = [...initialState];

let fishMap: Array<number> = new Array(9).fill(0);

fishies.forEach((fish) => {
  fishMap[fish] += 1;
});

for (let i = 0; i < 256; i++) {
  let newFishMap = new Array(9).fill(0);

  let temp = 0;
  for (let j = 0; j <= 8; j++) {
    if (j === 0) {
      newFishMap[8] = fishMap[0];
      temp = fishMap[0];
    } else {
      newFishMap[j - 1] = fishMap[j];
    }
  }
  newFishMap[6] += temp;
  fishMap = [...newFishMap];
}

const res = fishMap.reduce((agg, fish) => {
  return agg + fish;
}, 0);

console.log(res);
