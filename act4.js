class Esdeveniment { 
    #stockTickets;
    constructor(name,duration,stockTickets) { 
        this.name = name; 
        this.duration = duration; 
        this.#stockTickets = stockTickets;
    }
    #getStockTickets(){
        console.log(this.#stockTickets);
        return this.#stockTickets;
    }
    showInfo(){
        Object.keys(this).forEach(attr => {
            console.log(this[attr]);
        });
        this.#getStockTickets();
    }
    buyTicket(requestedTickets){
        
        if(requestedTickets > 5 ){
            console.log("cant buy more than 5 tickets");
        }else { 
            if (this.#stockTickets > requestedTickets ) {
                this.#stockTickets -= requestedTickets;
                console.log("success ");
            }else{ 
                console.log("there is not enought stock for requested tickets");
            }
        }
        this.showInfo();
    }
    cancelTicket(requestedTickets){ 
        this.#stockTickets +=  requestedTickets;
        console.log("returned " + requestedTickets + " with success");
        this.showInfo();
    }
}

const fury = new Esdeveniment("fury", 12, 50);

fury.showInfo();
fury.buyTicket(3); 
fury.stockTickets = 100;
fury.cancelTicket(1); 

// cuando muestra 100 es por que ha creado una propiedad y la asigna a fury con el mismo nombre.
// para que nose agregue la propiedad cuando haces fury.stockTickets sin referenciar a la propiedad privada
// por que si no revienta. Puedes hacer Object.seal(this) dentro del constructor. 
// esto es por que sella el objeto de manera que no permite añadir ni eliminar. 
// del contrario a frezze permite modificar y enumerar propiedades existentes, obviamente publicas. 
// frezze no permite estas y ademas tampoco permite modificar configuraciones, ni valores de propiedades. 