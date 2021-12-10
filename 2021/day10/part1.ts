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
const pairs: Array<Pair> = [];

const openings = ["{", "(", "[", "<"];
const closings = ["}", ")", "]", ">"];

const findCorruption = (line) => {
  const [first, ...rest] = line;
  if (!first) {
    console.log("Line incomplete");
    return;
  }
  if (openings.includes(first)) {
    pairs.push({ open: first, isClosed: false });
    return findCorruption(rest);
  } else {
    const lastOpenIndex = findLastIndex(pairs, ["isClosed", false]);
    const shouldClose = pairs[lastOpenIndex];
    const index = openings.findIndex((open) => open === shouldClose.open);
    const shouldBe = closings[index];
    // console.log(pairs, shouldClose.open, first, shouldBe);

    if (first === shouldBe) {
      pairs[lastOpenIndex] = {
        ...shouldClose,
        isClosed: true,
      };
      return findCorruption(rest);
    } else {
      console.log(
        `Corruption: Expected ${shouldBe}, but found ${first} instead`
      );
      return first;
    }
  }
};

const illegalChars = input
  .map((line) => findCorruption(line))
  .filter((res) => res);

console.log(illegalChars);
const total = illegalChars.reduce((total, char) => {
  if (char === ")") return total + 3;
  if (char === "]") return total + 57;
  if (char === "}") return total + 1197;
  if (char === ">") return total + 25137;
}, 0);

console.log(total);

//findCorruption(input[4]);
