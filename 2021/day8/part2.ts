import fs from "fs";
import { intersection } from "lodash";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const data = input
  .split("\n")
  .filter(Boolean)
  .map((entry) => entry.split(" | ").map((item) => item.split(" ")));

const segments = [
  { num: 0, count: 6 },
  { num: 1, count: 2 },
  { num: 2, count: 5 },
  { num: 3, count: 5 },
  { num: 4, count: 4 },
  { num: 5, count: 5 },
  { num: 6, count: 6 },
  { num: 7, count: 3 },
  { num: 8, count: 7 },
  { num: 9, count: 6 },
];

const findAnswer = (row) => {
  const [inputs, outputs] = row;
  const signals = inputs.concat(outputs);

  const one = signals.find(({ length }) => length === 2).split("");
  const four = signals.find(({ length }) => length === 4).split("");

  return outputs
    .map((output) => {
      const possibilities = segments.filter(
        (seg) => seg.count === output.length
      );
      if (possibilities.length === 1) return possibilities[0].num;
      else {
        if (output.length === 5) {
          if (intersection(output.split(""), one).length === 2) {
            return 3;
          } else {
            return intersection(output.split(""), four).length === 2 ? 2 : 5;
          }
        }
        if (output.length === 6) {
          if (intersection(output.split(""), four).length === 4) {
            return 9;
          } else {
            return intersection(output.split(""), one).length === 2 ? 0 : 6;
          }
        }
      }
    })
    .join("");
};

const final = data.reduce((agg, row) => agg + Number(findAnswer(row)), 0);
console.log(final);
