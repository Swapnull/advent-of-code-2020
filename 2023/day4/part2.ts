import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const cards = rows.map((row) => {
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
  return matches.length;
});

const res = new Array(cards.length).fill(1);

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];

  console.log(i + 1, card, res);

  for (let j = i + 1; j <= i + card; j++) {
    res[j] = res[j] + res[i];
  }
}

console.log(sum(res));

// if (!matches.length) return 0;
// else return Math.pow(2, matches.length - 1);
