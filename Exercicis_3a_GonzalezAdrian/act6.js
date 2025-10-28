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
    couldDie() {
        if (this.lifePoint <= 0) {
            this.life = false;
            console.log(this.name + ' has died.');
        }
    }
    executeAttack(name, makeDamage) {
        // aqui hago el check de si tiene stamina y si esta vivo y si el ataque existe
        if (this.attacks[name] && this.stamina >= this.attacks[name].staminaCost && this.life) {
            this.stamina -= this.attacks[name].staminaCost;
            console.log(this.name + ' tryied to executed attack ' + name);
            makeDamage(this.attacks[name].damage);
        } else {
            // aqui estoy checkeando que si ha muerto no diga que no tiene stamina
            this.life ? null : console.log(this.name + ' has not enough stamina ');
            // no printeo que esta muerto porque cuando muere ya lo printea 
        }
    }
    getDamaged(damage) {
        this.lifePoint -= damage;
        console.log(this.name + ' got damaged ' + damage + ' points, remaining life: ' + this.lifePoint);
        this.couldDie();
    }
    addStamina(stamina) {
        this.stamina += stamina;
        console.log(this.name + ' added ' + stamina + ' stamina with success');
    }
}

const dracDeFoc = new Card(
    'Drac de Foc',
    100,
    'Foc',
    {
        Cridada: new Attack('Cridada', 30, 2),
        'Cop Ígnic': new Attack('Cop Ígnic', 50, 3),
    },
    ['Aigua'],
);

const serpAquàtica = new Card(
    'Serp Aquàtica',
    120,
    'Aigua',
    {
        Tsunami: new Attack('Tsunami', 40, 2),
    },
    ['Elèctric'],
);

while (dracDeFoc.life && serpAquàtica.life) {
    console.log('----- new round -----');
    dracDeFoc.executeAttack('Cridada', (damage) => serpAquàtica.getDamaged(damage));
    serpAquàtica.executeAttack('Tsunami', (damage) => dracDeFoc.getDamaged(damage));
    console.log('---------------------');
    dracDeFoc.addStamina(3);
    serpAquàtica.addStamina(3);
    console.log('---------------------');
}
