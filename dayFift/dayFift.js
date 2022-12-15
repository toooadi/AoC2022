let multSet = require("jsclass/src/set").Set;
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
split = split.map((str) => {let tmp = str.match(/\d\d*/g);
                            return tmp.map(Number)});
let manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
let lineDist = (z1, z2) => Math.abs(z1 - z2);
let beaconSensorSet = new multSet();
for (arr of split) {
    beaconSensorSet.add(new Pos(arr[0], arr[1]));
    beaconSensorSet.add(new Pos(arr[2], arr[3]));
    //add distance to array
    arr.push(manhattan(arr[0], arr[1], arr[2], arr[3]));
}
let set = new Set();
for (arr of split) {
    let dist = manhattan(arr[0], arr[1], arr[2], arr[3]);
    let ydist = lineDist(arr[1], 2000000);
    if (ydist < dist) {
        let diff = dist - ydist;
        let sensx = arr[0];
        for (let i = 0 ; i <= diff; i++) {
            if (!beaconSensorSet.contains(new Pos(sensx + i, 2000000))) {
                set.add(sensx + i);
            }
            if (!beaconSensorSet.contains(new Pos(sensx - i, 2000000))) {
                set.add(sensx - i);
            } 
        }
    }
}
console.log(set.size);

let greaterAll = (px, py) => {

    for (arr of split) {
        if (manhattan(arr[0], arr[1], px, py) <= arr[4]) {
            return false;
        }
    }
    return true;
}
let N = 4000000;
//position can only be immediately outside of the range of some sensor
for (arr of split) {
    let dist = arr[4];
    let sx = arr[0];
    let sy = arr[1];
    for (let i = 0 ; i <= dist + 1; i++) {
        let upy = sy + dist - i + 1;
        let downy = sy - dist + i - 1;
        let leftx = sx - i;
        let rightx = sx + i;
        if (upy <= N) {
            if (leftx >= 0 && greaterAll(leftx, upy)) {
                console.log([leftx, upy]);
                return;
            }
            if (rightx <= N && greaterAll(rightx, upy)) {
                console.log([rightx, upy]);
                return;
            }
        }
        if (downy >= 0) {
            if (leftx >= 0 && greaterAll(leftx, downy)) {
                console.log([leftx, downy]);
                return;
            }
            if (rightx <= N && greaterAll(rightx, downy)) {
                console.log([rightx, downy]);
                return;
            }
        }
    }
}
console.log("Not this time");
