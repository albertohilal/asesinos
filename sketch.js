let cielo;
let PlazaMayo;
let munch;
let avion;

function preload() {
  cielo = loadImage("images/cielo.png");
  PlazaMayo = loadImage("images/PlazaMayo.png");
  munch = loadImage("images/munch.png");
  avion = new Avion("images/avion.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  avion.init();
}

function draw() {
  background(cielo); // Fondo del cielo
  image(PlazaMayo, 0, 0, width, height); // Imagen de fondo de Plaza Mayo
  avion.mostrar(); // Muestra el avión y las balas
  avion.actualizar(); // Actualiza primero el avión (incluyendo las balas)
  image(
    munch,
    width / 2 - munch.width / 6,
    height * 0.6,
    munch.width / 3,
    munch.height / 3
  ); // Munch al frente
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
    this.targetY = -120; // Establece el targetY a -120 (anteriormente -150)
    this.balas = []; // Arreglo para almacenar balas
  }

  init() {
    // Establece x y y basado en el tamaño del canvas y de la imagen
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

    // Dibuja todas las balas
    for (let bala of this.balas) {
      bala.mostrar();
    }
  }

  actualizar() {
    // Actualiza el tamaño basado en la posición de y
    this.size = map(this.y, height, this.targetY, 0, this.maxSize);

    // Mueve y hacia el targetY si aún no está en esa posición
    if (this.y > this.targetY) {
      this.y -= 2; // Ajusta este valor para controlar la velocidad del movimiento
    } else {
      // Reinicia el avión si alcanza el targetY
      this.init();
    }

    // Agrega una nueva bala en la posición 370, 260 respecto al avión cada 20 frames solo si y > 0
    if (frameCount % 20 == 0 && this.y > 0) {
      this.balas.push(
        new Bala(
          this.x + 370 - this.img.width / 2,
          this.y + 260 - this.img.height / 2,
          5
        )
      );
    }

    // Actualiza todas las balas
    for (let bala of this.balas) {
      bala.actualizar();
    }
  }
}
