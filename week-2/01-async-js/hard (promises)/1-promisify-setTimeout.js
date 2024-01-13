/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    // function promiseReturnHelper(){
    //     retur
    // }

    return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, n*1000);
    });

}

// a = wait(5);
// console.log(a);


module.exports = wait;
