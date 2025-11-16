const testDiv = document.getElementById("test");
const imgsPaths = [
    "img/gnu.jpg",
    "img/gnulinux.jpg",
    "img/linux.jpg"
]; 

function random(number) {
  return Math.floor(Math.random() * number);
}

function createRandomImg() {
    const newImg = new Image(125,125);
    newImg.src = imgsPaths[random(3)];
    return newImg;
}

function loadImages() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.replaceWith(createRandomImg());
    });
}

function loadH2Styles(){
    const h2elements = document.querySelectorAll("h2");
    h2elements.forEach(h2 => {
         
    });
}


// app 

const app = () => {
    loadImages();
}

document.addEventListener('DOMContentLoaded', app);