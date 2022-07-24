function SprayCanTool() {
  // set an icon and a name for the object
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.png";
  // set the number of points and the spread of the spray
  this.points = 13;
  this.spread = 30;

  this.draw = function () {
    //if the mouse is pressed paint on the canvas
    //spread describes how far to spread the paint from the mouse pointer
    //points holds how many pixels of paint for each mouse press.
    if (mouseIsPressed) {
      for (let i = 0; i < this.points; i++) {
        strokeWeight(3);
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  };


}
