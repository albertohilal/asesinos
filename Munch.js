function Munch(imgPath) {
  this.img = loadImage(imgPath);
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.minY = 0;
  this.maxY = 0;
  this.keyStates = {};

  this.init = function (x, y) {
    this.x = x;
    this.y = y;
    this.size = this.img.width / 3;
    this.minY = height * 0.65;
    this.maxY = height * 1.2;
  };

  this.update = function () {
    if (this.keyStates[LEFT_ARROW]) this.x -= 5;
    if (this.keyStates[RIGHT_ARROW]) this.x += 5;
    if (this.keyStates[UP_ARROW] && this.y > this.minY) this.y -= 5;
    if (this.keyStates[DOWN_ARROW] && this.y < this.maxY) this.y += 5;

    // Actualizar el tamaño de Munch basado en su posición vertical
    this.size = map(
      this.y,
      this.minY,
      this.maxY,
      this.img.width * 0.05,
      this.img.width * 4
    );
  };

  this.display = function () {
    image(
      this.img,
      this.x - this.size / 2,
      this.y,
      this.size,
      this.size * (this.img.height / this.img.width)
    );
  };

  this.handleKeyboard = function (key, isPressed) {
    // Asegúrate de que sólo las teclas de flecha modifiquen el estado de movimiento
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(key)) {
      this.keyStates[key] = isPressed;
    }
  };

  this.handleGestures = function (ev) {
    if (ev.type === "panright") this.x += 5;
    else if (ev.type === "panleft") this.x -= 5;
    else if (ev.type === "panup" && this.y > this.minY) this.y -= 5;
    else if (ev.type === "pandown" && this.y < this.maxY) this.y += 5;
  };
}
