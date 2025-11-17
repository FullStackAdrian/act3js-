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

// carga de imagenes con sus eventos &  return array de estas 
 function loadImages(images) {
    const newImgaes = images.map((img) => {
        const randImg = createRandomImg();
        randImg.img.addEventListener("click", () => {
            // un pequeño control para que la ruta aleatoria no sea la existente
            let newPath = random(3);
            while ( randImg.img.dataset.pathIndex == newPath) {
                newPath = random(3);
            }
            randImg.update(newPath);
            });
        randImg.img.addEventListener("dblclick", () => { randImg.turnVisibility(1) });
        img.replaceWith(randImg.img);
        randImg.img = img;
        return randImg;
    });
    return newImgaes;
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
    // obtengo los h2
    const h2s = Array.from(divs).map((div) => getFirstChildByType(div, "h2"));
    // obtengo los obj randImg ya cargados
    const images = loadImages(Array.from(divs).map((div) => getFirstChildByType(div, "img")));
    loadH2Styles(h2s);
};

document.addEventListener("DOMContentLoaded", app);
