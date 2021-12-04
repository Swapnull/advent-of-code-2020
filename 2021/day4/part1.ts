import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n").filter(Boolean);

const [call, ...boardSet] = rows;

const callOrder = call.split(",");

const boards = [];
for (let i = 0; i < boardSet.length; i += 5) {
  boards.push(
    boardSet.slice(i, i + 5).map((a) => a.split(" ").filter((b) => b.length))
  );
}

const calledNumbers = [];
const boardCompletion = [];
boards.forEach(() =>
  boardCompletion.push({ rows: [0, 0, 0, 0, 0], cols: [0, 0, 0, 0, 0] })
);
let bingo = null;

const checkRows = (board, toFind, boardIndex) => {
  for (let i = 0; i < board.length; i++) {
    if (!bingo) {
      const row = board[i];
      const foundIndex = row.findIndex((cell) => cell === toFind);
      if (foundIndex >= 0) {
        const newFoundRowCount = boardCompletion[boardIndex].rows[i] + 1;
        const newFoundColCount =
          boardCompletion[boardIndex].cols[foundIndex] + 1;

        if (newFoundRowCount === 5 || newFoundColCount === 5) {
          console.log("BINGO", toFind, boardIndex);
          bingo = { boardIndex, lastNumber: toFind };
          return toFind;
        } else {
          boardCompletion[boardIndex].rows[i] = newFoundRowCount;
          boardCompletion[boardIndex].cols[foundIndex] = newFoundColCount;
        }
      }
    }
  }
};

console.log(boards[0]);

callOrder.map((num) => {
  if (!bingo) {
    calledNumbers.push(num);
    boards.map((board, boardIndex) => {
      checkRows(board, num, boardIndex);
    });
  }
});

console.log(calledNumbers);
console.log(bingo);

const uncalled = boards[bingo.boardIndex].reduce((agg, row) => {
  const uncalledRowVal = row.reduce(
    (agg, cell) => (calledNumbers.includes(cell) ? agg : agg + Number(cell)),
    0
  );
  return agg + uncalledRowVal;
}, 0);

console.log(uncalled);
console.log(uncalled * Number(bingo.lastNumber));
