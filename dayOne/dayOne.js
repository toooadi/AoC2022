const fs = require("fs");
const { get } = require("http");

let raw = fs.readFileSync("taskOne.txt", "utf8");

let split = raw.split("\n");
let getUnshiftedArray = (arr, el) => {arr.unshift(el); return arr;}
let addToFirst = (arr, num) => {arr[0] += num; return arr;}
let sums = split.reduce((acc, curr) => curr == "\r" ? getUnshiftedArray(acc, 0) : addToFirst(acc, Number(curr)), [0]);
let max = Math.max(...sums);
console.log(max);
sums = sums.filter((num) => !(num == max));
max = Math.max(...sums);
console.log(max);
sums = sums.filter((num) => !(num == max));
max = Math.max(...sums);
console.log(max);
