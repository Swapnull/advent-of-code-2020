import fs from "fs";
import { uniq } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("");

let curr = [];
const startPoint = 14;

for (let i = 0; i < input.length; i++) {
  const char = input[i];
  if (curr.length < startPoint) {
    curr = [...curr, char];
  } else if (uniq(curr).length === startPoint) {
    console.log("found", i);
    break;
  } else curr = [...curr.slice(1), char];
}
