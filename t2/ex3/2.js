const form = document.getElementById("form-validacio");

// dado un form y unas keys te da un obj data.
function getData(form, keys) {
    // const fd = new FormData(form);
    // const values = [...fd.values()];
    // const data = keys.reduce((obj, key, i) => {
    //     obj[key] = values[i];
    //     return obj;
    // }, {});
    
    const nom = document.getElementById("nom2").value.trim();
    const edat = Number(document.getElementById("edat2").value);
    const email = document.getElementById("email2").value.trim();
    const url = document.getElementById("url").value.trim();

    const data = { nom: nom, edat: edat, email: email, url: url}
    return data;
}

function validate(data) {

    const errors = [];
    console.log(data.nom);
    if (!data.nom || data.nom.length < 3) {
        errors.push("El nom és obligatori i ha de tenir mínim 3 caràcters.");
    }
    if (!data.edat > 0) {
        errors.push("L'edat ha de ser un número major que 0.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("L'email no té un format vàlid.");

    }
    if (data.url && !/^https?:\/\/[^\s]+$/i.test(data.url)) {
        errors.push("La URL no té un format vàlid.");
    }

    const div = document.getElementById("errors");
    div.innerHTML = errors.length
        ? `<ul>${errors.map(err => `<li>${err}</li>`).join("")}</ul>`
        : `<p style="color:green">Formulari enviat correctament!</p>`;

}

// las keys del formulario que queremos validar.
const keys = ["nom",
    "edat",
    "email",
    "url"
];

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = getData(form, keys);
    validate(data);
});
