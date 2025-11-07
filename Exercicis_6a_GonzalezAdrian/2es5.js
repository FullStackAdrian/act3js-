function Fabricant(nom, comercial, ciutat, telf) {
  this.nom = nom;
  this.comercial = comercial;
  this.ciutat = ciutat;
  this.telf = telf;
  this.telfEmerg = 112;
}

function Distribuidor(nom, ciutat, telf, fabricant) {
  this.nom = nom;
  this.ciutat = ciutat;
  this.telf = telf;
  this.fabricant = fabricant;
}

function Equip(nom, model, fabricant, distribuidor, potencia) {
  this.nom = nom;
  this.model = model;
  this.fabricant = fabricant;
  this.distribuidor = distribuidor;
  this.potencia = potencia;
}

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

function General() {
    this.garantia = 1;
};

// do obj
General.prototype.dObj = function () {
  dObj(this);
};




