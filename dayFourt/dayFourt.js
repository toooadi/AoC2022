const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replaceAll("\r", "");
let split = raw.split("\n");
split = split.map((str) => str.split(" -> "));
split = split.map((arr) => arr.map((str) => str.split(",")));
split = split.map((arr) => arr.map((vals) => [Number(vals[0]), Number(vals[1])]));

//find grid size needed, (min, max)
let minx = Number.MAX_SAFE_INTEGER;
let maxx = maxy = 0;
for (let arr of split) {
    for (let vals of arr) {
        minx = vals[0] < minx ? vals[0] : minx;
        maxx = vals[0] > maxx ? vals[0] : maxx;
        maxy = vals[1] > maxy ? vals[1] : maxy;
    }
}
let grid = new Array(maxy + 3).fill(0).map(() => new Array(maxx + 160).fill(0));
//We define: 0 = Air, 1 = Sand, -1 = Rock
for (let arr of split) {
    for (let i = 0 ; i < arr.length - 1 ; i++) {
        let vals = arr[i];
        let next = arr[i + 1];
        if (vals[0] < next[0]) {
            for(let j = vals[0] ; j <= next[0] ; j++) {grid[vals[1]][j] = -1;}
        } else if (vals[1] < next[1]) {
            for(let j = vals[1] ; j <= next[1] ; j++) {grid[j][vals[0]] = -1;}
        } else if (vals[0] > next[0]) {
            for(let j = vals[0] ; j >= next[0] ; j--) {grid[vals[1]][j] = -1;}
        } else {
            for(let j = vals[1] ; j >= next[1] ; j--) {grid[j][vals[0]] = -1;}
        }
    }
}
//Task 2 init
for (let i = 0 ; i < maxx + 160 ; i++) {
    grid[maxy + 2][i] = -1;
}
let numSand = 0;
let inAbyss = false;
while(!inAbyss) {
    let sandx = 500;
    let sandy = 0;
    let moving = true;
    while (moving) {
        if (grid[sandy][sandx] == 1/*sandy == maxy + 2*/) {
            moving = false;
            inAbyss = true;
        } else if (grid[sandy + 1][sandx] == 0) {
            sandy++;
        } else if (grid[sandy + 1][sandx - 1] == 0) {
            sandx--;
            sandy++;
        } else if (grid[sandy + 1][sandx + 1] == 0) {
            sandx++;
            sandy++;
        } else {
            grid[sandy][sandx] = 1;
            moving = false;
            numSand++;
        }
    }
}
console.log(numSand);