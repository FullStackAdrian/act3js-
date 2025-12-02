//#region  form functions
function getData(form, keys) {
    const fd = new FormData(form);
    const values = [...fd.values()];
    const data = keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});

    return data;
}

function validate(data, validationRules, errors) {
    Object.values(data).forEach((value, key) => {
        if (!validationRules[keys[key]].validate(value)) {
            errors.push(validationRules[keys[key]].message);
        }
    });
}
//#endregion

function removeAllChildrens(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function listController(ul) {
    function appendItemToList(data, keys) {
        const li = document.createElement("li");
        if (keys !== null) {
            keys.forEach(key => {
                const text = data[key];
                console.log(text);
                li.textContent += " " + text;
            });
        } else {
            data.forEach(text => {
                li.textContent += " " + text;
            });
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener('click', () => deleteItem(li));

        li.appendChild(deleteButton);
        ul.appendChild(li);

        return li;
    }
    function deleteItem(li) {
        ul.removeChild(li);
    }
    function cleanList() {
        removeAllChildrens(ul);
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
            if (isNaN(date)) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        },
        message: "La data és obligatòria, format DD/MM/YYYY i no pot ser anterior a l'actual.",
    },
};

// get taskList and  error divs
const divLListaTascas = document.getElementById("llistaTasques");
const divErrors = document.getElementById("errors");

// create the unordered lists controller
const ulTascaController = listController(document.createElement("ul"));
const ulErrorController = listController(document.createElement("ul"));

divLListaTascas.appendChild(ulTascaController.ul);
divErrors.appendChild(ulErrorController.ul);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];
    ulErrorController.cleanList();
    removeAllChildrens(divErrors);

    // get data and validate
    const data = getData(form, keys);
    validate(data, validationRules);

    const liErrors = errors.length ? ulErrorController.getAllLi() : null;
    // ulErrorController.appendItemToList(validationRules[keys[key]].message);

    // if theres no errors append success message.
    if (liErrors === null) {
        const pSuccessSubmit = document.createElement("p");
        pSuccessSubmit.textContent = "Formulari enviat correctament!";
        divErrors.appendChild(pSuccessSubmit);

        ulTascaController.appendItemToList(data, keys);
    }
});
