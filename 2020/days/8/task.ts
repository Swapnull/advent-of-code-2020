import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const instructions = input.split("\n").map((row) => row.split(" "));

let pos = 0;
let acc = 0;
const visited = [];
let terminate = false;

while (!terminate) {
  const [action, value] = instructions[pos];
  visited.push(pos);
  console.log(action, value);
  if (action === "acc") {
    acc += parseInt(value);
    console.log("in acc", action, value, acc, visited.includes(pos + 1));
    if (visited.includes(pos + 1)) {
      terminate = true;
    } else {
      pos++;
    }
  }

  if (action === "jmp") {
    const newPos = pos + parseInt(value);
    console.log(
      "in jmp",
      action,
      value,
      pos + parseInt(value),
      visited.includes(pos + parseInt(value))
    );

    if (visited.includes(newPos)) {
      terminate = true;
    } else {
      pos = newPos;
    }
  }

  if (action === "nop") {
    pos++;
  }
}

console.log("final pos", pos);
console.log("total acc", acc);
