function StampTool() {
  // set an icon and a name for the object
  this.name = "stamp";
  this.icon = "assets/stampTool.png";

  this.draw = function () {
    let starSize = 20;
    if (mouseIsPressed) {
      let stampX = mouseX + starSize / 2;
      let stampY = mouseY + starSize / 2;
      image(star, stampX, stampY, starSize, starSize);
    }
  };
  

  
  
}
