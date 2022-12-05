const fs = require("fs");
let raw =  fs.readFileSync("taskOne.txt", "utf8");
let split = raw.split("\n");
split = split.map((str) => str.replace("\r", ""));
split = split.slice(10);
let stacks = [['R', 'P', 'C', 'D', 'B', 'G'],
                ['H', 'V','G'],
                ['N','S','Q','D','J','P','M'],
                ['P','S','L','G','D','C','N','M'],
                ['J','B','N','C','P','F','L','S'],
                ['Q','B','D','Z','V','G','T','S'],
                ['B','Z','M','H','F','T','Q'],
                ['C','M','D','B','F'],
                ['F','C','Q','G']];

split = split.map((str) => str.replace("move ", ""));
split = split.map((str) => str.split(" from "));
split = split.map((arr) => [arr[0]].concat(arr[1].split(" to ")));

for (let i = 0; i < split.length ; i++) {
    const amount = Number(split[i][0]);
    const from = Number(split[i][1]) - 1;
    const to = Number(split[i][2]) - 1;

    let j = 0;
    //Part 1
    /*while (j++ < amount) {
        //stacks[to].push(stacks[from].pop());
    }*/
    //Part 2
    stacks[to] = stacks[to].concat(stacks[from].slice(stacks[from].length - amount));
    stacks[from] = stacks[from].slice(0, stacks[from].length - amount);
}
console.log(stacks);