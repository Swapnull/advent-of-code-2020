import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");

const separator = rows.findIndex((row) => row === "");

const rules = rows.slice(0, separator).map((row) => row.split("|").map(Number));
const updates = rows.slice(separator + 1).map((row) => row.split(",").map(Number));

console.log(rules, updates);

const ruleList = rules.reduce((agg, rule) => {
  if (agg[rule[0]]) {
    agg[rule[0]].push(rule[1]);
  } else {
    agg[rule[0]] = [rule[1]];
  }
  return agg;
}, {});

const validUpdates = updates.map((update) => {
  let wrongOrder = false;
  for (let i = 0; i < update.length; i++) {
    const curr = update[i];

    for (let j = i + 1; j < update.length; j++) {
      const toCheck = update[j];

      const rules = ruleList[toCheck];

      if (rules && rules.includes(curr)) {
        // console.log("wrong order", curr, toCheck, rules);
        wrongOrder = true;
        break;
      }
    }
  }

  if (!wrongOrder) console.log("correct", update, Math.ceil(update.length / 2) - 1);

  if (wrongOrder) return 0;
  else return update[Math.ceil(update.length / 2) - 1];
});

console.log(validUpdates);
console.log(sum(validUpdates));
