import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const getIsInvalid = (str: string) => {
  if (str.length % 2 !== 0) {
    return false;
  }

  const chunks = chunk(str.split(""), str.length / 2);
  return chunks[0].join("") === chunks[1].join("");
};

let total = 0;

input.split(",").forEach((range) => {
  const [start, end] = range.split("-");

  const startNum = parseInt(start);
  const endNum = parseInt(end);

  for (let i = startNum; i <= endNum; i++) {
    const isInvalid = getIsInvalid(i.toString());
    if (isInvalid) total += i;
  }
});

console.log(total);
