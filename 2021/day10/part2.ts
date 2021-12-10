import fs from "fs";
import { findLastIndex } from "lodash";
import path from "path";

const file = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const input = file
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split(""));

interface Pair {
  open: string;
  isClosed: boolean;
}
let pairs: Array<Pair> = [];

const incomplete: Array<Array<Pair>> = [];

const openings = ["{", "(", "[", "<"];
const closings = ["}", ")", "]", ">"];

const findCorruption = (line: Array<string>, index: number) => {
  const [first, ...rest] = line;
  if (!first) {
    console.log("Line incomplete", index, first);
    incomplete.push(pairs);
    return;
  }
  if (openings.includes(first)) {
    pairs.push({ open: first, isClosed: false });
    return findCorruption(rest, index);
  } else {
    const lastOpenIndex = findLastIndex(pairs, ["isClosed", false]);
    const shouldClose = pairs[lastOpenIndex];
    const found = openings.findIndex((open) => open === shouldClose.open);
    const expected = closings[found];
    if (first === expected) {
      pairs[lastOpenIndex] = {
        ...shouldClose,
        isClosed: true,
      };
      return findCorruption(rest, index);
    } else {
      console.log(
        `Corruption: Expected ${expected}, but found ${first} instead`
      );
      return first;
    }
  }
};

input.map((line, index) => {
  pairs = [];
  findCorruption(line, index);
});

const handleIncomplete = (_pairs: Array<Pair>) => {
  const added = [];

  const complete = (incompletePairs: Array<Pair>) => {
    const lastOpenIndex = findLastIndex(incompletePairs, ["isClosed", false]);
    if (lastOpenIndex < 0) return;
    const toClose = incompletePairs[lastOpenIndex];
    if (toClose.open === "{") added.push("}");
    if (toClose.open === "[") added.push("]");
    if (toClose.open === "(") added.push(")");
    if (toClose.open === "<") added.push(">");
    incompletePairs[lastOpenIndex].isClosed = true;

    complete(incompletePairs);
  };

  complete(_pairs);
  return added;
};

const final = incomplete
  .map((item) =>
    handleIncomplete(item).reduce((agg, item) => {
      let value = 1;
      if (item === ")") value = 1;
      if (item === "]") value = 2;
      if (item === "}") value = 3;
      if (item === ">") value = 4;
      return agg * 5 + value;
    }, 0)
  )
  .sort((a, b) => a - b)
  .splice(incomplete.length / 2, 1);

console.log(final);
