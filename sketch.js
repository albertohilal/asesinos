let cielo;
let PlazaMayo;
let munch;
let avion;
let xMunch, yMunch, munchSize;
let keyStates = {};

function preload() {
  cielo = loadImage("images/cielo.png");
  PlazaMayo = loadImage("images/PlazaMayo.png");
  munch = loadImage("images/munch.png");
  avion = new Avion("images/avion.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  avion.init();
  xMunch = width / 2; // Posición inicial de Munch, centrada horizontalmente
  yMunch = height * 0.6; // Posición vertical inicial de Munch
  munchSize = munch.width / 3; // Tamaño inicial de Munch
}

function draw() {
  background(cielo);
  image(PlazaMayo, 0, 0, width, height);
  avion.mostrar();
  avion.actualizar();

  if (keyStates[LEFT_ARROW]) {
    xMunch -= 5;
  }
  if (keyStates[RIGHT_ARROW]) {
    xMunch += 5;
  }

  if (keyStates[UP_ARROW]) {
    let proposedY = yMunch - 5;
    let proposedSize = munchSize * 0.95;
    if (
      proposedY + (munch.height / munch.width) * proposedSize >=
      height * 0.68
    ) {
      yMunch = proposedY;
      munchSize = proposedSize;
    }
  }
  if (keyStates[DOWN_ARROW]) {
    let proposedY = yMunch + 5;
    let proposedSize = munchSize * 1.05;
    if (
      proposedY + (munch.height / munch.width) * proposedSize <=
      height * 2.2
    ) {
      yMunch = proposedY;
      munchSize = proposedSize;
    }
  }

  let munchHeight = (munch.height / munch.width) * munchSize;
  image(munch, xMunch - munchSize / 2, yMunch, munchSize, munchHeight);
}

function keyPressed() {
  keyStates[keyCode] = true;
}

function keyReleased() {
  keyStates[keyCode] = false;
}

class Bala {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  mostrar() {
    fill(0); // Color negro
    noStroke();
    circle(this.x, this.y, 6); // Dibuja un círculo de 6px de diámetro para mayor visibilidad
  }

  actualizar() {
    this.y += this.speed; // Mueve la bala hacia abajo
  }
}

class Avion {
  constructor(imgPath) {
    this.img = loadImage(imgPath);
    this.size = 0; // Tamaño inicial
    this.maxSize = 100; // Tamaño máximo
    this.x = 0;
    this.y = 0;
    this.targetY = -120; // Establece el targetY a -120
    this.balas = []; // Arreglo para almacenar balas
  }

  init() {
    this.x = width / 2;
    this.y = height * 0.4; // Iniciar en el centro vertical del canvas
  }

  mostrar() {
    let x = this.x - ((this.size / 100) * this.img.width) / 2;
    let y = this.y - ((this.size / 100) * this.img.height) / 2;
    image(
      this.img,
      x,
      y,
      (this.size / 100) * this.img.width,
      (this.size / 100) * this.img.height
    );
    for (let bala of this.balas) {
      bala.mostrar();
    }
  }

  actualizar() {
    this.size = map(this.y, height, this.targetY, 0, this.maxSize);
    if (this.y > this.targetY) {
      this.y -= 2;
    } else {
      this.init();
    }
    if (frameCount % 20 == 0 && this.y > 0) {
      this.balas.push(
        new Bala(
          this.x + 370 - this.img.width / 2,
          this.y + 260 - this.img.height / 2,
          5
        )
      );
    }
    for (let bala of this.balas) {
      bala.actualizar();
    }
  }
}
