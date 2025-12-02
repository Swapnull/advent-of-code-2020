import fs from "fs";
import "lodash.permutations";
import _ from "lodash";

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const rows = input.split("\n");
const puzzle = rows.map((row) => {
  const [key, value] = row.split(": ");
  return { result: Number(key), values: value.split(" ").map(Number) };
});

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

let total = 0;

puzzle.slice(0, 1).forEach(({ result, values }) => {
  // get all permutations of add and multiple between the values

  const len = values.length;

  const initial = new Array(len - 1).fill("+");

  let mostRecent = [...initial];

  for (let i = 0; i < len - 1; i++) {
    let newOption = [...mostRecent];
    newOption[i] = "*";
    mostRecent = newOption;

    const perms = permutator(newOption);
    let found = false;

    for (let i = 0; i < perms.length; i++) {
      // console.log("-----");

      const ans = values.reduce((agg, value, index) => {
        if (index === 0) return agg + value;
        if (perms[i][index - 1] === "+") {
          // console.log("+", agg, value, agg + value);
          return agg + value;
        } else {
          // console.log("*", agg, value, agg * value);
          return agg * value;
        }
      }, 0);

      // console.log(allPerms[i], ans);

      if (result === ans) {
        total += result;
        found = true;

        break;
      }
    }
    if (found) {
      break;
    }
  }

  //   console.log("----");

  //   console.log(allPerms);
});

console.log(total);
