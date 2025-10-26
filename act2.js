class User {
    constructor(nom, alias, dataNaixement, adresa, edat, paisNaixement, suscripcio) {
        this.nom = nom;
        this.alias = alias; 
        this.dataNaixement = dataNaixement; 
        this.adresa = adresa; 
        this.edat = edat; 
        this.paisNaixement = paisNaixement;
        this.suscripcio = suscripcio;
    }
}
const user1 = new User("Chanchito", "Feliz", "10 d'abril de 1992", "Av. Siempre Viva, 742", 31, "Mexic", true);
const attrsToRemove = ["adresa", "alsada"];

console.log(user1);

attrsToRemove.forEach(attr => {
    if(attr in user1){
        delete user1[attr]
    }
});

if ("suscripcio" in user1) {
    user1.suscripcio = !user1.suscripcio
}

console.log(user1);