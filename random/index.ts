import fs from "fs";
import { addDays, addWeeks, format, isValid, subWeeks } from "date-fns";

const input = fs.readFileSync(`${__dirname}/input.json`, "utf-8");

const data = JSON.parse(input);

console.log(data.length);

const formatted = data.map((user) => {
  const start = user.orderDetails.consultation.responses.find(
    (item) => item.question === "Date commenced on Wegovy"
  );
  const dose = user.orderDetails.consultation.responses.find(
    (item) => item.question === "Current Dose prescribed"
  );

  console.log(user.initialSubmitAfter["$date"]);

  const submitAfter = format(addDays(new Date(user.initialSubmitAfter["$date"]), 29), "MM");

  if (start && dose) {
    const startDate = new Date(start.answer);

    return {
      startDate: isValid(startDate) ? startDate : subWeeks(new Date(), 20),
      month: submitAfter,
      submitAfter,
      dose: dose.answer,
    };
  }
});

const bounds = {
  "0.5": 4,
  "1": 8,
  "1.7": 12,
  "2.4": 16,
};

const doses = Object.keys(bounds);

// group by dose
const grouped = formatted.filter(Boolean).reduce(
  (acc, user) => {
    const dose = user.dose;
    if (acc[user.month][dose]) {
      acc[user.month][dose] += 1;
    } else {
      acc[user.month][dose] = 1;
    }
    return acc;
  },
  {
    "04": [],
    "05": [],
    "06": [],
    "07": [],
    "08": [],
    "09": [],
    "10": [],
    "11": [],
    "12": [],
    "01": [],
    "02": [],
    "03": [],
  }
);

console.log(grouped);

Object.entries(grouped).forEach(([dose, users]) => {
  console.log(dose, (users as Array<string>).length);
});

const updatedGroups = formatted.filter(Boolean).reduce(
  (acc, user) => {
    const dose = user.dose;
    const newMonth = format(addDays(new Date(user.submitAfter), 29), "MM");
    const weeksToAdd = bounds[dose];

    if (addWeeks(user.startDate, weeksToAdd) > new Date()) {
      acc[newMonth][dose] = acc[newMonth][dose] + 1;
    } else {
      const i = doses.findIndex((d) => d === dose);

      if (i > -1) {
        if (i < doses.length - 1) {
          acc[newMonth][doses[i + 1]] = acc[newMonth][doses[i + 1]] + 1;
        } else {
          acc[newMonth][doses[i]] = acc[newMonth][doses[i]] + 1;
        }
      }
    }
    return acc;
  },
  {
    "04": {
      "0.5": 0,
      "1": 0,
      "1.7": 0,
      "2.4": 0,
    },
    "05": {
      "0.5": 0,
      "1": 0,
      "1.7": 0,
      "2.4": 0,
    },
    "06": {
      "0.5": 0,
      "1": 0,
      "1.7": 0,
      "2.4": 0,
    },
    "07": {
      "0.5": 0,
      "1": 0,
      "1.7": 0,
      "2.4": 0,
    },
  }
);

console.log("---");
console.log(updatedGroups);
