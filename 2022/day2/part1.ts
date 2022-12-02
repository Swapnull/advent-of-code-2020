import fs from "fs";
import { max, sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => row.split(" "));

const moves = [
  { name: "rock", letter: "X", elfLetter: "A", score: 1, beats: ["C"] },
  { name: "paper", letter: "Y", elfLetter: "B", score: 2, beats: ["A"] },
  { name: "scissors", letter: "Z", elfLetter: "C", score: 3, beats: ["B"] },
];

const win = 6;
const draw = 3;
const lose = 0;

const results = rows.map(([elfMove, myMove]) => {
  const moveObj = moves.find((move) => move.letter === myMove);
  const isWin = moveObj.beats.includes(elfMove);
  const isDraw = elfMove === moveObj.elfLetter;
  const isLose = !isWin && !isDraw;

  if (isWin) return win + moveObj.score;
  if (isDraw) return draw + moveObj.score;
  if (isLose) return lose + moveObj.score;
});

console.log(sum(results));
