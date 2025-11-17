const testDiv = document.getElementById("test");
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
    const visibility = { 0: "visible ", 1: "hidden", status: 0 };
    element.setAttribute("style", "visibility:" + visibility[i] + ";");
    return visibility;
}

//#endregion

//#region doc 

function loadDiv(div) {
    div.addEventListener("click", () => {
        clickOnContainer(div);
    });
    return div;
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

    function turnVisibility(i) {
        turnVisibilityFromElement(newImg, i);
        visibility.status = i;
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
    // obtengo los elementos relevantes.
    const body = document.querySelector("body");
    const contentDivs = document.querySelectorAll("body > div:has(h2):has(img)");
    const h2s = Array.from(contentDivs).map((div) => getFirstChildByType(div, "h2"));

    // obtengo y cargo mis obj img
    const images = loadImages(Array.from(contentDivs).map((div) => getFirstChildByType(div, "img")));

    loadH2Styles(h2s);

    //  p mostrar todas las imagenes
    const pImatges = getFirstChildByType(body, "p");
    const pShowImgs = document.createElement("p");
    pShowImgs.textContent = "Mostrar totes";
    pShowImgs.addEventListener("click", () => {
        turnImagesVisible(images);
    });
    body.insertBefore(pShowImgs, pImatges);

    // click al contenidor
};

//#endregion

document.addEventListener("DOMContentLoaded", app);
