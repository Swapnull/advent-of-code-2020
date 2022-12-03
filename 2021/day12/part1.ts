import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.join(__dirname, "testinput.txt"), "utf-8");
const input = file
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("-"));

const isCapital = (phrase: string) => /^[A-Z]/.test(phrase);

console.log(input);

interface Possibility {
  name: string;
  links: Array<string>;
}

const possibilities: Array<Possibility> = [];

const buildGraph = (start: string, end: string) => {
  const exists = possibilities.findIndex((pos) => pos.name === start);
  if (exists >= 0) {
    possibilities[exists].links.push(end);
  } else {
    possibilities.push({ name: start, links: [end] });
  }
};

input.map((row) => {
  const [start, end] = row;
  buildGraph(start, end);
  buildGraph(end, start);
});

console.log(possibilities);

const visited = [];

const getPath = (index) => {
  const curr = possibilities[index];
  console.log(curr, index);
  if (!(visited.includes(curr.name) && !isCapital(curr.name)))
    visited.push(curr.name);
  if (curr.name === "end") return;
  return curr.links.map((link) => {
    if (visited.includes(link) && !isCapital(link)) {
      return;
    } else {
      const i = possibilities.findIndex((pos) => pos.name === link);
      getPath(i);
    }
  });
};

const res = getPath(0);
console.log("res", res, visited);
