class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
        this.files = [];
        this.size = 0;
    }
    addFile(n, s) {
        this.files.push({name:n, size:s});
        let curr = this;
        curr.size += s;
        while (curr.parent != null) {
            curr = curr.parent;
            curr.size += s; 
        }
    }
    addChild(name) {
        let child = new Directory(name, this);
        this.children.push(child);
    }
    getChild(name) {
        let res = this.children.filter((ch) => ch.name == name);
        return res.length == 0 ? null : res[0];
    }
}

const fs = require("fs");
let raw = fs.readFileSync("taskOne.txt", "utf8");
cmds = raw.replaceAll("\r", "");
cmds = cmds.split("$ ");
cmds = cmds.slice(2);
let curr = new Directory("/", null);
let root = curr;
for (const str of cmds) {
    //console.log(str);
    let tmp = str.split("\n");
    let cmd = tmp[0].slice(0, 2);
    if (cmd == "cd") {
        tmp = tmp[0].split(" ");
        curr = tmp[1] == ".." ? curr.parent : curr.getChild(tmp[1]);
    } else {
        tmp = tmp.slice(1);
        for (const ent of tmp) {
            let args = ent.split(" ");
            if (args[0] == "dir") {
                curr.addChild(args[1]);
            } else {
                curr.addFile(args[1], Number(args[0]))
            }
        }
    }
}
//Go back to root
curr = root;
let sizeSmallDirs = (node) => {
    let fromChildren = node.children.reduce((acc, elem) => acc + sizeSmallDirs(elem), 0);
    return node.size <= 100000 ? node.size + fromChildren : fromChildren;
}
console.log(sizeSmallDirs(curr));

curr = root;
let sizetoFree = 30000000 - (70000000 - curr.size);
let sizeLUB = (node) => {
    let fromChildren = node.children.reduce((acc, elem) => {const res = sizeLUB(elem); return (res < acc && res >= sizetoFree) ? res : acc;}, root.size);
    return (node.size < fromChildren && node.size >= sizetoFree) ? node.size : fromChildren;
}
console.log(sizeLUB(curr));
