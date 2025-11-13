const usuaris = [
    { edat: 17, nom: 'Nico', pla: 'premium' },
    { edat: 13, nom: 'David', pla: 'premium' },
    { edat: 32, nom: 'Mary', pla: 'free' },
    { edat: 25, nom: 'Robin', pla: 'gold' },
];



function cntPaidUsers(usrs) {
    return usrs.filter(user => user.pla !== 'free').length;
}
// literalmente lo mismo que el ejercicio anterior pero le accedes a la propiedad lenght. 
function cntAdultUsers(usrs) {
    return usrs.filter(user => user.edat >= 18).length;
}
console.log(cntPaidUsers(usuaris));
console.log(cntAdultUsers(usuaris));


//Sortida
// 3
// 2