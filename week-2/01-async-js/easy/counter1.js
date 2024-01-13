function runCounter(){
    let count = 0;

    function printAndUpdateCounter(){
        console.log(count);
        count += 1;
    }

    setInterval(printAndUpdateCounter, 1000);
}

runCounter();