function LineToTool() {
  // set an icon and a name for the object
  this.name = "lineTo";
  this.icon = "assets/lineTo.png";

  // We will be making a line from the previous point to the
  // new point.The following values store the location of the
  // starting point of the line. -1 shows that we haven't added a
  // starting point. The drawing variable is a boolean
  // which stores if the line is drawing or not.
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  this.draw = function () {
    // if the mouse is pressed
    if (mouseIsPressed) {
      // check if starting X and Y are -1. If yes, set them to
      // current mouse X and Y.
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        // set drawing to true to start drawing
        drawing = true;
        // This will load the current state of the canvas so
        // you don't have multiple lines and the line is commited only when
        // you release the mouse
        loadPixels();
      } else {
        // This will update the screen with the new line when the mouse is released
        // and then draw a line with starting X and Y and the current mouse X and Y
        updatePixels();
        strokeWeight(10);
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    }

    // When the drawing is done, this is revert back the drawing state to false
    // and make the starting X and Y -1.
    else if (drawing) {
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };


}
