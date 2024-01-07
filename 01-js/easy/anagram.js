/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function calcCharCount(str, m){
  for (let i = 0; i < str.length; i++) {
    let curr = str[i];
    if (m.has(curr) == false) {
      // console.log("Not present");
      m.set(curr, 1);
    } else {
      let cv = m.get(curr);
      cv += 1;
      m.set(curr, cv);
    }
  }

}

function isAnagram(str1, str2) {
  let m1 = new Map();
  let m2 = new Map();

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  
  // console.log(str1, str2);

  if (str1.length !== str2.length) {
    return false;
  }

  calcCharCount(str1, m1);
  calcCharCount(str2, m2);


  // for(const [key, val] of m1)
  // {
  //   console.log(key ,val);
  // }

  for (const [key, value] of m1) {
    // console.log(key + ' = ' + value);
    if (m2.has(key) === false) {
      return false;
    } else {
      const v = m2.get(key);
      if (v !== value) {
        return false;
      }
    }
  }

  return true;
}

// console.log(isAnagram("Anu", "hEy"));

module.exports = isAnagram;
