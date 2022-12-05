const fs = require("fs");

let raw = fs.readFileSync("taskOne.txt", "utf8");

let split = raw.split("\n");
let tuples = split.map((str) => [str[0], str[2] == 'X' ? 'A' : (str[2] == 'Y' ? 'B' : 'C')]);
let roundScore = ([other, own]) => {
    let shapeScore = (own == 'A') ? 1 : ((own == 'B') ? 2 : 3);
    if (other == own) {
        return shapeScore + 3;
    } else if (other == 'A' && own == 'B' || other == 'B' && own == 'C' || other == 'C' && own == 'A') {
        return shapeScore + 6;
    } else {
        return shapeScore;
    }
}
let p2roundScore = ([other, own]) => {
    if (own == 'A') {
        let shapeScore = 0;
        if (other == 'A') {
            shapeScore = 3;
        } else if (other == 'B') {
            shapeScore = 1;
        } else {
            shapeScore = 2;
        }
        return shapeScore;
    } else if (own == 'B') {
        if (other == 'A') {
            shapeScore = 1;
        } else if (other == 'B') {
            shapeScore = 2;
        } else {
            shapeScore = 3;
        }
        return shapeScore + 3;
    } else {
        if (other == 'A') {
            shapeScore = 2;
        } else if (other == 'B') {
            shapeScore = 3;
        } else {
            shapeScore = 1;
        }
        return shapeScore + 6;
    }
}
let res = tuples.reduce((acc, curr) => roundScore(curr) + acc, 0);
let res2 = tuples.reduce((acc, curr) => p2roundScore(curr) + acc, 0);
console.log(res);
console.log(res2);