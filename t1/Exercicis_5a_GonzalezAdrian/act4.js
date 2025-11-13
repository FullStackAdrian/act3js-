// Implementa la funció `suma(fn, ...rest)` que sumi tots
//  els nombres rebuts i retorni el resultat a la `fn`
//  passada com a callback.
const resultat = (...rest) => {
    let resultat = 0;
    rest.forEach((n) => {
        resultat += n;
    });
    return resultat;
};

function suma(fn, ...rest) {
    return fn(...rest);
}

console.log("La resposta es: " + suma(resultat , 1, 2, 3, 4, 5, 6));
// 15