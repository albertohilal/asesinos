let cielo;
let PlazaMayo;
let munch;
let avion;
let xMunch, yMunch; // Variables para la posición de Munch
let munchSize; // Variable para el tamaño de Munch

function preload() {
  cielo = loadImage("images/cielo.png");
  PlazaMayo = loadImage("images/PlazaMayo.png");
  munch = loadImage("images/munch.png");
  avion = new Avion("images/avion.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  avion.init();
  xMunch = width / 2; // Posición inicial de Munch
  yMunch = height * 0.6; // Posición vertical inicial de Munch
  munchSize = munch.width / 3; // Tamaño inicial de Munch
}

function draw() {
  background(cielo);
  image(PlazaMayo, 0, 0, width, height);
  avion.mostrar();
  avion.actualizar();
  image(
    munch,
    xMunch - munchSize / 2,
    yMunch,
    munchSize,
    (munch.height / munch.width) * munchSize
  ); // Ajusta el tamaño proporcionalmente
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xMunch -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    xMunch += 10;
  } else if (keyCode === UP_ARROW) {
    yMunch -= 10;
    munchSize *= 0.95; // Disminuye el tamaño al moverse hacia arriba
  } else if (keyCode === DOWN_ARROW) {
    yMunch += 10;
    munchSize *= 1.05; // Aumenta el tamaño al moverse hacia abajo
  }
}

class Bala {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  mostrar() {
    fill(0);
    noStroke();
    circle(this.x, this.y, 6);
  }

  actualizar() {
    this.y += this.speed;
  }
}

class Avion {
  constructor(imgPath) {
    this.img = loadImage(imgPath);
    this.size = 0;
    this.maxSize = 100;
    this.x = 0;
    this.y = 0;
    this.targetY = -120;
    this.balas = [];
  }

  init() {
    this.x = width / 2;
    this.y = height * 0.4;
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
