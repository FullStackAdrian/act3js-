
function General() {
    this.garantia = 1;
};


// agrego el doObj a el General prototype.     
General.prototype.dObj = function () {
  doObj(this);
};

function Fabricant(nom, comercial, ciutat, telf) {
  this.nom = nom;
  this.comercial = comercial;
  this.ciutat = ciutat;
  this.telf = telf;
  this.telfEmerg = 112;
}
Fabricant.prototype = Object.create(General.prototype);
Fabricant.prototype.constructor = Fabricant;

function Distribuidor(nom, ciutat, telf, fabricant) {
  this.nom = nom;
  this.ciutat = ciutat;
  this.telf = telf;
  this.fabricant = fabricant;
}
Distribuidor.prototype = Object.create(General.prototype);
Distribuidor.prototype.constructor = Distribuidor;

function Equip(nom, model, fabricant, distribuidor, potencia) {
  this.nom = nom;
  this.model = model;
  this.fabricant = fabricant;
  this.distribuidor = distribuidor;
  this.potencia = potencia;
}
Equip.prototype = Object.create(General.prototype);
Equip.prototype.constructor = Equip;

// fabricantes 
const fagor = new Fabricant('Fagor', 'comercialF', 'San Sebastia', '902105011');
const zanusi = new Fabricant('Zanusi', 'comercialZ', 'Saragosa', '902105111');
const balay = new Fabricant('Balay', 'comercialB', 'Sevilla', '902105211');
// distribuidores
const distr1 = new Distribuidor('Distrib1', 'Barcelona', 931234567, fagor);
const distr2 = new Distribuidor('Distrib2', 'Barcelona', 931234567, fagor);
const distr3 = new Distribuidor('Distrib3', 'Girona', 931234567, zanusi);
// equipos
const equip1 = new Equip('rentadora', 'A24', fagor, distr1, 45);
const equip2 = new Equip('planxa', 'E4',balay , distr1, 50);
const equip3 = new Equip('aspiradora', 'B48', zanusi, distr1, 30);
const equip4 = new Equip('batedora', 'Z10', fagor, distr1, 5);
// arr
const equips = [equip1, equip2, equip3, equip4];

// 3 
const distribuidorRentadora = equips.find(e => e.nom === 'rentadora').distribuidor;
console.log(distribuidorRentadora.nom + " " + distribuidorRentadora.fabricant.nom); 

// 4
function doObj(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const valor = obj[key];
            const tipo = typeof valor;
            console.log(key + " -> Valor: " + valor + ", Tipo: " + tipo);
        }
    }
}
doObj(equips);

// 5 
distr1.fabricant = zanusi;

// 6 
zanusi.comercial = 'comercial_nou';
console.log(distr1.fabricant.comercial);
