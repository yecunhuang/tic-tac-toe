const arr = [['a'],['b']];
const c = arr.concat(['c']);
console.log(c);


function tellMe(){
    let a=10;
    let b=11;
    let c=12;

    return [a,b,c];
}

let d =tellMe();
console.log(d);