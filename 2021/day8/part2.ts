import fs from "fs";
import { intersection } from "lodash";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const data = input
  .split("\n")
  .filter(Boolean)
  .map((entry) => entry.split(" | ").map((item) => item.split(" ")));

const findAnswer = (row) => {
  const [inputs, outputs] = row;
  const signals = inputs.concat(outputs);

  const one = signals.find(({ length }) => length === 2).split("");
  const four = signals.find(({ length }) => length === 4).split("");

  return outputs
    .map((output) => {
      let found: number;
      if (output.length === 2) found = 1;
      if (output.length === 3) found = 7;
      if (output.length === 4) found = 4;
      if (output.length === 7) found = 8;
      if (output.length === 5) {
        if (intersection(output.split(""), one).length === 2) {
          found = 3;
        } else {
          if (intersection(output.split(""), four).length === 2) {
            found = 2;
          } else {
            found = 5;
          }
        }
      }
      if (output.length === 6) {
        if (intersection(output.split(""), four).length === 4) {
          found = 9;
        } else {
          if (intersection(output.split(""), one).length === 2) {
            found = 0;
          } else found = 6;
        }
      }

      return found;
    })
    .join("");
};

const final = data.reduce((agg, row) => agg + Number(findAnswer(row)), 0);
console.log(final);
