import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const instructions = input.split("\n").map((row) => row.split(" "));

let switched: number[] = [];

const doOneRun = () => {
  let pos = 0;
  let acc = 0;
  const visited = [];
  let hasSwitched = false;
  let terminate = false;

  while (!terminate) {
    if (instructions.length === pos) {
      terminate = true;
      break;
    }
    const [action, value] = instructions[pos];
    visited.push(pos);
    if (action === "acc") {
      acc += parseInt(value);
      if (visited.includes(pos + 1)) {
        terminate = true;
      } else {
        pos++;
      }
    }

    if (action === "jmp") {
      const newPos = pos + parseInt(value);

      if (!hasSwitched && !switched.includes(pos)) {
        switched.push(pos);
        pos++;
        hasSwitched = true;
      } else {
        if (visited.includes(newPos)) {
          terminate = true;
        } else {
          pos = newPos;
        }
      }
    }

    if (action === "nop") {
      if (!hasSwitched && !switched.includes(pos)) {
        switched.push(pos);
        const newPos = pos + parseInt(value);
        if (visited.includes(newPos)) {
          terminate = true;
        } else {
          pos = newPos;
        }
        hasSwitched = true;
      } else {
        pos++;
      }
    }
  }

  const visitedAll = visited.length === instructions.length;
  const outOfBounds = pos === instructions.length;
  if (visitedAll || outOfBounds) {
    console.log("final value", acc);
    return true;
  } else {
    return false;
  }
};

let found = false;
while (!found) {
  found = doOneRun();
}
