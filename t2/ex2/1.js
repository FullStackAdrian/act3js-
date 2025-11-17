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
    const toggleAllImgsP = document.createElement("p");
    const visibility = { status: 0 };

    toggleAllImgsP.textContent = "Mostrar totes";

    toggleAllImgsP.addEventListener("click", () => {
        showAllImgs(images);
        turnVisibility();
    });
    
    function turnVisibility() {
        if (visibility.status == 0) {
            visibility.status = 1; 
        }else {
            visibility.status = 0;
        }
        setVisibility(toggleAllImgsP, visibility.status);
    }

    turnVisibility();
    body.insertBefore(toggleAllImgsP, pImgs);
    return {  toggleAllImgsP, turnVisibility, visibility };
}

function stylingH2eadings(h2s) {
    h2s.forEach((h2) => {
        h2.setAttribute("style", "color: #aaaaff");
    });
}

//#endregion

//#region  images

function createRandomImg() {
    const newImg = new Image(125, 125);
    const startingPathIndex = getRandomInt(IMG_PATHS.length);
    const visibility = { status: 0 };

    const visibilityEvent = new CustomEvent("visibilityEvent", {
        detail: { img: newImg, visibility },
        bubbles: true
    });

    function turnVisibility(i) {
        setVisibility(newImg, i);
        visibility.status = i;
        dispatchEvent(visibilityEvent);
    }

    function update(newIndex) {
        newImg.dataset.pathIndex = newIndex;
        newImg.src = IMG_PATHS[newImg.dataset.pathIndex];
        newImg.alt = IMG_PATHS[newImg.dataset.pathIndex];
    }

    function next() {
        let current = Number(newImg.dataset.pathIndex) || 0;
        let newIndex = (current + 1) % IMG_PATHS.length;
        update(newIndex);
    }

    update(startingPathIndex);

    return { img: newImg, update, next, turnVisibility, visibility };
}

// carga de imagenes con sus eventos &  return array de estas
function initImgs(imgs) {
    const newImgs = imgs.map((img) => {
        const imgController = createRandomImg();
        imgController.img.addEventListener("click", () => {
            imgController.next();
        });
        imgController.img.addEventListener("dblclick", () => {
            imgController.turnVisibility(1);
        });
        img.replaceWith(imgController.img);
        imgController.img = img;
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
    const images = initImgs(Array.from(imageContainers).map((div) => findFirstChild(div, "img")));
    const headings = Array.from(imageContainers).map((div) => findFirstChild(div, "h2"));

    stylingH2eadings(headings);

    //  p mostrar todas las imagenes
    const pShowImgs = createToggleAllImagesControl(body, images);
    window.addEventListener("visibilityEvent", (e) => {
        if (pShowImgs.visibility.status !== 0) {
            pShowImgs.turnVisibility();
        }
    });

};

//#endregion

document.addEventListener("DOMContentLoaded", initApp);
