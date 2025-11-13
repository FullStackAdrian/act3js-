// Donat el codi següent. Revisa com funciona 
// i modifica la crida del callback per fer servir 
// arrow functions

// function callback(fn, ...rest) {
//     fn(...rest);
// }
// function log(...args) {
//     console.log(args);
// }
// callback(log, 1, 2, 3, 4);

const callback = (fn, ...rest) => { 
    fn(...rest);
}; 
const log = (...args) => { 
    console.log(args);
};

callback(log, 1, 2, 3, 4);

// [1,2,3,4]
