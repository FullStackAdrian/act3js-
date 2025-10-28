//Extén un objecte existent afegint-hi els mètodes
//  `login()` i `logout()` sense crear una classe. 
// Fes-ho mitjançant una funció que, aplicada amb `call`, 
// incorpori aquests mètodes a l'objecte rebut.

const obj = {
    nom: 'Nicolas',
};

function login(){
    console.log("loggin");
}
function logout(){
    console.log("logout");
}

console.log(obj);

// una manera es hacer obj.nombre de propiedad y asignarle la funcion existente a la propiedad
function extendre(){ 
    this.login = () => login();
    this.logut = () => login();
}
// tambien se podria hacer rollo definiendo la funcion en si 
// obj.login = function login(){
//     console.log("hola")
// };
// asi no saldria como anonimo pero si quitas el login y solo pasas function si sale como anonymous como espera la respuesta
// obj.login = function (){
//      console.log("hola")
//  };
// lo jodido es que si ya tienes creado el metodo existente a mi me gusta pasarle la funcion con un callback :  login()
// () => login() esto crearia una funcion con "() =>" donde " login() " es la accion a realizar 
// es un callback por que esta arrow function le decimos que haga login no puedes asignar la funcion directamente.
// si le pasas sin callback te dice exactamente el nombre de la funcion por lo tanto no es anonymous.   
// esto se puede hacer basicamente por que el objeto no esta ni sellado ni frezzeado 
// de lo contrario no podrias referirte a una propiedad inexistente para asignarle la funcion 

extendre.call(obj);
console.log(obj);