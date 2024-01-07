/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let cl = numbers[0];

    for(nums of numbers){
        if(nums > cl){
            cl = nums;
        }
    }

    return cl;
}

module.exports = findLargestElement;