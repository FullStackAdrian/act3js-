const myArray = [
  "Hola",
  12,
  "Món",
  {},
  { id: 15 },
  ['lala'],
];

// nombres, strings, objectes
function divideixPerTipus(arr) {
  const result = {};
  arr.forEach((element) => {
    // guardamos el typeOf para usarlo de clave
    const type = typeof element;
    // si en el objeto que hemos creado no esta el tipo pues le hago una array para ese tipo
    if (!result[type]) {
      result[type] = [];
    }
    // y le meto el valor 
    result[type].push(element);
  });
  // lo devuelvo facil 
  return result;
}
console.log(divideixPerTipus(myArray));
// Sortida:
// {
//   nombres: [ 12 ],
//   strings: [ 'Hola', 'Món' ],
//   objectes: [ {}, { id: 15 }, [ 'lala' ] ]
// }
// no sale nombres arriba por que no ordeno nada simplemente lo guardo en el orden del tipo que me ecnuentro