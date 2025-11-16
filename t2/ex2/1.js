const testDiv = document.getElementById("test");
const imgsPaths = ["img/gnu.jpg", "img/gnulinux.jpg", "img/linux.jpg"];

// devuelve el primer hijo que coincida con el tipo
function getFirstChildByType(element, type) {
    for (const child of element.children) {
        if (child.tagName.toLowerCase() === type.toLowerCase()) {
            return child;
        }
    }
}

function random(number) {
    return Math.floor(Math.random() * number);
}

function createRandomImg() {
    const newImg = new Image(125, 125);
    const path = imgsPaths[random(3)];
    newImg.src = path;
    newImg.alt = path;
    return newImg;
}

// carga las imagenes aleatorias
function loadImages(images) {
    images.forEach((img) => {
        img.replaceWith(createRandomImg());
    });
}

function loadH2Styles(h2s) {
    h2s.forEach((h2) => {
        h2.setAttribute("style", "color: #aaaaff");
    });
}

// app

const app = () => {
    // obtengo los divs con contenido
    const divs = document.querySelectorAll("body > div:has(h2):has(img)");
    // obtengo los elementos hijos
    const h2s = Array.from(divs).map((div) => getFirstChildByType(div, "h2"));
    const images = Array.from(divs).map((div) => getFirstChildByType(div, "img"));

    loadImages(images);
    loadH2Styles(h2s);
};

document.addEventListener("DOMContentLoaded", app);
