const form = document.getElementById("form-validacio");

// dado un form y unas keys te da un obj data.
function getData(form, keys) {
    const fd = new FormData(form);
    const values = [...fd.values()];
    const data = keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});
    return data;
}

function validate(data) {

    const errors = [];

    if (!data.nom || data.nom.length < 3) {
        errors.push("El nom és obligatori i ha de tenir mínim 3 caràcters.");
    }

    if (!(data.edat > 0)) {
        errors.push("L'edat ha de ser un número major que 0.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("L'email no té un format vàlid.");

    }

    if (url && !/^https?:\/\/[^\s]+$/i.test(data.url)) {
        errors.push("La URL no té un format vàlid.");
    }

    const div = document.getElementById("errors");
    div.innerHTML = errors.length
        ? `<ul>${errors.map(err => `<li>${err}</li>`).join("")}</ul>`
        : `<p style="color:green">Formulari enviat correctament!</p>`;

}

// las keys del formulario que queremos validar.
const keys = ["nom ",
    "edat",
    "emai",
    "url "];


form.addEventListener("submit", e => {
    e.preventDefault();
    const data = getData(form, keys);
    validate(data);
});
