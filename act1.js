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
const user2 = new User("Chanchito", "Trist", "25 de juny de 1985", "Carrer Lluna, 123", 38, "Espanya", false);
const user3 = new User("Felipe", "Schurman", "3 de setembre de 2000", "Boulevard del sol, 456", 23, "Argentina", true);

const array = [user1, user2, user3];
array.forEach(user => {
    console.log(user);
});