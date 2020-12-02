/*
This is pretty brute force, but it is day 1 so that is fine.
A better solution would probably have been something like
"for each, get goal - item = value to look for. Then do a find."
*/

import inputList from "./input";

const goal = 2020;

const part1 = () => {
  inputList.forEach((first: number) => {
    inputList.forEach((second: number) => {
      if (first + second === goal) {
        console.log(first * second);
      }
    });
  });
};
part1();

/* I used try...catch here to exit early when the result is found. Definitely not something I would generally do */
const part2 = () => {
  try {
    inputList.forEach((first: number) => {
      inputList.forEach((second: number) => {
        inputList.forEach((third: number) => {
          if (first + second + third === goal) {
            throw `${first * second * third}`;
          }
        });
      });
    });
  } catch (res) {
    console.log(res);
  }
};

part2();
