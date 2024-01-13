const fs = require("node:fs");

function cleanFile(fileName) {
  function cleanLine(data) {
    let i = 0,
      size = data.length,
      space = false,
      buffer = "";
    // Remove spaces in frnt
    while (i < size) {
      if (data[i] === " ") {
        i++;
      } else {
        break;
      }
    }

    while (i < size) {
      if (data[i] === " ") {
        if (space === false) {
          space = true;
          buffer = buffer.concat(data[i]);
        } else {
        }
      } else {
        space = false;
        buffer = buffer.concat(data[i]);
      }

      i++;
    }

    console.log(buffer);
    return buffer;
  }

  function cleanHelper(data){
    buffer = ""
    a = data.split('\n');
    for(line of a){
        cleanedLine = cleanLine(line);
        buffer = buffer.concat(cleanedLine);
        buffer = buffer.concat("\n");
    }


    return buffer;

  }

  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err === null) {
      // console.log(data);
      newData = cleanHelper(data);
      fs.writeFile(fileName, newData, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log("Error while reading file");
    }
  });
}

cleanFile("hello.txt");
