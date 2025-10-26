class Attack {
    constructor(name, damage, staminaCost) {
        this.name = name;
        this.damage = damage;
        this.staminaCost = staminaCost;
    }
}

class Card {
    life = true;
    constructor(name, lifePoint, type, attacks, weaknes) {
        this.name = name;
        this.lifePoint = lifePoint;
        this.type = type;
        this.attacks = attacks;
        this.stamina = 0;
        this.weaknes = weaknes;
    }
    executeAttack(name) {
        if (this.attacks[name] && this.stamina > this.attacks[name].staminaCost && this.life ) {
            this.stamina -= this.attacks[name].staminaCost;
            console.log(`${this.name} used ${name} and dealt ${this.attacks[name].damage} damage`);
        }else {
            console.log("not enough stamina or attack not found");
        }
    }
    getDamaged(damage) {
        if (this.lifePoint <= 0) {
            this.life = false;
            console.log(this.name + " has died, cant damage a dead card");
        }else{
            this.lifePoint -= damage;
            console.log("got damaged with success");
        }
    }
    addStamina(stamina) {
        this.stamina += stamina;
        console.log("stamina added with success");
    }
}

const dracDeFoc = new Card("Drac de Foc", 100, "Foc", {
    "Cridada": new Attack("Cridada", 30, 2),
    "Cop Ígnic": new Attack("Cop Ígnic", 50, 3)
}, ["Aigua"]); 

const serpAquàtica = new Card("Serp Aquàtica", 120, "Aigua", {
    "Tsunami": new Attack("Tsunami", 40, 2)
}, ["Elèctric"]);

dracDeFoc.addStamina(5);
serpAquàtica.addStamina( 5);

dracDeFoc.executeAttack("Cridada", serpAquàtica.getDamaged);
serpAquàtica.executeAttack("Tsunami", dracDeFoc.getDamaged);
