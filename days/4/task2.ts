/*
 * This solution works, but it would be much nicer to condense the `validator` function down into a few regex statements.
 */

import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const rows = input.split("\n");

interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const { passports } = rows.reduce(
  ({ passports, currentPassport }, row) => {
    if (row.length === 0) {
      passports.push(currentPassport);
      return { passports, currentPassport: {} };
    }

    const itemsOnRow = row.split(" ").reduce((agg, item) => {
      const [key, value] = item.split(":");
      return { ...agg, [key]: value };
    }, {});

    return {
      passports,
      currentPassport: { ...currentPassport, ...itemsOnRow },
    };
  },
  { passports: [] as Passport[], currentPassport: {} as Passport }
);

const validator = (key: string, value: string) => {
  switch (key) {
    case "byr":
      return (
        value.length === 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002
      );
    case "iyr":
      return (
        value.length === 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020
      );
    case "eyr":
      return (
        value.length === 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030
      );
    case "hgt":
      const number = parseInt(value);
      const isCmValueValid =
        value.includes("cm") && number >= 150 && number <= 193;
      const isInValueValid =
        value.includes("in") && number >= 59 && number <= 76;
      return !isNaN(number) && (isCmValueValid || isInValueValid);
    case "hcl":
      const regex = new RegExp("^#[a-f0-9]+");
      return regex.test(value);
    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    case "pid":
      return value.length === 9;
    case "cid":
    case "default":
      return true;
  }
};

const validPassports = passports.filter((pp) => {
  const keys = Object.keys(pp);
  const hasAllKeys = requiredKeys.every((k) => keys.includes(k));
  const allValuesValid = Object.entries(pp).every(([key, value]) =>
    validator(key, value)
  );

  return hasAllKeys && allValuesValid;
});

console.log("Total valid passports", validPassports.length);
