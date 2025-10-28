// Implementa la funció `suma(fn, ...rest)` que sumi tots
//  els nombres rebuts i retorni el resultat a la `fn`
//  passada com a callback.
function suma(fn, ...rest) {
    fn = () =>  {
        const resultat = 0;
        rest.forEach(n => {
            resultat += n;
        });
        return resultat;
    }
    console.log(fn());
}

// suma(resultat => {
//     console.log(resultat);
// 
// }, 1, 2, 3, 4, 5)
suma();
// 15