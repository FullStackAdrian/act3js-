function log(...params){
    console.log(...params)
}
// 1 
const rectangle1 = {
    costat1: 2, 
    costat2: 3, 
    area() { 
        return this.costat1 * this.costat2;
    }, 
    perimetre() { 
        return this.costat1 *2 + this.costat2 * 2;
    }
}; 
// 2 hago un arrow func en vez de setear con prototype, me es mas legible. 
function Rectangle2(costat1, costat2){
    this.costat1 = costat1;
    this.costat2 = costat2; 
    this.area = () => { 
        return costat1 * costat2;
    };
    this.perimetre = () => {
        return costat1 * 2 + costat2 * 2 ;
    }
}

const rectangle2 = new Rectangle2(5, 3 );

// 3 
function Rectangle3() { }
Rectangle3.prototype.costat1 = 10;
Rectangle3.prototype.costat2 = 20;
Rectangle3.prototype.area = function () { 
  return this.costat1 * this.costat2; 
};
Rectangle3.prototype.perimetre = function () { 
  return 2 * (this.costat1 + this.costat2); 
};

// la funcion verificar la copio xd 

function verificar() {
  log("== rectangle1 ==");
  log("costats:", rectangle1.costat1, rectangle1.costat2);
  log("àrea:", rectangle1.area(), "perímetre:", rectangle1.perimetre());
  log(rectangle1);
  log("\n== rectangle2 ==");
  const rectangle2 = new Rectangle2(2, 3);
  log("costats:", rectangle2.costat1, rectangle2.costat2);
  log("àrea:", rectangle2.area(), "perímetre:", rectangle2.perimetre());
  log(rectangle2);
  log("\n== rectangle3 (per defecte) ==");
  const rectangle3 = new Rectangle3();
  log("costats:", rectangle3.costat1, rectangle3.costat2);
  log("àrea:", rectangle3.area(), "perímetre:", rectangle3.perimetre());

  log("\n== rectangle3 (modificat a 4 i 5) ==");
  rectangle3.costat1 = 4;
  rectangle3.costat2 = 5;
  log("costats:", rectangle3.costat1, rectangle3.costat2);
  log("àrea:", rectangle3.area(), "perímetre:", rectangle3.perimetre());
  log(rectangle3);
  return { rectangle1, rectangle2, rectangle3 };
}


verificar();

