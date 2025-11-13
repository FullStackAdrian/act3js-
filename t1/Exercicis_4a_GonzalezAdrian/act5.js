const usuaris = [
    { edat: 17, nom: 'Nico', pla: 'premium' },
    { edat: 13, nom: 'David', pla: 'premium' },
    { edat: 32, nom: 'Mary', pla: 'free' },
    { edat: 25, nom: 'Robin', pla: 'gold' },
];
// inicialmente hice esto por que no sabia cual era el metodo y pues para pensar un poquito. 
// function getOldest(arr){
//     let oldest = arr[0]; 
//     arr.forEach(user => {
//         if (oldest.edat < user.edat ) {
//             oldest = user;
//         }
//     });
//     return oldest;
// }

// luego pregunte al chat por metodos que me facilitaran esto, me hablo de hacer un reduce y find 
// find si lo habia usado, reduce no, deduzco que el ejercicio estaba planteado para reduce por que lo escuche en clase
// igual dejo comentado como lo haria con find por que me parece interesante
// function getOldest(arr) {
//   const maxAge = Math.max(...arr.map(u => u.edat));
//   return arr.find(u => u.edat === maxAge);
// }

// puede que sea menos eficiente por que recorre la array dos veces una con map 
// y otra con find donde busca segun el valor encontrado de maxAge, supongo que si reduce lo hace todo en un bucle es mas rapido y mejor. 

// este es el de reduce que me dio el chat a mi en lo personal no me gusta que devuelva un ternario se me hace poco legible 
// no me parece muy clean code 
// function getOldest(arr) {
//   return arr.reduce((oldest, user) => 
//     user.edat > oldest.edat ? user : oldest
//   );
// }
// a esta guapo se le pasa un callback 
function getOldest(arr){
    const oldest = arr.reduce((oldest, user) => { 
        if (oldest.edat < user.edat ) {
            oldest = user;
        }
        return oldest;
    });
    return oldest;
}

const oldest = getOldest(usuaris);
console.log(oldest);
// Sortida 
// { edat: 32, nom: 'Mary', pla: 'free' }