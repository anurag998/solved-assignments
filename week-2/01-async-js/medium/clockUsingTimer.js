function displayClock() {
  const d = new Date();

  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  //   console.log(`${hours} ${minutes} ${seconds}`);

  function updateClock() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
        if (hours == 24) {
          hours = 0;
        }
      }
    }
    console.clear();
    console.log(`${hours}:${minutes}:${seconds} \n${hours > 12 ? hours-12: hours}:${minutes}:${seconds} ${hours >= 12 ? "PM": "AM"}`);
  }

  setInterval(updateClock, 1000);
}

displayClock();
