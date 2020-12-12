import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => Number(row));

const testData = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

const findDiff = (list, start, diff) => list.find((l) => l === start + diff);

const getAdapters = (adapters, jolts) => {
  let remainingAdapers = [...adapters];
  let resultAdapters = [];
  let currentJolts = jolts;
  let error = false;

  if (remainingAdapers.length && !error) {
    const diffOne = findDiff(remainingAdapers, currentJolts, 1);
    const diffTwo = findDiff(remainingAdapers, currentJolts, 2);
    const diffThree = findDiff(remainingAdapers, currentJolts, 3);

    console.log(currentJolts, diffOne, diffTwo, diffThree);
    if (diffOne) {
      resultAdapters.push({ adapter: diffOne, diff: 1 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffOne), 1);
      console.log("branch1");
      resultAdapters = [
        ...resultAdapters,
        getAdapters(remainingAdapers, currentJolts + 1),
      ];
    }
    if (diffTwo) {
      resultAdapters.push({ adapter: diffTwo, diff: 2 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffTwo), 1);
      console.log("branch2");

      resultAdapters = [
        ...resultAdapters,
        getAdapters(remainingAdapers, currentJolts + 2),
      ];
    }
    if (diffThree) {
      resultAdapters.push({ adapter: diffThree, diff: 3 });
      remainingAdapers.splice(remainingAdapers.indexOf(diffThree), 1);
      console.log("branch3");

      resultAdapters = [
        ...resultAdapters,
        getAdapters(remainingAdapers, currentJolts + 3),
      ];
    }

    if (!diffOne && !diffTwo && !diffThree) {
      console.log("no path found");
      error = true;
    }
  }
  return resultAdapters;
};

const res = getAdapters(testData, 0);
console.log(JSON.stringify(res));

console.log(res[0]);

console.log("----- build ----");

/* 
I believe that res contains the paths, the next step is to build those paths into all the options. The build function below doesn't quite do this yet. 
*/

const build = (data) => {
  return data.map((d) => {
    if (Array.isArray(d)) {
      return build(d);
    } else {
      return d;
    }
  });
};

console.log("res", build(res));

/*
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

console.log("total", oneAndThrees.diffOfOne * oneAndThrees.diffOfThree);*/
