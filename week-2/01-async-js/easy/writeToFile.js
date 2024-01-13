const fs = require("node:fs");

const content = "Hi Anurag Again!. \nStill on week - 2 of Cohort!";
fs.writeFile("hello2.txt", content, (err) => {
  if (err) {
    console.error(err);
  }
});
