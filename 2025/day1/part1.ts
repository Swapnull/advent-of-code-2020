import path from "path";
import fs from "fs";

type Direction = "L" | "R";

type InputAction = {
  direction: Direction;
  degree: number;
};

const input: Array<InputAction> = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line: string) => {
    const direction = line.at(0) as Direction;
    const degree = parseInt(line.slice(1), 10);
    return { direction, degree };
  });

/**
 * `%` operator is more accurately the "remainder" operator, not the modulo operator
 * (negative dividends return negative results). Create a true modulo operator
 * so results are always positive.
 */
function mod(a: number, n: number): number {
  // `remainder` is a number between -n and n (exclusive)
  const remainder = a % n;

  // `shiftByModulus` is now a number between 0 and 2n (exclusive)
  const shiftByModulus = remainder + n;

  // `result` is now a number between 0 and n
  const result = shiftByModulus % n;

  return result;
}

const MODULUS = 100 as const;

type RotateOptions = {
  currentNumber: number;
  direction: Direction;
  degree: number;
};

function rotate({ currentNumber, direction, degree }: RotateOptions) {
  // Rotating left is subtracting the degree
  const rawRotation = direction === "L" ? currentNumber - degree : currentNumber + degree;

  const equivalenceNumber = mod(rawRotation, MODULUS);
  return equivalenceNumber;
}

let currentNumber = 50;
let endsAtZero = 0;
let zeroes = 0;

for (let { direction, degree } of input) {
  const nextNumber = rotate({
    currentNumber,
    direction,
    degree,
  });

  /**
   * Part one
   */
  if (nextNumber === 0) {
    endsAtZero++;
  }

  /**
   * Part two
   */

  // A full 360° rotation *always* passes 0 (since it passes every number)
  const fullRotations = Math.floor(degree / MODULUS);
  zeroes += fullRotations;

  // If we start at 0, we can only pass 0 by a full rotation, not a partial rotation
  if (currentNumber !== 0) {
    const wentToZero = nextNumber === 0;
    const rightPastZero = direction === "R" && nextNumber < currentNumber;
    const leftPastZero = direction === "L" && nextNumber > currentNumber;

    if (wentToZero || rightPastZero || leftPastZero) {
      zeroes++;
    }
  }

  currentNumber = nextNumber;
}

console.log("Part 1:", endsAtZero);
console.log("Part 2:", zeroes);
