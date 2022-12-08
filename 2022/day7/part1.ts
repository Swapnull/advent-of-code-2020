import fs from "fs";
import { isNaN, size, sum, uniq } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("\n");

console.log(input.length);

interface Tree {
  dir: string;
  files: Array<{ name: string; size: number }>;
  tree: Tree;
}

const directories = [];
const sizes = {};

const getLineInfo = (line) => {
  if (line[0] === "$") {
    // is command
    if (line.includes(" cd ")) {
      if (line.includes("cd ..")) {
        directories.pop();
      } else {
        const cdInto = line.replace("$ cd ", "");
        directories.push(cdInto);
      }
    }
  } else if (!isNaN(parseInt(line))) {
    const num = Number(line.split(" ")[0]);

    console.log("file", directories, Number(line));
    console.log("directories", directories);
    directories.map((dir) => {
      console.log("dir", dir, sizes[dir]);
      sizes[dir] = sizes[dir] ? sizes[dir] + num : num;
    });
  }
};

input.map((line) => {
  const dir = getLineInfo(line);
});

let total = 0;
Object.entries(sizes).map(([key, value]) => {
  if (value <= 100000) {
    total = total + (value as number);
  }
});

console.log(Object.fromEntries(Object.entries(sizes).filter(([k, s]) => (s as number) <= 100000)));

console.log(total);

const summed = sum(Object.values(sizes).filter((s) => s < 100000));
console.log(summed);

// tried
// 955251
