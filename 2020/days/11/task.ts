import fs from "fs";
import isEqual from "lodash/isEqual";
const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n").map((row) => row.split(""));

const seatChangeState = (map: string[][], seatX: number, seatY: number) => {
  const seat = map[seatY]?.[seatX];
  const top = map[seatY - 1]?.[seatX];
  const topLeft = map[seatY - 1]?.[seatX - 1];
  const left = map[seatY]?.[seatX - 1];
  const bottomLeft = map[seatY + 1]?.[seatX - 1];
  const bottom = map[seatY + 1]?.[seatX];
  const bottomRight = map[seatY + 1]?.[seatX + 1];
  const right = map[seatY]?.[seatX + 1];
  const topRight = map[seatY - 1]?.[seatX + 1];

  const adjacent = [
    top,
    topLeft,
    left,
    bottomLeft,
    bottom,
    bottomRight,
    right,
    topRight,
  ];

  const occupied = adjacent.filter((a) => a === "#");

  if (seat === "L" && occupied.length === 0) {
    return "#";
  } else if (seat === "#" && occupied.length >= 4) {
    return "L";
  }
  return seat;
};

const runOnce = (incomingMap: string[][]) => {
  let map = JSON.parse(JSON.stringify(incomingMap));

  incomingMap.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      map[rowIndex][cellIndex] = seatChangeState(
        incomingMap,
        cellIndex,
        rowIndex
      );
    });
  });

  return map;
};

let found = false;
let currentMap = rows;
while (!found) {
  const newMap = runOnce(currentMap);

  if (isEqual(newMap, currentMap)) {
    found = true;
  } else {
    currentMap = newMap;
  }
}

let occupiedCount = 0;
currentMap.forEach((row) => {
  row.forEach((cell) => {
    if (cell === "#") occupiedCount++;
  });
});

console.log(occupiedCount);
