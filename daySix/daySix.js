const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replace("\r", "");
let it = raw.substring(0, 14);
let setString = (str) => {
    let ret = "";
    for(let i = 0; i < str.length ; i++) {
        if (!ret.includes(str[i])) {ret = ret.concat(str[i]);}
    }
    return ret;
}
let readChars = 14;
while (setString(it).length < 14) {
    it = it.substring(1, 14).concat(raw[readChars]);
    readChars++;
}
console.log(readChars);