import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const boardingPasses = input.split("\n").filter(Boolean);

const ROWS = 128;
const SEATS = 8;

const findRowOrSeat = (
  min: number,
  max: number,
  rows: string[],
  lowerDef: string
): number => {
  const halfWayPoint = min + Math.floor((max - min) / 2);
  if (rows[0] === lowerDef) {
    if (rows.length === 1) {
      return min;
    } else {
      return findRowOrSeat(min, halfWayPoint, rows.slice(1), lowerDef);
    }
  } else {
    if (rows.length === 1) {
      return max;
    } else {
      return findRowOrSeat(halfWayPoint + 1, max, rows.slice(1), lowerDef);
    }
  }
};

const getRow = (rowDefinition: string[]): number =>
  findRowOrSeat(0, ROWS - 1, rowDefinition, "F");

const getSeat = (seatDefinition: string[]): number =>
  findRowOrSeat(0, SEATS - 1, seatDefinition, "L");

const seatIds = boardingPasses.map((pass: string) => {
  const rowDef = pass.slice(0, -3).split("");
  const seatDef = pass.slice(-3).split("");

  return getRow(rowDef) * 8 + getSeat(seatDef);
});

const maxSeat = Math.max(...seatIds);

console.log("Task 1 - highest seat ID", maxSeat);
const sortedSeats = seatIds.sort();

for (let i = 0; i < maxSeat; i++) {
  const hasPrev = sortedSeats.includes(i - 1);
  const hasCurr = sortedSeats.includes(i);
  const hasNext = sortedSeats.includes(i + 1);

  if (hasPrev && hasNext && !hasCurr) {
    console.log("Task 2 - Your seat", i);
    break;
  }
}
