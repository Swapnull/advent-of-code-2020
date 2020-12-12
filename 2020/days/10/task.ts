import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => Number(row));

const testData = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

const findDiff = (list: number[], start: number, diff: number) =>
  list.find((l) => l === start + diff);

const getAdapters = (adapters: number[]) => {
  let remainingAdapers = [...adapters];
  let resultAdapters = [];
  let currentJolts = 0;
  let error = false;

  while (remainingAdapers.length && !error) {
    const diffOne = findDiff(remainingAdapers, currentJolts, 1);
    const diffTwo = findDiff(remainingAdapers, currentJolts, 2);
    const diffThree = findDiff(remainingAdapers, currentJolts, 3);

    console.log(currentJolts, diffOne, diffTwo, diffThree);
    if (diffOne) {
      resultAdapters.push({ adapter: diffOne, diff: 1 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffOne), 1);
      currentJolts += 1;
    } else if (diffTwo) {
      resultAdapters.push({ adapter: diffTwo, diff: 2 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffTwo), 1);
      currentJolts += 2;
    } else if (diffThree) {
      resultAdapters.push({ adapter: diffThree, diff: 3 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffThree), 1);
      currentJolts += 3;
    }

    if (!diffOne && !diffTwo && !diffThree) {
      console.log("no path found");
      error = true;
    }
  }

  return { currentJolts, resultAdapters };
};

const res = getAdapters(rows);

console.log(res.currentJolts + 3);
console.log(res.resultAdapters);
const oneAndThrees = res.resultAdapters.reduce(
  (agg, adapter) => {
    if (adapter.diff === 1) {
      return { ...agg, diffOfOne: (agg.diffOfOne += 1) };
    }
    if (adapter.diff === 3) {
      return { ...agg, diffOfThree: (agg.diffOfThree += 1) };
    }
    return agg;
  },
  { diffOfOne: 0, diffOfThree: 1 }
);

console.log(oneAndThrees);

console.log("total", oneAndThrees.diffOfOne * oneAndThrees.diffOfThree);
