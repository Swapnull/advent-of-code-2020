import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const rows = input.split("\n").filter(Boolean);

const [call, ...boardSet] = rows;
const callOrder = call.split(",");

type Board = Array<Array<string>>;
type BoardCompletion = Array<{ rows: Array<number>; cols: Array<number> }>;
type Bingo = { boardIndex: number; lastNumber: string };

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

let bingo: Array<Bingo> = [];

const checkRows = (board: Board, toFind: string, boardIndex: number) => {
  for (let i = 0; i < board.length; i++) {
    if (bingo.findIndex((bin) => bin.boardIndex === boardIndex) < 0) {
      const row = board[i];
      const foundIndex = row.findIndex((cell) => cell === toFind);
      if (foundIndex >= 0) {
        const newFoundRowCount = boardCompletion[boardIndex].rows[i] + 1;
        const newFoundColCount =
          boardCompletion[boardIndex].cols[foundIndex] + 1;

        if (newFoundRowCount === 5 || newFoundColCount === 5) {
          bingo.push({ boardIndex, lastNumber: toFind });
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
  if (bingo.length != boards.length) {
    calledNumbers.push(num);
    boards.map((board, boardIndex) => {
      checkRows(board, num, boardIndex);
    });
  }
});

const getFinalValue = ({ boardIndex, lastNumber }: Bingo) => {
  const uncalled = boards[boardIndex].reduce(
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
  console.log(uncalled * Number(lastNumber));
};

getFinalValue(bingo[bingo.length - 1]);
