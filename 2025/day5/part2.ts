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

console.log("ranges", ranges);
// console.log("ingredients", ingredients);

const rangePairs = ranges.map((range) => {
  const [rangeStartStr, rangeEndStr] = range.split("-");

  const rangeStart = parseInt(rangeStartStr);
  const rangeEnd = parseInt(rangeEndStr);

  console.log("rangeStart", rangeStart);
  console.log("rangeEnd", rangeEnd);
  return [rangeStart, rangeEnd];
});

// Sort ranges by start
rangePairs.sort((a, b) => a[0] - b[0]);

// Merge overlapping ranges
const processedRanges: number[][] = [];

for (const [rangeStart, rangeEnd] of rangePairs) {
  if (processedRanges.length === 0) {
    processedRanges.push([rangeStart, rangeEnd]);
    continue;
  }

  const last = processedRanges[processedRanges.length - 1];

  // If current range overlaps or is adjacent to the last one, merge them
  if (rangeStart <= last[1] + 1) {
    last[1] = Math.max(last[1], rangeEnd);
  } else {
    processedRanges.push([rangeStart, rangeEnd]);
  }
}

console.log("processedRanges", processedRanges);

let total = 0;

for (const processedRange of processedRanges) {
  const [processedStart, processedEnd] = processedRange;
  total += processedEnd - processedStart + 1;
}

console.log("total", total);

// 352681648086146 - correct

// 363486029289491 too high
// 554311160932310 too high
//555170450060068 too high
