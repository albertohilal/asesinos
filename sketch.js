let cielo, PlazaMayo, munch, avion, canvas, hammer;

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
  munch.init(width / 2, height * 0.68);
  setupHammer();
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
  munch.handleKeyboard(keyCode, true);
}

function keyReleased() {
  munch.handleKeyboard(keyCode, false);
}

function setupHammer() {
  hammer = new Hammer(canvas.elt);
  hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammer.on("panleft panright panup pandown", (ev) => munch.handleGestures(ev));
}
