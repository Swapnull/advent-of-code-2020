import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const numbers = input
  .split("\n")
  .filter(Boolean)
  .map((n) => n.split("").map((b) => Number(b)));

type Input = typeof numbers;

const getPositionCount = (data: Input) =>
  data.reduce((agg, binary) => {
    binary.forEach((bit, index) => (agg[index] = (agg[index] || 0) + bit));
    return agg;
  }, []);

const getMostPopular = (data: Input) =>
  getPositionCount(data).map((pos) => (pos >= data.length / 2 ? 1 : 0));

const getLeastPopular = (data: Input) =>
  getPositionCount(data).map((pos) => (pos < data.length / 2 ? 1 : 0));

const getRating = (data: Input, leastPopular?: boolean) => {
  let rating = [...data];

  for (let i = 0; i < numbers[0].length; i++) {
    if (rating.length === 1) break;
    const popularity = leastPopular
      ? getLeastPopular(rating)
      : getMostPopular(rating);
    rating = rating.filter((binary) => binary[i] === popularity[i]);
  }
  return parseInt(rating[0].join(""), 2);
};

const oxygen = getRating(numbers);
const co2 = getRating(numbers, true);

console.log(oxygen, co2);
console.log(oxygen * co2);
