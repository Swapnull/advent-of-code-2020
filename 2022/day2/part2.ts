import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => row.split(" "));

const moves = [
  { name: "rock", elfLetter: "A", score: 1, beats: ["C"] },
  { name: "paper", elfLetter: "B", score: 2, beats: ["A"] },
  { name: "scissors", elfLetter: "C", score: 3, beats: ["B"] },
];

const win = 6;
const draw = 3;
const lose = 0;

const shouldWin = "Z";
const shouldDraw = "Y";
const shouldLose = "X";

const results = rows.map(([elfMove, outcome]) => {
  const moveObj = moves.find((move) => move.elfLetter === elfMove);

  console.log(elfMove, outcome, moveObj);

  if (outcome === shouldWin) {
    const myMove = moves.find((move) => move.beats.includes(elfMove));
    return win + myMove.score;
  } else if (outcome === shouldDraw) {
    const myMove = moves.find((move) => move.elfLetter === elfMove);
    return draw + myMove.score;
  } else if (outcome === shouldLose) {
    const myMove = moves.find(
      (move) => !move.beats.includes(elfMove) && move.elfLetter !== elfMove
    );
    return lose + myMove.score;
  }
});

console.log(sum(results));
