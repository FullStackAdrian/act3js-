const myArray = ["Hola", 12, true, "Món", {}, { id: 15 }, ["lala"]];

// nombres, strings, objectes,boolean
// Fes la funció amb reduce

// me salio asi sin reduce y entendi como hacerlo con reduce
// function divideixPerTipus(arr) {
//     const res = {};
//     arr.forEach(el => {
//         const typeOf = typeof el;
//         if (!res[typeOf]) {
//             res[typeOf] = [el];
//         }else{
//            res[typeOf].push(el);
//         }
//     })
//     console.log(res);
//     return res;
// }

function divideixPerTipus(arr) {
    const res = arr.reduce((res, el) => {
        const typeOf = typeof el;
        if (!res[typeOf]) {
            res[typeOf] = [el];
        } else {
            res[typeOf].push(el);
        }
        return res;
    });
}

let arr = divideixPerTipus(myArray);
console.log(arr);
/**
 * {
  string: [ 'Hola', 'Món' ],
  number: [ 12 ],
  boolean: [ true ],
  object: [ {}, { id: 15 }, [ 'lala' ] ]
}

 */
