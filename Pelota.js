const contenedor = document.getElementById("contenedor");
const pelota = document.getElementById("pelota");
const pala2 = document.getElementById("pala2");
const pala1 = document.getElementById("pala1");
const dificultad = document.getElementById("dificultad");
const marcador1 = document.getElementById("puntos1");
const marcador2 = document.getElementById("puntos2");

let posX = 10;
let posY = 10;
let velocidad = 0;
let directionX = 1;
let directionY = 1;
let topPala2 = 300;
let topPala1 = 300;
let puntosPlayer1 = 0;
let puntosPlayer2 = 0;
let difiCPU;

marcador1.innerText = puntosPlayer1;
marcador2.innerText = puntosPlayer2;

function moverPelota() {
    posX += (velocidad * directionX);
    posY += (velocidad * directionY);

    const limiteInferior = contenedor.clientHeight - pelota.clientHeight;
    const limiteDerecho = contenedor.clientWidth - pelota.clientWidth;

    comprobarGoal(limiteDerecho);

    if (posY > limiteInferior || posY < 0) {
        directionY *= -1;
    }

    pelota.style.left = posX + "px";
    pelota.style.top = posY + "px";
    pala1.style.top = topPala1 + "px";
    pala2.style.top = topPala2 + "px";

    comprobarColisionPala();

    turnoCPU();

    comprobarColisionCPU();
    
}

function comprobarColisionPala() {

    for (let i = topPala2; i < topPala2 + 200; i += 5) {

        if ((posX == 1380 && posY == i) || (posX == 1380 && posY + 10 == i)) {
            directionX *= -1
            break;
        }
        if ((posX == 1390 && posY + 10 == i) || (posX == 1390 && posY == i)) {
            directionY *= -1
            break;
        }
    }
}

function turnoCPU() {

    if ((posX < 500 && directionX == -1) && (directionY == -1)) {
        if (posY < topPala1 + 100) {
            topPala1 -= difiCPU;
        }
        else topPala1 += difiCPU;
    }
    else if ((posX < 500 && directionX == -1) && (directionY == 1)) {
        if (posY > topPala1 + 100) {
            topPala1 += difiCPU;
        }
        else topPala1 -= difiCPU;
    }
}

function comprobarColisionCPU() {

    for (let i = topPala1; i < topPala1 + 200; i += 5) {

        if ((posX == 110 && posY == i) || (posX == 110 && posY + 10 == i)) {
            directionX *= -1
            break;
        }
        if ((posX == 100 && posY + 10 == i) || (posX == 100 && posY == i)) {
            directionY *= -1
            break;
        }
    }
}

function comprobarGoal(limiteDerecho) {
    if (posX == limiteDerecho) {
        puntosPlayer1 += 1;
        marcador1.innerText = puntosPlayer1;
        posX = Math.floor((Math.random() * 30) + 15) * 10;
        posY = Math.floor((Math.random() * 60) + 1) * 10;
        directionX = 1;
        velocidad = 0;
    }
    else if (posX == 0) {
        puntosPlayer2 += 1;
        marcador2.innerText = puntosPlayer2;
        posX = Math.floor((Math.random() * 30) + 15) * 10;
        posY = Math.floor((Math.random() * 60) + 1) * 10;
        directionX = 1;
        velocidad = 0;
    }
}


function write() {

    moverPelota();
   
    window.requestAnimationFrame(write);
    
}

write();

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowDown": {
            if (topPala2 > 700) {
                topPala2 = 700;
            }
            else topPala2 += 30
            break;
        }
        case "ArrowUp": {
            if (topPala2 < -100) {
                topPala2 = -100
            }
            else topPala2 -= 30;
            break;
        }
        case "Enter": {
            if (velocidad == 0) {
                difiCPU = parseInt(dificultad.value);
                velocidad += 10;
                dificultad.blur();
            }

        }

    }
});
