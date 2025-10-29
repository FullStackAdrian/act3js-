const myArray = [
    "Hola",
    12,
    true,
    "Món",
    {},
    { id: 15 },
    ['lala'],
]

// nombres, strings, objectes,boolean
// Fes la funció amb reduce
function divideixPerTipus(arr) {
   
    arr.reduce((res, el) => {
        const typeOf = typeof el;
        if (!typeOf in res) {
            res.push(typeOf);
        }
        console.log(res + " " + typeOf ); 
    })
    return res;
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