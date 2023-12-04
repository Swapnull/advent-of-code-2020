import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const res = rows.map((row) => {
  const [id, card] = row.split(":");
  const [winningStr, inputStr] = card.split("|");

  const winning = winningStr
    .trim()
    .split(" ")
    .filter((num) => !isNaN(parseInt(num)));
  const input = inputStr
    .trim()
    .split(" ")
    .filter((num) => !isNaN(parseInt(num)));

  const matches = input.filter((num) => winning.includes(num));

  if (!matches.length) return 0;
  else return Math.pow(2, matches.length - 1);
});

console.log(sum(res));
