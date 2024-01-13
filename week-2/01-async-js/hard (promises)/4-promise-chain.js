/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, t*1000);
    })
}

function wait2(t) {
    return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, t*1000);
    })
}

function wait3(t) {
    return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, t*1000);
    })
}

// async function calculateTime(t1, t2, t3) {
//     const startTime = Date.now();

//     const p = await wait1(t1).then(() => {
//         return wait2(t2);
//     }).then(() => {
//         return wait3(t3)
//     });

//     const endTime = Date.now();
//     return endTime - startTime;
// }

function calculateTime(t1, t2, t3) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        
        wait1(t1).then(() => {
            return wait2(t2);
        }).then(() => {
            return wait3(t3)
        }).then(()=> {
            const endTime = Date.now();
            resolve(endTime - startTime);
        })
    });
}

async function tester(){
    const rv = await calculateTime(3,4,5);
    console.log(rv);
}

tester();
module.exports = calculateTime;
