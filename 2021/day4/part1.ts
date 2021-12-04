import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n").filter(Boolean);

type Board = Array<Array<string>>;
type BoardCompletion = Array<{ rows: Array<number>; cols: Array<number> }>;
type Bingo = { boardIndex: number; lastNumber: string };

const [call, ...boardSet] = rows;

const callOrder = call.split(",");

const boards: Array<Board> = [];
for (let i = 0; i < boardSet.length; i += 5) {
  boards.push(
    boardSet.slice(i, i + 5).map((a) => a.split(" ").filter((b) => b.length))
  );
}

const calledNumbers: Array<string> = [];
const boardCompletion: BoardCompletion = [];
boards.forEach(() =>
  boardCompletion.push({ rows: [0, 0, 0, 0, 0], cols: [0, 0, 0, 0, 0] })
);
let bingo: Bingo = { boardIndex: -1, lastNumber: "" };

const checkRows = (board: Board, toFind: string, boardIndex: number) => {
  for (let i = 0; i < board.length; i++) {
    if (bingo.boardIndex < 0) {
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

callOrder.map((num) => {
  if (bingo.boardIndex < 0) {
    calledNumbers.push(num);
    boards.map((board, boardIndex) => {
      checkRows(board, num, boardIndex);
    });
  }
});

if (bingo.boardIndex >= 0) {
  const uncalled = boards[bingo.boardIndex]?.reduce(
    (agg: number, row: Array<string>) => {
      const uncalledRowVal = row.reduce(
        (agg, cell) =>
          calledNumbers.includes(cell) ? agg : agg + Number(cell),
        0
      );
      return agg + uncalledRowVal;
    },
    0
  );

  console.log(uncalled);
  console.log(uncalled * Number(bingo.lastNumber));
} else {
  console.log("NO BINGO FOUND");
}
