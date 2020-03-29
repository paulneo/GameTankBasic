
const vp = document.getElementById('tablero')
var tablero = vp.getContext("2d");

var tanque = {
  url: "tanquer2Bottom.png",
  cargaOK: false,
  position: 'bottom'
}
var tanqueEnemy = {
  url: "tanquerBottom.png",
  cargaOK: false,
  position: 'bottom'
}

var bala = {
  url: "bala2.png",
}

var balaEnemy = {
  url: "bala.png",
}
var explocion = {
  url: "explocion.png",
}


const Arrows = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  BOTTOM: 40, 
}

let posX = 150
let posY = 150

let  positionTanque

tanque.imagen = new Image();
tanque.imagen.src = tanque.url;
tanque.imagen.addEventListener("load", cargarTanque);

bala.imagen = new Image();
bala.imagen.src = bala.url;

tanqueEnemy.imagen = new Image();
tanqueEnemy.imagen.src = tanqueEnemy.url;
tanqueEnemy.imagen.addEventListener("load", cargarTanqueEnemy);

balaEnemy.imagen = new Image();
balaEnemy.imagen.src = balaEnemy.url;

explocion.imagen = new Image();
explocion.imagen.src = explocion.url;


function cargarTanqueEnemy() {
  tanque.cargaOK = true
  dibujarTanqueEnemy()
}

function cargarTanque() {
  tanque.cargaOK = true
  dibujar()
}

function dibujar() {
  if (tanque.cargaOK) {
    tablero.drawImage(tanque.imagen, posX, posY);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === Arrows.BOTTOM) {
    tablero.clearRect(posX, posY, 70, 70);
    posY += 2
    tanque.url = 'tanquer2Bottom.png'
    tanque.position = 'bottom'

  }
  else if (event.keyCode === Arrows.LEFT) {
    tablero.clearRect(posX, posY, 70, 70);
    posX -= 2
    tanque.url = 'tanquer2Left.png'
    tanque.position = 'left'

  }
  else if (event.keyCode === Arrows.UP) {
    tablero.clearRect(posX, posY, 70, 70);
    posY -= 2
    tanque.url = 'tanquer2Up.png'
    tanque.position = 'up'

  }
  else if (event.keyCode === Arrows.RIGHT) {
    tablero.clearRect(posX, posY, 70, 70);
    posX += 2
    tanque.url = 'tanquer2Right.png'
    tanque.position = 'right'
  }
  tanque.imagen.src = tanque.url;
  dibujar()

  if (event.keyCode === 32) {
    ajustarDisparo()
  }

})

let cant = 2
const ajustarDisparo = () => {

  let posBX = posX
  let posBY = posY
  if (event.keyCode === 32) {
    if (tanque.position === 'bottom') {
      progresoBala(cant, posBX + 30, posBY + 70, 'bottom')
    }
    else if(tanque.position === 'left') {
      progresoBala(cant, posBX - 10, posBY + 30, 'left')
    }
    else if (tanque.position === 'right') {
      progresoBala(cant, posBX + 70 , posBY + 30, 'right')
    }
    else if (tanque.position === 'up') {
      progresoBala(cant, posBX + 30, posBY - 10, 'up')
    }
  }      
}

function progresoBala(cant, posBX, posBY, direction){
  if (direction === 'bottom'){
    tablero.drawImage(bala.imagen, posBX, posBY + cant);
    winOrNot(posBX, posBY + cant)
    tablero.clearRect(posBX, posBY + cant - 10, 10, 10);
  }
  else if (direction === 'up') {
    tablero.drawImage(bala.imagen, posBX, posBY - cant);
    winOrNot(posBX, posBY - cant)
    tablero.clearRect(posBX, posBY - cant + 10, 10, 10);
  }
  else if (direction === 'left') {
    tablero.drawImage(bala.imagen, posBX - cant, posBY);
    winOrNot(posBX - cant, posBY)
    tablero.clearRect(posBX - cant + 10, posBY , 10, 10);
  }
  else if (direction === 'right') {
    tablero.drawImage(bala.imagen, posBX + cant, posBY);
    winOrNot(posBX + cant, posBY)
    tablero.clearRect(posBX + cant - 10, posBY, 10, 10);
  }

  if (cant > 300) {
    if (direction === 'bottom') {
      tablero.clearRect(posBX, posBY + cant, 10, 10);
    }
    else if (direction === 'up') {
      tablero.clearRect(posBX, posBY - cant, 10, 10);
    }
    else if (direction === 'left') {
      tablero.clearRect(posBX - cant, posBY, 10, 10);
    }
    else if (direction === 'right') {
      tablero.clearRect(posBX + cant, posBY, 10, 10);
    }
    cant = 1
  }

  else{
    cant += 10
    setTimeout(() => {
      progresoBala(cant, posBX, posBY, direction)
    }, 100) 
  }
}
var tanqueEnemy1 = {
  posX : 0,
  posY : 0,
}

function dibujarTanqueEnemy() {
  for (var i = 0; i < 1; i++) {
    var x = aleatorio(70, 800);
    var y = aleatorio(70, 800);
    tanqueEnemy1.posX = x
    tanqueEnemy1.posY = y
    tablero.drawImage(tanqueEnemy.imagen, x, y);
  }
}

function aleatorio(min, maxi) {
  var resultado;
  resultado = Math.floor(Math.random() * (maxi - min + 1)) + min;
  
  return resultado;
}

function winOrNot(posX, posY){  
  if (
    tanqueEnemy1.posX + 70 >= posX && posX >= tanqueEnemy1.posX &&
    tanqueEnemy1.posY + 70 >= posY && posY >= tanqueEnemy1.posY
    ) {
    tablero.drawImage(explocion.imagen, tanqueEnemy1.posX, tanqueEnemy1.posY);
    alert('GANASTE')
    setTimeout( () => {
      location.reload(true);
    },1000 )
  }
}