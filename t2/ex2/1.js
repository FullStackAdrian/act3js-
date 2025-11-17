const imgsPaths = ["img/gnu.jpg", "img/gnulinux.jpg", "img/linux.jpg"];

//#region  utils

function random(number) {
    return Math.floor(Math.random() * number);
}

// devuelve el primer hijo de dentro de un elemento que coincida con el tipo
function getFirstChildByType(element, type) {
    for (const child of element.children) {
        if (child.tagName.toLowerCase() === type.toLowerCase()) {
            return child;
        }
    }
}

function turnVisibilityFromElement(element, i) {
    const visibility = { 0: "visible ", 1: "hidden" };
    element.setAttribute("style", "visibility:" + visibility[i] + ";");
}

//#endregion

//#region doc

function clickOnContainer() {
    alert("cal clickar a sobre l'imatge");
}

function loadDivs(divs) {
    const newDivs = divs.map((div) => {
        div.addEventListener("click", (event) => {
            if (!event.target.closest("img")) {
                clickOnContainer();
            }
        });
        return div;
    });
    return newDivs;
}

function createPShowImgs(body, images) {
    const pImatges = getFirstChildByType(body, "p");
    const pShowImgs = document.createElement("p");
    const visibility = { status: 0 };

    pShowImgs.textContent = "Mostrar totes";

    pShowImgs.addEventListener("click", () => {
        turnImagesVisible(images);
        turnVisibility();
    });
    
    function turnVisibility() {
        if (visibility.status == 0) {
            visibility.status = 1; 
        }else {
            visibility.status = 0;
        }
        turnVisibilityFromElement(pShowImgs, visibility.status);
    }

    turnVisibility();
    body.insertBefore(pShowImgs, pImatges);
    return { pShowImgs, turnVisibility, visibility };
}

function loadH2Styles(h2s) {
    h2s.forEach((h2) => {
        h2.setAttribute("style", "color: #aaaaff");
    });
}

//#endregion

//#region  images

function createRandomImg() {
    const newImg = new Image(125, 125);
    const startingPathIndex = random(imgsPaths.length);
    const visibility = { status: 0 };

    const visibilityEvent = new CustomEvent("visibilityEvent", {
        detail: { img: newImg, visibility },
        bubbles: true
    });

    function turnVisibility(i) {
        turnVisibilityFromElement(newImg, i);
        visibility.status = i;
        dispatchEvent(visibilityEvent);
    }

    function update(newIndex) {
        newImg.dataset.pathIndex = newIndex;
        newImg.src = imgsPaths[newImg.dataset.pathIndex];
        newImg.alt = imgsPaths[newImg.dataset.pathIndex];
    }

    function next() {
        let current = Number(newImg.dataset.pathIndex) || 0;
        let newIndex = (current + 1) % imgsPaths.length;
        update(newIndex);
    }

    update(startingPathIndex);

    return { img: newImg, update, next, turnVisibility, visibility };
}

// carga de imagenes con sus eventos &  return array de estas
function loadImages(imgs) {
    const newImgs = imgs.map((img) => {
        const randImg = createRandomImg();
        randImg.img.addEventListener("click", () => {
            randImg.next();
        });
        randImg.img.addEventListener("dblclick", () => {
            randImg.turnVisibility(1);
        });
        img.replaceWith(randImg.img);
        randImg.img = img;
        return randImg;
    });
    return newImgs;
}

function turnImagesVisible(imgs) {
    imgs.forEach((img) => {
        img.turnVisibility(0);
    });
}

//#endregion

//#region  app

const app = () => {
    // obtengo y cargo los elementos relevantes.
    const body = document.querySelector("body");
    const contentDivs = loadDivs(Array.from(document.querySelectorAll("body > div:has(h2):has(img)")));
    const images = loadImages(Array.from(contentDivs).map((div) => getFirstChildByType(div, "img")));
    const h2s = Array.from(contentDivs).map((div) => getFirstChildByType(div, "h2"));

    loadH2Styles(h2s);

    //  p mostrar todas las imagenes
    const pShowImgs = createPShowImgs(body, images);
    window.addEventListener("visibilityEvent", (e) => {
        if (pShowImgs.visibility.status !== 0) {
            pShowImgs.turnVisibility();
        }
    });

};

//#endregion

document.addEventListener("DOMContentLoaded", app);
