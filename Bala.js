function Bala(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.mostrar = function () {
    fill(0);
    noStroke();
    circle(this.x, this.y, 6);
  };

  this.actualizar = function () {
    this.y += this.speed;
  };
}
