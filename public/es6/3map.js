// The .map() method allows you to run a function on each item in the array, returning a new array as the result.
// In React, map() can be used to generate lists.

const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const myList = words.map((item) => item.length)
console.log(myList)
console.log(words)

const result = words.filter((word) => word.length > 6);
console.log(result);
console.log(words)

function isBigEnough(value) {
    return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// 필터링된 값은 [12, 130, 44]
console.log(filtered);

