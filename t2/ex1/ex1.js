const noms = ["Anna", "Jordi", "Laia", "Pau"];

const div = document.getElementById("container");
const ul = document.createElement("ul");

// funcion para añadir elementos a la lista
function addToList(nom) {
    const li = document.createElement("li");
    li.textContent = nom;
    ul.appendChild(li);
}

// añadimos todos los nombres a la lista
noms.forEach((nom) => {
    addToList(nom);
});

div.appendChild(ul);
