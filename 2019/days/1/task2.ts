import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input
  .split("\n")
  .filter(Boolean)
  .map((row) => parseInt(row));

const getFuel = (req: number): number => {
  const fuelRequired = Math.floor(req / 3) - 2;
  if (fuelRequired <= 0) {
    return 0;
  } else {
    return fuelRequired + getFuel(fuelRequired);
  }
};

const totalFuel = rows.reduce((total, row) => {
  return total + getFuel(row);
}, 0);

console.log(totalFuel);
