import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const data = input
  .split("\n")
  .filter(Boolean)
  .map((entry) => entry.split(" | "));

console.log(data[0][1]);

const segments = [
  { num: 0, count: 6 },
  { num: 1, count: 2 },
  { num: 2, count: 5 },
  { num: 3, count: 5 },
  { num: 4, count: 4 },
  { num: 5, count: 5 },
  { num: 6, count: 6 },
  { num: 7, count: 3 },
  { num: 8, count: 7 },
  { num: 9, count: 6 },
];

let found = 0;

data.map((row) => {
  const outputs = row[1].split(" ");
  outputs.map((output) => {
    const len = output.length;
    const seg = segments.filter((seg) => seg.count === len);
    if (seg.length === 1) {
      found += 1;
    }
  });
});

console.log(found);
