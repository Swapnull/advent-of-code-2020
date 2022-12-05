import fs from "fs";
import { chunk } from "lodash";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .reduce(
    (agg, curr) => {
      console.log(curr);
      if (curr?.length === 0) return [...agg, []];
      agg[agg.length - 1] = [...agg[agg.length - 1], curr];
      return agg;
    },
    [[]]
  );

delete input[0][input[0].length - 1]; // Get rid of the x axis legend, we dont need it.

// First we are going to get the input of the stacks into an array of arrays, where each array is a stack ordered from bottom to top.
const formattedStacks = input[0]
  .map((row) => {
    return chunk(row.split(""), 4)
      .map((chunk) => chunk.join("").replace(" ", "").replace("[", "").replace("]", ""))
      .filter(String);
  })
  .filter((i) => i?.length);

const stacks = Array(formattedStacks[0].length).fill([]);

formattedStacks.forEach((stack) => {
  stack.forEach((s, index) => {
    if (s.trim().length !== 0) stacks[index] = [s, ...stacks[index]];
  });
});

// now lets run the actions
input[1].map((row) => {
  // format the actions into a simple tuple
  const [count, from, to] = row
    .replaceAll("move ", "")
    .replaceAll(" from ", " ")
    .replaceAll(" to ", " ")
    .split(" ");

  const toMove = stacks[from - 1].splice(-count);
  stacks[to - 1] = [...stacks[to - 1], ...toMove];
});

// get the top of each stack as the result
console.log(stacks.map((stack) => stack.pop()).join(""));
