/* This works totally fine for the 80 day version, but did not scale to the 256 of question 2. part1-a2 and part1-a3 are 2nd and 3rd attempts */
import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "testinput.txt"), "utf-8");
const initialState = input.split(",").map(Number);
console.log(initialState);

let fish = [...initialState];

for (let i = 0; i < 80; i++) {
  const newFish = fish
    .map((f) => {
      if (f > 0) return f - 1;
      if (f === 0) return [6, 8];
      return f;
    })
    .flat();

  fish = newFish;
}

console.log(fish.length);
