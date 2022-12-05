const fs = require("fs");
function getPriority(ch) {
    let num = ch.charCodeAt(0);
    if (ch.toUpperCase() == ch) {
        return num - 38;
    } else {
        return num - 96;
    }
}

let raw = fs.readFileSync("taskOne.txt", "utf8");
let split = raw.split("\n");
split = split.map((str) => str.replace('\r', ''));
let unshiftAndGet = (arr, el) => {arr.unshift(el); return arr;};
let innerUnshiftAndGet = (arr, el) => {arr[0].unshift(el); return arr;};
split = split.reduce((acc, curr, i) => i % 3 == 0 ? unshiftAndGet(acc, [curr]) : innerUnshiftAndGet(acc, curr), []);
let findDupPrio = (str1, str2, str3) => {
    const iter = str1[Symbol.iterator]();
    let theChar = iter.next();
    while (!theChar.done) {
        if (str2.includes(theChar.value) && str3.includes(theChar.value)) {
            return getPriority(theChar.value);
        }
        theChar = iter.next();
    }
    return 0;
}
let res = split.reduce((acc, strs) => acc + findDupPrio(strs[0], strs[1], strs[2]), 0);
console.log(res);