// 22 - General
class General {
  constructor() {
    this.garantia = 1;
  }
  dObj() {
    doObj(this);
  }
}

// 4 - Función utilitaria
function doObj(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`${key} -> Valor: ${obj[key]}, Tipo: ${typeof obj[key]}`);
    }
  }
}

class Fabricant extends General {
  constructor(nom, comercial, ciutat, telf) {
    super();
    this.nom = nom;
    this.comercial = comercial;
    this.ciutat = ciutat;
    this.telf = telf;
    this.telfEmerg = 112;
  }
}

class Distribuidor extends General {
  constructor(nom, ciutat, telf, fabricant) {
    super();
    this.nom = nom;
    this.ciutat = ciutat;
    this.telf = telf;
    this.fabricant = fabricant;
  }
}

class Equip extends General {
  constructor(nom, model, fabricant, distribuidor, potencia) {
    super();
    this.nom = nom;
    this.model = model;
    this.fabricant = fabricant;
    this.distribuidor = distribuidor;
    this.potencia = potencia;
  }
}

// 2 - Instancias
let fagor = new Fabricant('Fagor', 'comercialF', 'San Sebastia', '902105011');
const zanussi = new Fabricant('Zanusi', 'comercialZ', 'Saragossa', '902105111');
const balay = new Fabricant('Balay', 'comercialB', 'Sevilla', '902105211');

const distr1 = new Distribuidor('Distrib1', 'Barcelona', 931234567, fagor);
const distr2 = new Distribuidor('Distrib2', 'Barcelona', 931234567, fagor);
const distr3 = new Distribuidor('Distrib3', 'Girona', 931234567, zanussi);

const equip1 = new Equip('rentadora', 'A24', fagor, distr1, 45);
const equip2 = new Equip('planxa', 'E4', balay, distr1, 50);
const equip3 = new Equip('aspiradora', 'B48', zanussi, distr1, 30);
const equip4 = new Equip('batedora', 'Z10', fagor, distr1, 5);

// arr
const equips = [equip1, equip2, equip3, equip4];

// 3
const distribuidorRentadora = equips.find(e => e.nom === 'rentadora').distribuidor;
console.log(distribuidorRentadora.nom + " " + distribuidorRentadora.fabricant.nom);

// 5
distr1.fabricant = zanussi;

// 6
zanussi.comercial = 'comercial_nou';
console.log(distr1.fabricant.comercial);

// 7
const distr3b = Object.create(Object.getPrototypeOf(distr3));
distr3b.fabricant = balay;
console.log(distr3.fabricant.nom);
console.log(distr3b.fabricant.nom);

// 8-9
const originalFagor = fagor;
fagor = zanussi;
console.log(fagor.nom);
fagor = originalFagor; // restaurar

// 10-11
doObj(equips);

// 12
Array.prototype.imprimir = function () {
  this.forEach(e => e.dObj());
};
equips.imprimir();

// 13-14
function sortAlf(obj, callback) {
  if (typeof callback !== 'function') {
    callback = (a, b) => a.nom.localeCompare(b.nom);
  }
  obj.sort(callback);
}

function sortNum(obj, callback) {
  if (typeof callback !== 'function') {
    callback = (a, b) => a.potencia - b.potencia;
  }
  obj.sort(callback);
}

// 15
const planxa = equips.find(e => e.nom === 'planxa');
planxa.temperaturaMax = 100;
console.log(planxa);

// 16
Equip.prototype.dataCompra = "no especificada";
console.log(planxa.dataCompra);

// 17
planxa.dataCompra = new Date().toLocaleDateString();
console.log(planxa.dataCompra);

// 18
Equip.prototype.dProp = function (prop) {
  if (this.hasOwnProperty(prop) || prop in this) {
    console.log(`${prop} -> Valor: ${this[prop]}`);
  } else {
    console.log(`${prop} no existe en ${this.nom}`);
  }
};
planxa.dProp('temperaturaMax');

// 19
delete planxa.temperaturaMax;
planxa.dProp('temperaturaMax');

// 20
delete planxa.dataCompra;
planxa.dProp('dataCompra');

// 21
delete Equip.prototype.dataCompra;
planxa.dProp('dataCompra');
equip1.dProp('dataCompra');
