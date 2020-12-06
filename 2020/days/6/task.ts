import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n");

const processGroup = (group: string[]): Set<string> => {
  const answers = new Set<string>();
  group.forEach((person) => {
    person.split("").forEach((answer) => {
      answers.add(answer);
    });
  });

  return answers;
};

const getGroups = (): string[][] =>
  rows.reduce(
    ({ groups, currentGroup }, row) =>
      row.length === 0
        ? { groups: [...groups, currentGroup], currentGroup: [] }
        : { groups, currentGroup: [...currentGroup, row] },
    { groups: [] as string[][], currentGroup: [] as string[] }
  ).groups;

const run = () => {
  const groups = getGroups();
  const answer = groups.reduce((total, group) => {
    const answers = processGroup(group);
    return (total += answers.size);
  }, 0);
  console.log("part 1 answer", answer);
};

run();
