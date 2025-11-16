const divInfo = document.getElementById("info");

// 1 
const newP = document.createElement("p");
newP.textContent = "Has accedit com a convidat";

// sin getElementById no buscas en todo el dom => mas rapido ya q ya esta en memoria.  
const oldP = divInfo.firstElementChild;
divInfo.replaceChild(newP, oldP);

// 2 
while (divInfo.firstChild) {
    divInfo.removeChild(divInfo.firstChild);
}