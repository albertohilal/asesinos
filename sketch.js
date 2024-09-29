let cielo, PlazaMayo, munch, avion, canvas, hammer;
let showWelcome = true; // Flag to control the display of the welcome screen

function preload() {
  cielo = loadImage(
    windowWidth <= 1000 ? "images/cieloMovil.webp" : "images/cielo.png"
  );
  PlazaMayo = loadImage(
    windowWidth <= 1000 ? "images/PlazaMayoMovil.webp" : "images/PlazaMayo.webp"
  );
  munch = new Munch("images/ninioPeronista.webp");
  avion = new Avion("images/avion.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  avion.init();
  munch.init(width / 2, height * 0.68);
  setupHammer();
}

function draw() {
  if (showWelcome) {
    displayWelcomeScreen();
  } else {
    background(cielo);
    image(PlazaMayo, 0, 0, width, height);
    avion.mostrar();
    avion.actualizar();
    munch.update();
    munch.display();
  }
}

// function displayWelcomeScreen() {
//   fill(windowWidth <= 1000 ? "red" : "black");
//   rect(0, 0, width, height);
//   fill(255); // Text color
//   textSize(60);
//   textAlign(CENTER, CENTER);
//   text("Bienvenido al juego", width / 2, height / 2);
// }

function displayWelcomeScreen() {
  if (windowWidth <= 1000) {
    fill("red");
  } else {
    fill("black");
  }
  rect(0, 0, width, height);
  fill(255); // Text color
  textSize(60);
  textAlign(CENTER, CENTER);

  let mensajeBienvenida;
  if (windowWidth <= 1000) {
    mensajeBienvenida =
      "Toca la pantalla para iniciar el juego.\nDesliza para mover el avatar.";
  } else {
    mensajeBienvenida =
      "Presiona cualquier tecla para iniciar el juego\n Usa las flechas o el mouse para mover el avatar";
  }

  text(mensajeBienvenida, width / 2, height / 2);
}

function keyPressed() {
  if (showWelcome) {
    showWelcome = false; // Hide welcome screen when any key is pressed
  } else {
    munch.handleKeyboard(keyCode, true);
  }
}

function keyReleased() {
  munch.handleKeyboard(keyCode, false);
}

function setupHammer() {
  hammer = new Hammer(canvas.elt);
  hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammer.on("panleft panright panup pandown", (ev) => munch.handleGestures(ev));
  hammer.on("tap", () => {
    if (showWelcome) {
      showWelcome = false; // Hide welcome screen when tapped on mobile
    }
  });
}
