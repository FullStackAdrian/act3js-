const usuaris = [
    { edat: 17, nom: 'Nico', pla: 'premium' },
    { edat: 13, nom: 'David', pla: 'free' },
    { edat: 32, nom: 'Mary', pla: 'free' },
    { edat: 25, nom: 'Robin', pla: 'gold' },
];

const users = [
    { age: 27, name: 'Liam', membership: 'premium' },
    { age: 22, name: 'Emma', membership: 'free' },
    { age: 29, name: 'James', membership: 'free' },
    { age: 23, name: 'Olivia', membership: 'gold' },
];
// Unificar les estructures d'usuaris i user 
// canviar les propietats en català
// fusionar els arrays
// Ordenar per edat
// Crear plantilla HTML

// le pasamos las arrays 1 y 2 a mergear, donde arr1 es la que prevalece, le pasamos props
// los props son las keys de las dos arrays ordenados
// se ordenan asi [edat, age], [nom, edat], [pla, membership] donde el primero sera el que prevalece. 
// en este caso no haria falta pero si en el objeto estuviera desordenado y quiseras mezclar no podrias. 

function mergeArr(arr1, arr2, props) {
    arr2.map((el) => {
        const newEl = {};
        props.forEach(prop => {
            newEl[prop[0]] = el[prop[1]];
        });
        return newEl;
    }).forEach(el => {
        arr1.push(el);
    });
    return arr1;
}

const propsToMap = [
  ['edat', 'age'],
  ['nom', 'name'],
  ['pla', 'membership']
];

const arr1 = mergeArr(usuaris, users, propsToMap );
console.log(arr1);

function llistarHtml(arr) {

}

//console.log(html);
//document.writeln(html)




// <li> Nom: nom, Edat: edat</li>
// Imprimir la llista