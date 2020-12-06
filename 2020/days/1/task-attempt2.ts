import inputList from "./input";

const part1 = (goal = 2020) => {
  let res: number = 0;

  inputList.every((first: number) => {
    const remainder = goal - first;
    const foundSecond = inputList.find(
      (item: number) => item === remainder && item
    );
    if (foundSecond) {
      res = foundSecond * first;
      return false;
    }
    return true;
  });

  return res;
};
console.log(part1());

const part2 = (goal = 2020) => {
  let res: number = 0;

  inputList.every((first: number) => {
    const remainder = goal - first;
    const rest = part1(remainder);
    if (rest) {
      res = first * rest;
      return false;
    }
    return true;
  });

  return res;
};

console.log(part2());
