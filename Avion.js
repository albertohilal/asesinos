function Avion(imgPath) {
  this.img = loadImage(imgPath);
  this.size = 0;
  this.maxSize = 100;
  this.x = 0;
  this.y = 0;
  this.targetY = -120;
  this.balas = [];

  this.init = function () {
    this.x = width / 2;
    this.y = height * 0.4;
  };

  this.mostrar = function () {
    let x = this.x - ((this.size / 100) * this.img.width) / 2;
    let y = this.y - ((this.size / 100) * this.img.height) / 2;
    image(
      this.img,
      x,
      y,
      (this.size / 100) * this.img.width,
      (this.size / 100) * this.img.height
    );

    for (let i = 0; i < this.balas.length; i++) {
      this.balas[i].mostrar();
    }
  };

  this.actualizar = function () {
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

    for (let i = 0; i < this.balas.length; i++) {
      this.balas[i].actualizar();
      if (this.balas[i].y > height) {
        // Remove bullets when they leave the screen
        this.balas.splice(i, 1);
        i--;
      }
    }
  };
}
