/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  str = str.toLowerCase();
  let ans = 0;
  for (s of str) {
    if (s == "a" || s == "e" || s == "i" || s == "o" || s == "u") {
      ans += 1;
    }
  }

  return ans;
}

console.log(countVowels("Anurag"));

module.exports = countVowels;
