const productes = [
    { nom: "Ordinador", preu: 850 },
    { nom: "Teclat", preu: 40 },
    { nom: "Ratolí", preu: 25 },
];

const div = document.getElementById("container");
const table = document.createElement("table");
// add elements arg, in a tr and append to table
function addTr(tbase, tds) {
    const tr = document.createElement("tr");
    tds.forEach((td) => {
        tr.appendChild(td);
    });
    tbase.appendChild(tr);
}
// prepare and return a td for append in a tr
function returnTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
}

// thead
const thead = document.createElement("thead");

// preparamos el th para nom y preu
const thnom = document.createElement("th");
thnom.textContent = "nom";
const thpreu = document.createElement("th");
thpreu.textContent = "preu";

// le meto al thead los th
addTr(thead, [thnom, thpreu]);

// creamos tbody y le metemos las tr
const tbody = document.createElement("tbody");
productes.forEach((producte) => {
    // pasamos las props de producte a tds
    // values da array de las props map devuelve array de td
    const tds = Object.values(producte).map((v) => returnTd(v));
    addTr(tbody, tds);
});

// le meto al table el thead
table.appendChild(thead);

// metemos el tbody al table
table.appendChild(tbody);

// metemos la tabla al div
div.appendChild(table);
