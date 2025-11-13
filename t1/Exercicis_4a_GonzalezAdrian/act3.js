const usuaris = [
    {edat: 17, nom: 'Nico', pla: 'premium'},
    {edat: 13, nom: 'Martin', pla: 'free'},
    {edat: 32, nom: 'Mary', pla: 'free'},
    {edat: 25, nom: 'Robin', pla: 'gold'},
];

// filter es un metodo para que de cada elemento de la array devuelva en base a la condicion que le pongas
function getPaidUsers(usrs){
    return usrs.filter(user => user.pla !== 'free');
}

function getAdultUsers(usrs){
    return usrs.filter(user => user.edat >= 18);
}

console.log(getPaidUsers(usuaris));
console.log(getAdultUsers(usuaris));


//Sortida
// Només usuaris de pagament
// [
//   { edat: 17, nom: 'Nico', pla: 'premium' },
//   { edat: 25, nom: 'Robin', pla: 'gold' }
// ]

// // Només usuris Adults
// [
//   { edat: 32, nom: 'Mary', pla: 'free' },
//   { edat: 25, nom: 'Robin', pla: 'gold' }
// ]