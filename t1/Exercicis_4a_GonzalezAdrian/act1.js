
function valorsAbsoluts(arr) {
    // lo que hace map es por cada elemento del array sacar el elemento
    // al elemento le puesto num y lee dice que haga de la clase Math el method estatico abs
    // basicamente para sacar el valor absoluto de cada numero del array
    // map devuelve un nuevo array con los valores absolutos Xd 
    const absValues = arr.map(num => Math.abs(num));
    console.log(absValues);
    return absValues;
}
const nombres = [-2, 3, 5, -15];
valorsAbsoluts(nombres);

// Cridar la funció
//Mostrar
// Sortida
//[2,3,5,15];