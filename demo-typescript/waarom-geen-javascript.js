
// @ts-check

let x  = '14';
x = 'qwert';
x = {};
x = [];
x = undefined;

function getLocation(address) {
    
}

let obj = {
    qwertyuiop: 24,
    y: 'hoi'
};
obj.z = 'nog iets';
delete obj.y;


console.log(obj.qwertyuiop);
console.log(obj['qwertyuiop']);
let prop = 'x';
console.log(obj[prop]);