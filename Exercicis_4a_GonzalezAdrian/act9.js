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


// me plante el ejercicio que si estuviera desordenadas las arrays no importara
// asi que hice props para traducir, los props que no traduces no se añaden. 
const propsToMap = [
    ['edat', 'age'],
    ['nom', 'name'],
    ['pla', 'membership']
];
// le pasas la array que quieres añadirle los valores, la que quieres traducir, y los props para ello. 
function doArr(arr1, arr2, props) {
    // traducimos
    arr2.map((el) => {
        const newEl = {};
        props.forEach(prop => {
            newEl[prop[0]] = el[prop[1]];
        });
        return newEl;
        // en el foreach pues unificamos
    }).forEach(el => {
        arr1.push(el);
    });
    // ordenamos 
    return arr1.sort((a, b) => a['edat'] - b['edat']);
}

const arr1 = mergeArr(usuaris, users, propsToMap);
console.log(arr1);

function llistarHtml(arr) {
    arr.forEach((el) => {
        const li = document.createElement("li");
        li.textContent = el; 
    });
};

//console.log(html);
//document.writeln(html)
// <li> Nom: nom, Edat: edat</li>
// Imprimir la llista