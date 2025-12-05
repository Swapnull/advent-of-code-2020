import fs from "fs";
import { chunk, uniq } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const rows = input.split("\n");

let seperatorFound = false;
let index = 0;
while (seperatorFound !== true) {
  const row = rows[index];
  if (row.length === 0) {
    seperatorFound = true;
  }
  index++;
}

console.log("index", index);

const ranges = [...rows].slice(0, index - 1);
const ingredients = [...rows].slice(index);

console.log("ranges", ranges);
console.log("ingredients", ingredients);

const rangePairs = ranges.map((range) => {
  const [rangeStartStr, rangeEndStr] = range.split("-");

  const rangeStart = parseInt(rangeStartStr);
  const rangeEnd = parseInt(rangeEndStr);

  console.log("rangeStart", rangeStart);
  console.log("rangeEnd", rangeEnd);
  return [rangeStart, rangeEnd];
});

console.log("rangePairs", rangePairs);

let results = [];

ingredients.forEach((ingredient) => {
  const ingredientValue = parseInt(ingredient);
  for (const rangePair of rangePairs) {
    const [rangeStart, rangeEnd] = rangePair;
    if (ingredientValue >= rangeStart && ingredientValue <= rangeEnd) {
      console.log("ingredient", ingredient, "is in range", rangePair);
      results.push(ingredient);
      break;
    }
  }
});

console.log("count", uniq(results).length);

//827 too low
