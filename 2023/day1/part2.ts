import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const replace = (str: string) => {
  switch (str) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
  }
};

const re = /\d+|one|two|three|four|five|six|seven|eight|nine/g;

function matchOverlap(input, re) {
  var r = [],
    m;
  // Prevent infinite loops
  if (!re.global) re = new RegExp(re.source, (re + "").split("/").pop() + "g");
  while ((m = re.exec(input))) {
    re.lastIndex -= m[0].length - 1;
    r.push(m[0]);
  }
  return r;
}

console.log(rows);
const ans = rows.map((row) => {
  const numbers = matchOverlap(row, /\d+|one|two|three|four|five|six|seven|eight|nine/g);

  let first = numbers[0];
  let last = numbers[numbers.length - 1];

  console.log(first, last);

  if (isNaN(first)) {
    first = replace(first);
  } else if (first.length > 1) first = first.split("")[0];

  if (isNaN(last)) {
    last = replace(last);
  } else if (last.length > 1) last = last.split("")[last.length - 1];

  console.log(first, last);

  return Number(`${first}${last}`);
});

console.log(ans);
console.log(ans.reduce((agg, num) => agg + num, 0));
