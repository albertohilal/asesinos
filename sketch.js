let cielo;
let PlazaMayo;
let munch;
let avion;
let xMunch, yMunch, munchSize;
let canvas;
let hammer;
let keyStates = {}; // Object to hold the state of arrow keys
let minY, maxY; // Global scope for minY and maxY

function preload() {
  cielo = loadImage(
    windowWidth <= 1000 ? "images/cieloMovil.webp" : "images/cielo.png"
  );
  PlazaMayo = loadImage(
    windowWidth <= 1000 ? "images/PlazaMayoMovil.webp" : "images/PlazaMayo.webp"
  );
  munch = loadImage("images/munch.png");
  avion = new Avion("images/avion.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  avion.init();
  xMunch = width / 2; // Centered horizontally
  yMunch = height * 0.68; // Initial vertical position within allowed range
  munchSize = munch.width / 3; // Initial size of Munch

  // Define minY and maxY based on the current height
  minY = height * 0.65;
  maxY = height * 1.2;

  setupHammer(); // Setup Hammer.js for touch gestures

  // Attach keyboard event listeners
  window.addEventListener("keydown", (event) => {
    keyStates[event.key] = true;
  });

  window.addEventListener("keyup", (event) => {
    keyStates[event.key] = false;
  });
}

function draw() {
  background(cielo);
  image(PlazaMayo, 0, 0, width, height);
  avion.mostrar();
  avion.actualizar();

  // Handle keyboard controls
  handleMovement();

  // Adjust munchSize based on yMunch position
  munchSize = map(yMunch, minY, maxY, munch.width * 0.05, munch.width * 4);

  image(
    munch,
    xMunch - munchSize / 2,
    yMunch,
    munchSize,
    munchSize * (munch.height / munch.width)
  );
}

function handleMovement() {
  if (keyStates["ArrowLeft"]) {
    xMunch -= 5;
  }
  if (keyStates["ArrowRight"]) {
    xMunch += 5;
  }
  if (keyStates["ArrowUp"] && yMunch > minY) {
    yMunch -= 5;
  }
  if (keyStates["ArrowDown"] && yMunch < maxY) {
    yMunch += 5;
  }
}

function setupHammer() {
  hammer = new Hammer(canvas.elt);
  hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });

  hammer.on("panleft panright panup pandown", function (ev) {
    if (ev.type === "panright") {
      xMunch += 5;
    } else if (ev.type === "panleft") {
      xMunch -= 5;
    } else if (ev.type === "panup" && yMunch > minY) {
      yMunch -= 5;
    } else if (ev.type === "pandown" && yMunch < maxY) {
      yMunch += 5;
    }
  });
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
