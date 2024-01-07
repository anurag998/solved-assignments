/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
  */

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function isPalindrome(str) {
  str = str.toLowerCase();

  const len = str.length;
  // for (let i = 0; i < len / 2; i++) {
  //   if (str[i] !== str[len - 1 - i]) {
  //     return false;
  //   }
  // }

  let beg = 0,
    end = len - 1;
  while (beg < end) {
    while (beg < len && (isLetter(str[beg]) == null)) {
      beg++;
    }

    while (end >= 0 && (isLetter(str[end]) == null)) {
      end--;
    }
    console.log(beg, end);

    if (beg >= end) return true;

    if (str[beg] !== str[end]) return false;

    beg++;
    end--;
  }
  return true;
}

// console.log(3 / 2);
console.log(isPalindrome("anuuna "));
// console.log(isLetter(" "));

module.exports = isPalindrome;
