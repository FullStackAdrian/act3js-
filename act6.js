class Card {
    constructor(name, lifePoint, type, attackDamage, stamina, weaknes ){ 
        this.name = name; 
        this.lifePoint = lifePoint; 
        this.type = type; 
        this.attackDamage = attackDamage; 
        this.stamina = stamina; 
        this.weaknes = weaknes;
    }
    attack(getDamaged){
        if (this.name && this.stamina > user.stamina && victim ) {
            user.stamina -= this.stamina;
            getDamaged();
            console.log("realized attack with success");
        }
    }

}