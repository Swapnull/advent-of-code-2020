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

const validPassports = passports.filter((pp) => {
  const keys = Object.keys(pp);
  return requiredKeys.every((k) => keys.includes(k));
});

console.log("Total valid passports", validPassports.length);
