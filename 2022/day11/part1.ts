import fs from "fs";
import { chunk, sum } from "lodash";

const input = fs.readFileSync("input.txt", "utf-8").split("\n");

const rawMonkeys = chunk(input, 7).map((monkey) =>
  monkey.map((m) => m.trim()).filter((m) => m.length)
);

const getOperation = ([left, operator, right]: Array<string>) => {
  return (n: number) => {
    let x = left === "old" ? n : parseInt(left);
    let y = right === "old" ? n : parseInt(right);

    switch (operator) {
      case "+":
        return x + y;
      case "*":
        return x * y;
    }
  };
};

const monkeys = rawMonkeys.map((monkey, index) => {
  const [number, starting, operation, test, testTrue, testFalse] = monkey;

  const startingItems = starting
    .split(": ")[1]
    .split(",")
    .map((s) => parseInt(s.trim()));

  const _operation = getOperation(operation.split("=")[1].trim().split(" "));

  const testDivisibleBy = parseInt(test.replace("Test: divisible by ", ""));
  const testTrueMonkey = parseInt(testTrue.replace("If true: throw to monkey ", ""));
  const testFalseMonkey = parseInt(testFalse.replace("If false: throw to monkey ", ""));

  return {
    items: startingItems,
    operation: _operation,
    test: testDivisibleBy,
    testTrue: testTrueMonkey,
    testFalse: testFalseMonkey,
    inspected: 0,
  };
});

const cycles = 20;
for (let i = 0; i < cycles; i++) {
  monkeys.map((monkey, mIndex) => {
    monkey.items.forEach((item) => {
      const worry = monkey.operation(item);
      const bored = Math.floor(worry / 3);
      monkeys[bored % monkey.test === 0 ? monkey.testTrue : monkey.testFalse].items.push(bored);

      monkeys[mIndex].inspected++;
    });
    monkeys[mIndex].items = [];
  });
}

const inspected = monkeys.map(({ inspected }) => inspected).sort((a, b) => b - a);

console.log(inspected[0] * inspected[1]);
