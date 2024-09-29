let cielo;
let PlazaMayo;
let munch;
let avion;
let canvas;
let hammer;

function preload() {
  cielo = loadImage(
    windowWidth <= 1000 ? "images/cieloMovil.webp" : "images/cielo.png"
  );
  PlazaMayo = loadImage(
    windowWidth <= 1000 ? "images/PlazaMayoMovil.webp" : "images/PlazaMayo.webp"
  );
  munch = new Munch("images/munch.png");
  avion = new Avion("images/avion.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  avion.init();
  munch.init(width / 2, height * 0.68); // Set initial position of munch
  setupHammer(); // Setup touch gestures with Hammer.js
}

function draw() {
  background(cielo);
  image(PlazaMayo, 0, 0, width, height);
  avion.mostrar();
  avion.actualizar();
  munch.update();
  munch.display();
}

function keyPressed() {
  munch.handleKeyboard(keyCode, true); // Handle key press
}

function keyReleased() {
  munch.handleKeyboard(keyCode, false); // Handle key release
}

function setupHammer() {
  hammer = new Hammer(canvas.elt);
  hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammer.on("panleft panright panup pandown", (ev) => munch.handleGestures(ev));
}

class Munch {
  constructor(imgPath) {
    this.img = loadImage(
      imgPath,
      () => console.log("Munch image loaded successfully"),
      console.error
    );
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.minY = 0;
    this.maxY = 0;
    this.keyStates = {}; // Object to keep track of key states
  }

  init(x, y) {
    this.x = x;
    this.y = y;
    this.size = this.img.width / 3;
    this.minY = height * 0.65;
    this.maxY = height * 1.2;
  }

  update() {
    if (this.keyStates["ArrowLeft"]) this.x -= 5;
    if (this.keyStates["ArrowRight"]) this.x += 5;
    if (this.keyStates["ArrowUp"] && this.y > this.minY) this.y -= 5;
    if (this.keyStates["ArrowDown"] && this.y < this.maxY) this.y += 5;

    this.size = map(
      this.y,
      this.minY,
      this.maxY,
      this.img.width * 0.05,
      this.img.width * 4
    );
  }

  display() {
    image(
      this.img,
      this.x - this.size / 2,
      this.y,
      this.size,
      this.size * (this.img.height / this.img.width)
    );
  }

  handleKeyboard(key, isPressed) {
    if (
      key === LEFT_ARROW ||
      key === RIGHT_ARROW ||
      key === UP_ARROW ||
      key === DOWN_ARROW
    ) {
      this.keyStates[key] = isPressed;
    }
  }

  handleGestures(ev) {
    if (ev.type === "panright") this.x += 5;
    else if (ev.type === "panleft") this.x -= 5;
    else if (ev.type === "panup" && this.y > this.minY) this.y -= 5;
    else if (ev.type === "pandown" && this.y < this.maxY) this.y += 5;
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
    if (frameCount % 20 === 0 && this.y > 0) {
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
