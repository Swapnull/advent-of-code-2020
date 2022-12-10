import fs from "fs";
import { sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("\n");
// .map((row) => row.split(" "));

let x = 1;
let cycles = [1];
input.map((cmd) => {
  if (cmd === "noop") {
    cycles.push(x);
  } else if (cmd.includes("addx")) {
    cycles.push(x);

    x += parseInt(cmd.split(" ")[1]);
    cycles.push(x);
  }
});

const toCheck = [20, 60, 100, 140, 180, 220];

const res = toCheck.map((checking) => cycles[checking - 1] * checking);

console.log(res, sum(res));
