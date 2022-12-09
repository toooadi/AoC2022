const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replaceAll("\r", "");
let split = raw.split("\n");
let rows = split.length;
let cols = split[0].length;
let boolArr = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
let numArr = new Array(rows).fill(0).map(() => new Array(cols));
//outer trees all visible, cols==rows is true
let count = 0;
for (let i = 0 ; i < rows - 1 ; i++) {
    boolArr[i][cols - 1] = boolArr[i][0] = boolArr[rows - 1][i] = boolArr[0][i] = true;
    numArr[i][cols - 1] = Number(split[i][cols - 1]);
    numArr[i][0] = Number(split[i][0]);
    numArr[rows - 1][i] = Number(split[rows - 1][i]);
    numArr[0][i] = Number(split[0][i])
    count += 4;
}

let cond = (i, j) =>  {
    let up = down = left = right = true;
    for (let k = 1 ; k < cols - 1 ; k++) {
        up = i - k >= 0 ? up && (numArr[i - k][j] < numArr[i][j]) : up;
        down = i + k < rows ? down && (numArr[i + k][j] < numArr[i][j]) : down;
        left = j - k >= 0 ? left && (numArr[i][j - k] < numArr[i][j]) : left;
        right = j + k < cols ? right && (numArr[i][j + k] < numArr[i][j]) : right;
    }
    return up || down || left || right;
}
let score = (i, j) => {
    let up = down = left = right = 0;
    let upDone = downDone = leftDone = rightDone = false;
    for (let k = 1 ; k < cols ; k++) {
        up += (i - k) < 0 || upDone ? 0 : 1;
        upDone = upDone || (i - k) < 0 || numArr[i - k][j] >= numArr[i][j];

        down += (i + k) >= rows || downDone ? 0 : 1;
        downDone = downDone || (i + k) >= rows || numArr[i + k][j] >= numArr[i][j];

        left += (j - k) < 0 || leftDone ? 0 : 1;
        leftDone = leftDone || (j - k) < 0 || numArr[i][j - k] >= numArr[i][j];

        right += (j + k) >= cols || rightDone ? 0 : 1;
        rightDone = rightDone || (j + k) >= cols || numArr[i][j + k] >= numArr[i][j];
    }
    return up * down * left * right;
}
//read in and check
for(let i = 1 ; i < rows - 1 ; i++) {
    for (let j = 1 ; j < cols - 1 ; j++) {
        numArr[i][j] = Number(split[i][j])
    }
}
let maxScore = 0;
for(let i = 1 ; i < rows - 1 ; i++) {
    for (let j = 1 ; j < cols - 1 ; j++) {
        boolArr[i][j] = cond(i, j);
        count += boolArr[i][j] ? 1 : 0;
        maxScore = Math.max(score(i, j), maxScore);
    }
}
console.log(count);
console.log(maxScore);

