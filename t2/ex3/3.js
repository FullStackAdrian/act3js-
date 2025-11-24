let errors = [];

function getData(form, keys) {
    const fd = new FormData(form);
    const values = [...fd.values()];
    const data = keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});

    return data;
}

function validate(data, validationRules) {
    Object.values(data).forEach((value, key) => {
        if (!validationRules[keys[key]].validate(value)) {
            errors.push(validationRules[keys[key]].message);
        }
    });
}
function listController(ul) {
    function appendItemToList(text) {
        const li = document.createElement("li");
        li.textContent = text;
        ul.appendChild(li);
        return li;
    }
    function deleteItem(li) {
        if (li in ul) {
            ul.removeChild(li);
        }
    }
    function cleanList() {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }

    return { ul, appendItemToList, deleteItem, cleanList };
}

const form = document.getElementById("form-tasca");

const keys = ["nom_tasca", "categoria_tasca", "data_tasca"];

const validationRules = {
    nom_tasca: {
        validate: (nom) => nom && nom.trim().length >= 3 && /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nom),
        message: "El nom és obligatori, mínim 3 caràcters i només alfabètic.",
    },
    categoria_tasca: {
        validate: (cat) => cat && cat.trim() !== "",
        message: "Cal seleccionar una categoria.",
    },
    data_tasca: {
        validate: (dateStr) => {
            if (!dateStr) return false;
            const parts = dateStr.split("-");
            if (parts.length !== 3) return false;
            const [yyyy, mm, dd] = parts.map(Number);
            const date = new Date(yyyy, mm - 1, dd);
            const today = new Date();
            return dateStr instanceof Date && !isNaN(dateStr) && dateStr >= today;
        },
        message: "La data és obligatòria, format DD/MM/YYYY i no pot ser anterior a l'actual.",
    },
};

const divErrors = document.getElementById("errors");
const ulErrorController = listController(document.createElement("ul"));

form.addEventListener("submit", (e) => {
    errors = [];
    ulErrorController.cleanList();
    e.preventDefault();
    const dataBeforeValidate = getData(form, keys);
    validate(dataBeforeValidate, validationRules);

    divErrors.appendChild(ulErrorController.ul);
    const liErrors = errors.length ? errors.map((err) => ulErrorController.appendItemToList(err)) : `<p style="color:green">Formulari enviat correctament!</p>`;
});
