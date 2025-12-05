import fs from "fs";
import { chunk } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const getIsInvalid = (str: string) => {
  const maxToCheck = Math.floor(str.length / 2);
  // console.log("maxToCheck", maxToCheck);
  for (let i = 0; i <= maxToCheck; i++) {
    // console.log(" === next i ===");
    // console.log("i", i);
    const chunkToCheck = str.slice(0, i + 1);

    // console.log("chunkToCheck", chunkToCheck);

    const allChunks = chunk(str.split(""), i + 1);

    // console.log("allChunks", allChunks);

    if (allChunks.length > 1) {
      const allChunksEqual = allChunks.every((c) => {
        // console.log("checking", chunkToCheck, " : ", c.join(""));
        return chunkToCheck === c.join("");
      });
      // console.log("allChunksEqual", allChunksEqual);
      if (allChunksEqual) {
        return true;
      }
    }
  }
  return false;
};

console.log("11", getIsInvalid("11"));
console.log("12", getIsInvalid("12"));

// console.log("999", getIsInvalid("999"));
// console.log("1188511885", getIsInvalid("1188511885"));

let total = 0;

input.split(",").forEach((range) => {
  const [start, end] = range.split("-");

  const startNum = parseInt(start);
  const endNum = parseInt(end);

  for (let i = startNum; i <= endNum; i++) {
    const isInvalid = getIsInvalid(i.toString());
    if (isInvalid) {
      total += i;
      console.log("invalid", i);
    }
  }
});

console.log(total);
