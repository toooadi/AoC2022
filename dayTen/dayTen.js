const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
raw = raw.replaceAll("\r", "");
let split = raw.split("\n");
split = split.map((str) => str.split(" "));
let cycle = 1;
let reg = 1;
let res = 0;
let str = "";
for (let i = 0 ; i < split.length ; i++) {
    let cmd = split[i][0];
    let mod = (cycle - 1) % 40;
    if (cmd == "noop") {
        if(cycle % 40 == 20 && cycle <= 220) {
            res += cycle * reg;
        }
        str += Math.abs(mod - reg) <= 1 ? "#" : "."; 
        str += mod == 39 ? "\n" : "";
        
        cycle++;
    } else {
        if(cycle % 40 == 20 && cycle <= 220) {
            res += cycle * reg;
        } else if ((cycle + 1) % 40 == 20 && (cycle + 1) <= 220) {
            res += (cycle + 1) * reg;
        }
        let plusmod = cycle % 40;
        str += Math.abs(mod - reg) <= 1 ? "#" : ".";
        str += mod == 39 ? "\n" : "";
        str += Math.abs(plusmod - reg) <= 1 ? "#" : ".";
        str += plusmod == 39 ? "\n" : "";
        cycle += 2;
        reg += Number(split[i][1]);
    }
}
console.log(res);
console.log(str);