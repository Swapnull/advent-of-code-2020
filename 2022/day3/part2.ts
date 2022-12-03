import fs from "fs";
import { chunk, intersection, sum } from "lodash";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const input = fs.readFileSync("input.txt", "utf-8");
const sacks = input.split("\n");
const groups = chunk(sacks, 3);

const res = groups.map((group) => {
  const duplicates = intersection(...group.map((elf) => elf.split("")));
  const scores = duplicates.map((duplicate) => alphabet.indexOf(duplicate) + 1);
  return sum(scores);
});

console.log(sum(res));
