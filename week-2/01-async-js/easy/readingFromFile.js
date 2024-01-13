const fs = require("node:fs");

function normalReadFile() {
  fs.readFile("hello.txt", "utf8", (err, data) => {
    console.log(data);
  });
}

function readFileWithLog() {
  fs.readFile("hello.txt", "utf8", (err, data) => {
    console.log(data);
  });

  console.log("This will print first");
}

function readFileExpensive() {
  fs.readFile("hello.txt", "utf8", (err, data) => {
    console.log(data);
  });
  a = 0;
  for (let i = 0; i < 10000000000; i++) {
    a++;
    a--;
  }
  console.log("This will print first");
}

readFileExpensive();
