import fs from "fs";
import { multiply, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const regex = new RegExp(/(mul)\([0-9]{1,3}\,[0-9]{1,3}\)/g);

const list = Array.from(input.matchAll(regex));
console.log(list);

const doRegex = /(do\(\))/g;
const dontRegex = /(don't\(\))/g;

const doList = Array.from(input.matchAll(doRegex)).map((match) => match.index);
const dontList = Array.from(input.matchAll(dontRegex)).map((match) => match.index);

const getClosestPrev = (arr: Array<number>, toFind: number, starting: number) => {
  if (starting > toFind) return -1;
  const sortedArr = arr.sort((a, b) => a - b);
  return sortedArr.reduce((prev, curr) => {
    if (curr > prev && curr < toFind) {
      return curr;
    }

    return prev;
  }, sortedArr[0]);
};

const products = list
  .map((listItem) => {
    const mulInd = listItem.index;

    const closestDo = getClosestPrev([0, ...doList], mulInd, 0);
    const closestDont = getClosestPrev(dontList, mulInd, Math.min(...dontList));

    return closestDo > closestDont ? listItem[0] : false;
  })
  .filter(Boolean)
  .map((item: string) => {
    const numbers = item.match(/[0-9]{1,3}/g).map(Number);
    return multiply(numbers[0], numbers[1]);
  });

console.log(products);
console.log(sum(products));

//107862689
