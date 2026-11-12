// analyser.js - Expense Analyser
const fs = require("fs");
const _ = require("lodash"); // installed in Step 1 with: npm install lodash (not used further)

const parseExpenses = (text) => {
  return text
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.trim().split(",");
      return { category: parts[0], amount: Number(parts[1]) };
    });
};
// ---------- Step 3: read the file synchronously ----------
console.time("sync read");
const text = fs.readFileSync("expenses.txt", "utf8");
console.timeEnd("sync read");
const expenses = parseExpenses(text);
console.log("First expense:", expenses[0]);
// ---------- Step 4: higher-order functions ----------

// total expenses
const totalSpent = expenses.reduce((total, e) => {
  return total + e.amount;
}, 0);

console.log("total expense : ", totalSpent);


//  expenses above 500

const bigExpenses = expenses.filter((e) => {
  return e.amount > 500;
});

console.log("Big Expenses:", bigExpenses);

//Rs 50 delivery fee
const withFee = expenses.map((e) => {
  return {
    ...e,
    amount: e.amount + 50
  };
});
console.log("Expenses With Fee:", withFee);
console.log("Original First Expense:", expenses[0]);

// ---------- Step 5: totals per category ---------- 
const totalsByCategory = {};

for (const e of expenses) {

    if (totalsByCategory[e.category] === undefined) {
        totalsByCategory[e.category] = 0;
    }

    totalsByCategory[e.category] += e.amount;
}

console.log("Category Totals:", totalsByCategory);
// ---------- Step 6: switch and ternary ----------
function budgetNote(category) {

    switch (category) {

        case 'food':
            return 'Daily need';

        case 'travel':
            return 'Commute';

        case 'books':
            return 'Study';

        default:
            return 'Other';
    }
}
const categories = ["food", "travel", "books", "entertainment"];
categories.forEach((category) => {

    const total = totalsByCategory[category];

    const status = total > 1500 ? 'OVER 1500' : 'OK';

    console.log(
        `${category} (${budgetNote(category)}): Rs ${total} - ${status}`
    );

});
// ---------- Step 7: closure ----------
function createBudgetTracker(limit) {

    let spent = 0;

    return function spend(amount) {

        spent += amount;

        if (spent <= limit) {
            return `Remaining: ${limit - spent}`;
        } else {
            return `Over budget by ${spent - limit}`;
        }
    };
}
 const tracker = createBudgetTracker(1000);
 console.log(tracker(300));
 console.log(tracker(500));
 console.log(tracker(400));

// ---------- Step 8: read the file asynchronously ----------
 console.log("Async read started");

fs.readFile('expenses.txt', 'utf8', (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Async read finished");

});

for (let i = 0; i < 1000000; i++) {
    // Loop running
}

console.log("Loop finished");

