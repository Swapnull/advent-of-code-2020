import fs from "fs";
import { multiply, sum } from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const regex = new RegExp(/(mul)\([0-9]{1,3}\,[0-9]{1,3}\)/g);

const list = input.match(regex);

const products = list.map((item) => {
  const numbers = item.match(/[0-9]{1,3}/g).map(Number);
  return multiply(numbers[0], numbers[1]);
});

console.log(products);
console.log(sum(products));
