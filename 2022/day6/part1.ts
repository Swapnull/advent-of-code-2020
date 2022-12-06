import fs from "fs";
import { uniq } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("");

const startPoint = 4;

for (let i = 0; i < input.length; i++) {
  if (uniq(input.slice(i, i + startPoint)).length === startPoint) {
    console.log("found", i + startPoint);
    break;
  }
}

/* original idea, worked but more effort*/

// let curr = []
// for (let i = 0; i < input.length; i++) {
//   const char = input[i];
//   if (curr.length < startPoint) {
//     curr = [...curr, char];
//   } else if (uniq(curr).length === startPoint) {
//     console.log("found", i);
//     break;
//   } else curr = [...curr.slice(1), char];
// }
