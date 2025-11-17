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
    const toggleAllImagesElement = document.createElement("p");
    const visibilityState = { status: 0 };

    toggleAllImagesElement.textContent = "Mostrar totes";

    toggleAllImagesElement.addEventListener("click", () => {
        showAllImgs(images);
        toggleVisibility();
    });

    function toggleVisibility() {
        if (visibilityState.status == 0) {
            visibilityState.status = 1;
        } else {
            visibilityState.status = 0;
        }
        setVisibility(toggleAllImagesElement, visibilityState.status);
    }

    toggleVisibility();
    body.insertBefore(toggleAllImagesElement, pImgs);
    return { toggleAllImagesElement, toggleVisibility: toggleVisibility, visibilityState };
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
        bubbles: true,
    });

    function toggleVisibility(i) {
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

    return { imgElement, update, next, toggleVisibility, visibilityState };
}

// carga los controladores en las imagenes  &  return array de estos
function initImagesControllers(imgs) {
    const imagesControllers = imgs.map((img) => {
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

function showAllImgs(imgs) {
    imgs.forEach((img) => {
        img.toggleVisibility(0);
    });
}

//#endregion

//#region  app

const initApp = () => {
    const body = document.querySelector("body");
    const imageContainers = initContainers(Array.from(document.querySelectorAll("body > div:has(h2):has(img)")));
    const imagesControllers = initImagesControllers(Array.from(imageContainers).map((div) => findFirstChild(div, "img")));
    const headings = Array.from(imageContainers).map((div) => findFirstChild(div, "h2"));

    applyHeadingStyles(headings);

    const toggleImagesPButton = createToggleAllImagesControl(body, imagesControllers);
    window.addEventListener("visibilityEvent", (e) => {
        if (toggleImagesPButton.visibilityState.status !== 0) {
            toggleImagesPButton.toggleVisibility();
        }
    });
};

//#endregion

document.addEventListener("DOMContentLoaded", initApp);
