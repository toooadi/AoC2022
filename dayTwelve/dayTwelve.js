let fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replaceAll("\r", "");
let split = raw.split("\n");
const n = split.length;
const m = split[0].length;
let distArr = new Array(n).fill(0).map(() => new Array(m).fill(Number.MAX_SAFE_INTEGER));
let canStep = (x, y) => {
    const xval = x == "S" ? 97 : x == "E" ? 122 : x.charCodeAt(0);
    const yval = y == "S" ? 97 : y == "E" ? 122 : y.charCodeAt(0);
    return yval <= xval + 1;
}
unshiftGet = (arr, el) => {
    arr.unshift(el);
    return arr;
}
let starts = split.reduce((acc, curr, i) =>curr.indexOf("E") >= 0 && curr.indexOf("S") >= 0 ? [[i, curr.indexOf("S")], [i, curr.indexOf("E")]] : curr.indexOf("S") >= 0 ? unshiftGet(acc, [i, curr.indexOf("S")]) : curr.indexOf("E") >= 0 ? acc.push([i, curr.indexOf("E")]) : acc, []);
//starts is now [[S_x, S_y], [E_x, E_y]]
//We do a recursion starting from S
startx = starts[0][0];
starty = starts[0][1];
endx = starts[1][0];
endy = starts[1][1];

function findDist(i, j, currDist) {
    if (currDist < distArr[i][j]) {
        distArr[i][j] = currDist;
        let letter = split[i][j];
        if (i > 0 && canStep(letter, split[i - 1][j])) {
            findDist(i - 1, j, currDist + 1);
        }
        if (i < (n - 1) && canStep(letter, split[i + 1][j])) {
            findDist(i + 1, j, currDist + 1);
        }
        if (j > 0 && canStep(letter, split[i][j - 1])) {
            findDist(i, j - 1, currDist + 1);
        }
        if (j < (m - 1) && canStep(letter, split[i][j + 1])) {
            findDist(i, j + 1, currDist + 1);
        }
    }
}
let minDist = Number.MAX_SAFE_INTEGER;
function findDistRev(i, j, currDist) {
    if (currDist < distArr[i][j]) {
        distArr[i][j] = currDist;
        let letter = split[i][j];
        minDist = letter == "a" && currDist < minDist ? currDist : minDist;
        if (i > 0 && canStep(split[i - 1][j], letter)) {
            findDistRev(i - 1, j, currDist + 1);
        }
        if (i < (n - 1) && canStep(split[i + 1][j], letter)) {
            findDistRev(i + 1, j, currDist + 1);
        }
        if (j > 0 && canStep(split[i][j - 1], letter)) {
            findDistRev(i, j - 1, currDist + 1);
        }
        if (j < (m - 1) && canStep(split[i][j + 1], letter)) {
            findDistRev(i, j + 1, currDist + 1);
        }
    }
}
findDistRev(endx, endy, 0);
console.log(minDist);
