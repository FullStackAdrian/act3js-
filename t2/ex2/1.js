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

function setVisibility(element, i) {
    const visibility = { 0: "visible ", 1: "hidden" };
    element.setAttribute("style", "visibility:" + visibility[i] + ";");
}

//#endregion

//#region doc

function warnClickOnContainer() {
    alert("cal clickar a sobre l'imatge");
}

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

function createToggleAllImagesControl(body, images) {
    const pImgs = findFirstChild(body, "p");
    const toggleAllImgsEl = document.createElement("p");
    const visibilityState = { status: 0 };

    toggleAllImgsEl.textContent = "Mostrar totes";

    toggleAllImgsEl.addEventListener("click", () => {
        showAllImgs(images);
        toggleVisibility();
    });
    
    function toggleVisibility() {
        if (visibilityState.status == 0) {
            visibilityState.status = 1; 
        }else {
            visibilityState.status = 0;
        }
        setVisibility(toggleAllImgsEl, visibilityState.status);
    }

    toggleVisibility();
    body.insertBefore(toggleAllImgsEl, pImgs);
    return {  toggleAllImgsP: toggleAllImgsEl, turnVisibility: toggleVisibility,  visibilityState };
}

function applyHeadingStyles(h2s) {
    h2s.forEach((h2) => {
        h2.setAttribute("style", "color: #aaaaff");
    });
}

//#endregion

//#region  images

function createImageController() {
    const imgElement = new Image(125, 125);
    const startingPathIndex = getRandomInt(IMG_PATHS.length);
    const visibilityState = { status: 0 };

    const visibilityEvent = new CustomEvent("visibilityEvent", {
        detail: { img: imgElement, visibility: visibilityState },
        bubbles: true
    });

    function turnVisibility(i) {
        setVisibility(imgElement, i);
        visibilityState.status = i;
        dispatchEvent(visibilityEvent);
    }

    function update(newIndex) {
        imgElement.dataset.pathIndex = newIndex;
        imgElement.src = IMG_PATHS[imgElement.dataset.pathIndex];
        imgElement.alt = IMG_PATHS[imgElement.dataset.pathIndex];
    }

    function next() {
        let current = Number(imgElement.dataset.pathIndex) || 0;
        let newIndex = (current + 1) % IMG_PATHS.length;
        update(newIndex);
    }

    update(startingPathIndex);

    return {  imgElement, update, next, turnVisibility,  visibilityState };
}

// carga los controladores en las imagenes  &  return array de estos
function initImgsControllers(imgs) {
    const newImgs = imgs.map((img) => {
        const imgController = createImageController();
        imgController.imgElement.addEventListener("click", () => {
            imgController.next();
        });
        imgController.imgElement.addEventListener("dblclick", () => {
            imgController.turnVisibility(1);
        });
        img.replaceWith(imgController.imgElement);
        imgController.imgElement = img;
        return imgController;
    });
    return newImgs;
}

function showAllImgs(imgs) {
    imgs.forEach((img) => {
        img.turnVisibility(0);
    });
}

//#endregion

//#region  app

const initApp = () => {
    // obtengo y cargo los elementos relevantes.
    const body = document.querySelector("body");
    const imageContainers = initContainers(Array.from(document.querySelectorAll("body > div:has(h2):has(img)")));
    const images = initImgsControllers(Array.from(imageContainers).map((div) => findFirstChild(div, "img")));
    const headings = Array.from(imageContainers).map((div) => findFirstChild(div, "h2"));

    applyHeadingStyles(headings);

    //  p mostrar todas las imagenes
    const toggleImagesPButton = createToggleAllImagesControl(body, images);
    window.addEventListener("visibilityEvent", (e) => {
        if (toggleImagesPButton.visibilityState.status !== 0) {
            toggleImagesPButton.turnVisibility();
        }
    });

};

//#endregion

document.addEventListener("DOMContentLoaded", initApp);
