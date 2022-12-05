const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
let split = raw.split("\n");
split = split.map((str) => str.replace('\r', ''));
split = split.map((str) => str.split(','));
//right now we have an array of arrays with (numstr-numstr) elements
let returnObject = (str) => {let arr = str.split('-'); return {fst:Number(arr[0]), snd: Number(arr[1])}};
split = split.map((arr) => [returnObject(arr[0]), returnObject(arr[1])]);
let containsPair = (o1, o2) => (o1.fst <= o2.fst && o1.snd >= o2.snd || o2.fst <= o1.fst && o2.snd >= o1.snd);
let res1 = split.reduce((acc, curr) => containsPair(curr[0], curr[1]) ? acc + 1 : acc, 0);
let hasOverlap = (o1, o2) => (o1.snd >= o2.fst && o1.fst <= o2.snd)
let res2 = split.reduce((acc, curr) => hasOverlap(curr[0], curr[1]) ? acc + 1 : acc, 0)
console.log(res1);
console.log(res2);