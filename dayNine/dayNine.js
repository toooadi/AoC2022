let cls = require("jsclass");
let Set = require("jsclass/src/set").Set;
const fs = require("fs");
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    equals(p) {
        return this.x == p.x && this.y == p.y;
    }
}
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replaceAll("\r", "");
let split = raw.split("\n");
split = split.map((str) => str.split(" "));
let set = new Set();
set.add(new Pos(0, 0));
let headx = heady = tailx = taily = 0;
let dist = () => Math.sqrt((headx - tailx) ** 2 + (heady - taily) ** 2);
let moveTail = () => {
    if (dist() < 2) {
        return;
    } else if (dist() == 2) { //up/down/left/right case
        tailx += (headx - tailx) > 1 ? 1 : (headx - tailx) < -1 ? -1 : 0;
        taily += (heady - taily) > 1 ? 1 : (heady - taily) < -1 ? -1 : 0;
        set.add(new Pos(tailx, taily));
    } else { //diagonal case
        let xdist = headx - tailx;
        let ydist = heady - taily;
        tailx += xdist < 0 ? -1 : 1;
        taily += ydist < 0 ? -1 : 1;
        set.add(new Pos(tailx, taily));
    }
}
for (let cmdarr of split) { //Part one
    let cmd = cmdarr[0];
    let amt = Number(cmdarr[1]);
    for (let i = 0 ; i < amt ; i++) {
        headx += cmd == 'R' ? 1 : cmd == 'L' ? -1 : 0;
        heady += cmd == 'U' ? 1 : cmd == 'D' ? -1 : 0;
        moveTail();
    }
    
}
console.log(set.size);
let start = new Date().getTime();
set = new Set();
set.add(new Pos(0, 0));
//Basically the same as part 1 with a few adjustments
let ropes = new Array(10).fill(0).map(() => [0, 0]);
let dist2 = (i, j) => Math.sqrt((ropes[i][0] - ropes[j][0]) ** 2 + (ropes[i][1] - ropes[j][1]) ** 2);
let movePart = (i, j) => {
    if (dist2(i, j) < 2) {
        return;
    } else if (dist2(i, j) == 2) { //up/down/left/right case
        ropes[j][0] += (ropes[i][0] - ropes[j][0]) > 1 ? 1 : (ropes[i][0] - ropes[j][0]) < -1 ? -1 : 0;
        ropes[j][1] += (ropes[i][1] - ropes[j][1]) > 1 ? 1 : (ropes[i][1] - ropes[j][1]) < -1 ? -1 : 0;
        if(j == 9) {
            set.add(new Pos(ropes[j][0], ropes[j][1]))
        }
    } else { //diagonal case
        let xdist = ropes[i][0] - ropes[j][0];
        let ydist = ropes[i][1] - ropes[j][1];
        ropes[j][0] += xdist < 0 ? -1 : 1;
        ropes[j][1] += ydist < 0 ? -1 : 1;
        if(j == 9) {
            set.add(new Pos(ropes[j][0], ropes[j][1]))
        }
    }
}
for (let cmdarr of split) { //Part one
    let cmd = cmdarr[0];
    let amt = Number(cmdarr[1]);
    for (let i = 0 ; i < amt ; i++) {
        ropes[0][0] += cmd == 'R' ? 1 : cmd == 'L' ? -1 : 0;
        ropes[0][1] += cmd == 'U' ? 1 : cmd == 'D' ? -1 : 0;
        for(let j = 0 ; j < 9 ; j++) {
            movePart(j, j + 1)
        }
    }
    
}
let end = new Date().getTime();
console.log(set.size);
console.log(`Part 2 took ${end - start} ms.`);