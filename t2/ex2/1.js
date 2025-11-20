const IMG_PATHS = ["img/gnu.jpg", "img/gnulinux.jpg", "img/linux.jpg"];

//#region  utils

function getRandomInt(number) {
    return Math.floor(Math.random() * number);
}

// devuelve el primer hijo de dentro de un elemento que coincida con el tipo
function findFirstChild(element, type) {
    for (const child of element.children) {
        if (child.tagName.toLowerCase() === type.toLowerCase()) {
            return child;
        }
    }
}

// controla la visibilidad de un elemento
function setVisibility(element, i) {
    const visibility = { 0: "visible ", 1: "hidden" };
    element.setAttribute("style", "visibility:" + visibility[i] + ";");
}

//#endregion

//#region doc
const visibilityList = document.createElement("ul");
visibilityList.textContent = "lista de invisibles";

function warnClickOnContainer() {
    alert("cal clickar a sobre l'imatge");
}

// carga el evento para la alerta de clickar sobre l'imatge
function initContainers(divs) {
    const newDivs = divs.map((div) => {
        div.addEventListener("click", (event) => {
            if (!event.target.closest("img")) {
                warnClickOnContainer();
            }
        });
        return div;
    });
    return newDivs;
}

// devuelve closure del p para mostrar las imagenes y funciones para controlar.
function createToggleAllImagesControl(body, images) {
    const pImgs = findFirstChild(body, "p");
    const toggleAllImagesElement = document.createElement("p");
    const visibilityState = { status: 0 };

    function toggleVisibility() {
        if (visibilityState.status == 0) {
            visibilityState.status = 1;
        } else {
            visibilityState.status = 0;
        }
        setVisibility(toggleAllImagesElement, visibilityState.status);
    }

    toggleAllImagesElement.addEventListener("click", () => {
        showAllImgs(images);
        toggleVisibility();
    });

    toggleVisibility();

    toggleAllImagesElement.textContent = "Mostrar totes";
    body.insertBefore(toggleAllImagesElement, pImgs);

    return { toggleAllImagesElement, toggleVisibility, visibilityState };
}

function applyHeadingStyles(h2s) {
    h2s.forEach((h2) => {
        h2.setAttribute("style", "color: #aaaaff");
    });
}

function appendInvisibleImgToList(img, toggleVisibility) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.textContent = img.src;
    btn.textContent = "mostrar";
    btn.onclick = function () {
        toggleVisibility(0);
        this.parentElement.remove();
    };
    li.appendChild(btn);
    visibilityList.appendChild(li);
}

//#endregion

//#region  images

// devuelve un closure con las imagenes y funciones para controlar la imagen.
function createImageController() {
    const imgElement = new Image(125, 125);
    const startingPathIndex = getRandomInt(IMG_PATHS.length);
    const visibilityState = { status: 0 };

    // comparte el estado de la visibilidad como evento
    const visibilityEvent = new CustomEvent("visibilityEvent", {
        detail: { img: imgElement, toggleVisibility, visibilityState },
        bubbles: true,
    });

    // cambia la visibilidad a el estado indicado y activa el evento que comparte el estado
    function toggleVisibility(i) {
        setVisibility(imgElement, i);
        visibilityState.status = i;
        dispatchEvent(visibilityEvent);
    }

    // actualiza el src y alt de la imagen
    function update(newIndex) {
        imgElement.dataset.pathIndex = newIndex;
        imgElement.src = IMG_PATHS[imgElement.dataset.pathIndex];
        imgElement.alt = IMG_PATHS[imgElement.dataset.pathIndex];
    }

    // pasa la siguiente imagen
    function next() {
        let current = Number(imgElement.dataset.pathIndex) || 0;
        let newIndex = (current + 1) % IMG_PATHS.length;
        update(newIndex);
    }

    update(startingPathIndex);

    return { imgElement, update, next, toggleVisibility, visibilityState };
}

// Crea controladores de imagen, reemplaza los elementos HTML y asigna eventos. Finalmente devuelve array de los controladores.
function initImagesControllers(images) {
    const imagesControllers = images.map((img) => {
        const imgController = createImageController();
        imgController.imgElement.addEventListener("click", () => {
            imgController.next();
        });
        imgController.imgElement.addEventListener("dblclick", () => {
            imgController.toggleVisibility(1);
        });
        img.replaceWith(imgController.imgElement);
        return imgController;
    });
    return imagesControllers;
}

// activa la visibilidad de todas las imagenes.
function showAllImgs(imgs) {
    imgs.forEach((img) => {
        img.toggleVisibility(0);
    });
}

//#endregion

//#region  app

const initApp = () => {
    // obtengo body
    const body = document.querySelector("body");
    // inicializo y obtengo los controladores.
    const imageContainers = initContainers(Array.from(document.querySelectorAll("body > div:has(h2):has(img)")));
    // De cada div obtengo el hijo de tipo deseado , lo hago array e inicializo u obtengo.
    // por que ? --> Es mas rapido por que ya tienes los divs en memoria, no tienes que buscar en el dom (lento)
    const imagesControllers = initImagesControllers(Array.from(imageContainers).map((div) => findFirstChild(div, "img")));
    const headings = Array.from(imageContainers).map((div) => findFirstChild(div, "h2"));

    applyHeadingStyles(headings);

    const toggleImagesPButton = createToggleAllImagesControl(body, imagesControllers);
    window.addEventListener("visibilityEvent", (e) => {
        if (e.detail.visibilityState.status !== 0) {
            appendInvisibleImgToList(e.detail.img, e.detail.toggleVisibility);
            if (toggleImagesPButton.visibilityState.status !== 0) {
                toggleImagesPButton.toggleVisibility();
            }
        }
    });
    body.appendChild(visibilityList);
};

//#endregion

document.addEventListener("DOMContentLoaded", initApp);
