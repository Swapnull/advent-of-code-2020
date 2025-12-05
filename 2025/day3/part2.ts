import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const banks = input.split("\n");

const results = [];

const getNextJolt = (joltages: number[], leftToFind: number) => {
  // console.log("joltages", joltages, " leftToFind", leftToFind);
  // console.log("joltages.slice(0, -leftToFind)", joltages.slice(0, -leftToFind + 1));
  if (leftToFind === 0) {
    return "";
  }

  const whitelist = leftToFind > 1 ? [...joltages.slice(0, -leftToFind + 1)] : [...joltages];

  const sorted = whitelist.sort((a, b) => b - a);

  const index = joltages.findIndex((j) => j === sorted[0]);
  const jolt = joltages[index];

  const res = `${jolt}${getNextJolt(joltages.slice(index + 1), leftToFind - 1)}`;
  // console.log("res", res);
  return res;
};

banks.forEach((bank) => {
  const joltages = bank.split("").map(Number);

  const result = getNextJolt(joltages, 12);
  results.push(result);
});

// console.log(results);

const total = results.map((result) => parseInt(result)).reduce((acc, curr) => acc + curr, 0);

console.log(total);
