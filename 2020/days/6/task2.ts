import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n");

const processGroup = (group: string[]): number => {
  const answers: Record<string, number> = {};
  group.forEach((person) => {
    person.split("").forEach((answer) => {
      answers[answer] = answers[answer] ? answers[answer] + 1 : 1;
    });
  });

  return Object.values(answers).reduce(
    (total, ans) => (ans === group.length ? (total += 1) : total),
    0
  );
};

const getGroups = (): string[][] =>
  rows.reduce(
    ({ groups, currentGroup }, row) =>
      row.length === 0
        ? { groups: [...groups, currentGroup], currentGroup: [] }
        : { groups, currentGroup: [...currentGroup, row] },
    { groups: [] as string[][], currentGroup: [] as string[] }
  ).groups;

const run = () =>
  getGroups().reduce((total, group) => (total += processGroup(group)), 0);

console.log("part 2 answer: ", run());
