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
    const startingPathIndex = random(3);
    const visibility = { 0:"visible ", 1: "hidden" };
    
    function turnVisibility(i){
        newImg.setAttribute("style","visibility:" + visibility[i] +  ";");    
    }
    
    function update(newIndex) {
        newImg.dataset.pathIndex = newIndex;
        newImg.src = imgsPaths[newImg.dataset.pathIndex];
        newImg.alt = imgsPaths[newImg.dataset.pathIndex];
    }
    
    update(startingPathIndex);

    return { img: newImg, update, turnVisibility};
}

// carga las imagenes aleatorias y sus eventos
function loadImages(images) {
    images.forEach((img) => {
        const newImg = createRandomImg();
        newImg.img.addEventListener("click", () => {
            // un pequeño control para que la ruta aleatoria no sea la existente
            let newPath = random(3);
            while ( newImg.img.dataset.pathIndex == newPath) {
                newPath = random(3);
            }
            newImg.update(newPath);
            });
        newImg.img.addEventListener("dblclick", () => { newImg.turnVisibility(1) });
        img.replaceWith(newImg.img);
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
