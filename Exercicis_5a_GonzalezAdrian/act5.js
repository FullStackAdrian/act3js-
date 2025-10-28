// Escriu `ordenar(text, fn)` que passi a minúscules, elimini espais 
// i retorni (via `fn`) les lletres del 
// text  proporcionat ordenades alfabèticament.
// Pista: Fes servir mètodes tractats a l'apart d'Arrays, com join, filter,...
function ordenar(text, fn) {
    let letters = [];
    for (let letter of text) {
        letters.push(letter);
    }
    letters.sort((a, b) => a.localeCompare(b));
    return fn(letters.join(''));
}
ordenar('hola mon', console.log);
// ahlmnoo