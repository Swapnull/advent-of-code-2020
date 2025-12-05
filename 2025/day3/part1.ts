import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const banks = input.split("\n");

const results = [];

banks.forEach((bank) => {
  const joltages = bank.split("").map(Number);

  console.log("joltagesSliced", joltages.slice(0, -1));
  const sorted = [...joltages.slice(0, -1)].sort((a, b) => b - a);

  const firstIndex = joltages.findIndex((j) => j === sorted[0]);
  const first = joltages[firstIndex];

  const secondJoltages = joltages.slice(firstIndex + 1);

  console.log("secondJoltages", secondJoltages);

  const secondSorted = [...secondJoltages].sort((a, b) => b - a);

  const second = secondSorted[0];

  console.log("first", first);
  console.log("second", second);

  results.push(`${first}${second}`);
});

console.log(results);

const total = results.map((result) => parseInt(result)).reduce((acc, curr) => acc + curr, 0);

console.log(total);
