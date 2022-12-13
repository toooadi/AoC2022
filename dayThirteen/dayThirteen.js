const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
split = raw.replaceAll("\r", "").split("\n");
split = split.filter((str) => str.length != 0);
split = split.map((str) => str.substring(1, (str.length - 1)));
let parseList = (str, i) => {
    let stack = [];
    let currStr = "";
    let updateCurr = () => {
        if (currStr.length != 0) {
            stack.push(Number(currStr));
            currStr = "";
        }
    }
    while(i < str.length) {
        let char = str[i];
        i++;
        if (char == '[') {
            let res = parseList(str, i);
            i = res[1];
            stack.push(res[0]);
        } else if (char == ']') {
            updateCurr();
            return [stack, i];
        } else if (char == ',') {
            updateCurr();
        } else {
            currStr += char;
        }
    }
    updateCurr();
    return stack;
}
split = split.map((str) => parseList(str, 0));
let checkValid = (l1, l2) => {
    let len1 = l1.length;
    let len2 = l2.length;
    if (len1 == 0 && len2 == 0){ return -1;
    } else if (len1 == 0) { return 1;
    } else if (len2 == 0) { return 0;
    } else {
        let el1 = l1.shift();
        let el2 = l2.shift();
        let t1 = typeof el1;
        let t2 = typeof el2;
        if (t1 == "number" && t2 == "number") {
            if (el1 < el2) {return 1;}
            else if (el1 > el2) {return 0;}
            else {return checkValid(l1, l2);}
        } else if (t1 == "number" && t2 == "object") {
            let res = checkValid([el1], el2);
            return res == -1 ? checkValid(l1, l2) : res;
        } else if (t1 == "object" && t2 == "number") {
            let res = checkValid(el1, [el2]);
            return res == -1 ? checkValid(l1, l2) : res;
        } else {
            let res = checkValid(el1, el2);
            return res == -1 ? checkValid(l1, l2) : res;
        }
    }
}
resInd = 0;
for (let i = 0 ; i < split.length / 2 ; i++) {
    resInd += checkValid(split[2 * i], split[2 * i + 1]) == 1 ? (i + 1) : 0;
}
console.log(resInd);
split.push([[6]]);
let res = split.reduce((acc, lst) => checkValid(lst, [[2]]) == 1 ? acc + 1 : acc, 0) + 1;
console.log(res);

