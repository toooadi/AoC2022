//Hardcoding the input since it's only 8 monkeys
let monkeys = [[93, 54, 69, 66, 71],
            [89, 51, 80, 66],
            [90, 92, 63, 91, 96, 63, 64],
            [65, 77],
            [76, 68, 94],
            [86, 65, 66, 97, 73, 83],
            [78],
            [89, 57, 59, 61, 87, 55, 55, 88]];
const divBy = [[7, 7, 1], [19, 5, 7], [13, 4, 3], [3, 4, 6], [2, 0, 6], [11, 2, 3], [17, 0, 1], [5, 2, 5]];
const operation = (monkeyNum, op) => (monkeyNum == 0) ? op * 3 : (monkeyNum == 1) ? op * 17 :
                            (monkeyNum == 2) ? op + 1 : (monkeyNum == 3) ? op + 2 : 
                            (monkeyNum == 4) ? op * op : (monkeyNum == 5) ? op + 8 :
                            (monkeyNum == 6) ? op + 6 : op + 7;
let activity = new Array(8).fill(0);
let bigmod = divBy.reduce((acc, curr) => acc * curr[0], 1);

for (let i = 0 ; i < 10000 ; i++) {
    for (let j = 0 ; j < monkeys.length ; j++) {
        let arr = monkeys[j];
        const items = arr.length;
        activity[j] += items;
        for (let k = 0 ; k < items ; k++) {
            let worry = arr.shift();
            worry = operation(j, worry);
            //worry = Math.floor(worry / 3);
            worry %= bigmod;
            if (worry % divBy[j][0] == 0) {
                monkeys[divBy[j][1]].push(worry);
            } else {
                monkeys[divBy[j][2]].push(worry);
            }
        }
    }
}
console.log(activity);