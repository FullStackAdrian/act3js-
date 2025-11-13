// Implementa `extendre(user)` que afegeixi a l’objecte rebut 
// els mètodes `login()` i `logout()`
//  i en retorni la versió ampliada.
// Pista: Crea els mètodes i fes servir Object.assign
const obj = {
    name: 'Nicolas',
};
function login(){
    console.log( this.name + " is login");
}
function logout(){
    console.log( this.name + " is logout");
} 
// si no haces el call no tienes el contexto de this para el nombre no puedes definir los nombres fuera de extendre
// es diferente al enunciado de clase
function extendre(user) {
    user.login = () => login.call(user);
    user.logout = () => logout.call(user);
    return Object.assign({},user);
};

const usuari = extendre(obj);
console.log(usuari);
usuari.login();