import fs from "fs";
import { uniq } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("");

const startPoint = 14;

for (let i = 0; i < input.length; i++) {
  if (uniq(input.slice(i, i + startPoint)).length === startPoint) {
    console.log(input.slice(i, i + startPoint));
    console.log("found", i + startPoint);
    break;
  }
}
