import fs from "fs";
import { intersection, sum } from "lodash";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const input = fs.readFileSync("input.txt", "utf-8");
const sacks = input.split("\n");

const res = sacks.map((sack) => {
  const firstPocket = sack.slice(0, sack.length / 2).split("");
  const secondPocket = sack.slice(sack.length / 2).split("");
  const duplicates = intersection(firstPocket, secondPocket);
  const scores = duplicates.map((duplicate) => alphabet.indexOf(duplicate) + 1);
  return sum(scores);
});

console.log(sum(res));
