class Esdeveniment { 
    constructor(name,duration,stockTickets) { 
        this.name = name; 
        this.duration = duration; 
        this.stockTickets = stockTickets;
    }
    showInfo(){
        Object.keys(this).forEach(attr => {
            console.log(this[attr]);
        });
    }
    buyTicket(requestedTickets){
        
        if(requestedTickets > 5 ){
            console.log("cant buy more than 5 tickets");
        }else { 
            if (this.stockTickets > requestedTickets ) {
                console.log("success ")
            }else{ 
                console.log("there is not enought stock for requested tickets")
            }
        }
    }
    cancelTicket(requestedTickets){ 
        this.stockTickets = this.stockTickets + requestedTickets;
        console.log("returned" + requestedTickets + "with success");
    }
}

const fury = new Esdeveniment("fury", 12, 50);

fury.showInfo();
fury.buyTicket(3); 
fury.showInfo();
fury.buyTicket(6);
fury.cancelTicket(2); 
fury.showInfo();