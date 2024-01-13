function runCounter(){
    let count = 0;
    
    function printAndUpdateCounter(){
        console.log(count);
        count++;
        setTimeout(printAndUpdateCounter, 1000);
    }
    
    printAndUpdateCounter();
}
runCounter();