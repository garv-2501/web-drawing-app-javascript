function RectTool() {
  // set an icon and a name for the object
  this.name = "Rect Tool";
  this.icon = "assets/rectTool.png";

  this.rectThickness = 2;

  // We will be making a line from the previous point to the
  // new point.The following values store the location of the
  // starting point of the line. -1 shows that we haven't added a
  // starting point. The drawing variable is a boolean
  // which stores if the line is drawing or not.
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;
  let self = this;

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
        strokeWeight(self.rectThickness);
        noFill();
        if (startMouseX - mouseX > 0) {
          if (startMouseY - mouseY > 0) {
            rect(mouseX, mouseY, startMouseX - mouseX, startMouseY - mouseY);
          } else {
            rect(
              mouseX,
              startMouseY,
              startMouseX - mouseX,
              mouseY - startMouseY
            );
          }
        } else {
          if (startMouseX - mouseX < 0) {
            if (startMouseY - mouseY > 0) {
              rect(
                startMouseX,
                mouseY,
                mouseX - startMouseX,
                startMouseY - mouseY
              );
            } else {
              rect(
                startMouseX,
                startMouseY,
                mouseX - startMouseX,
                mouseY - startMouseY
              );
            }
          }
        }
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

  this.populateOptions = function () {
    let optionsHTML = {
      penSizePrompt: "<label for='input' class='options-label'>Rectangle Thickness:</label>",
      penSizeInput: "<form class='increase-decrease-input'>  <div class='value-button' id='rect-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='rect-number-input' value='2'/>  <div class='value-button' id='rect-increase' value='Increase Value'>+</div>  </form>"
    }
    select(".options").html(optionsHTML.penSizePrompt + optionsHTML.penSizeInput);
    // Click handler
    // increase
    select("#rect-increase").mouseClicked(function () {
      let value = parseInt(document.getElementById('rect-number-input').value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById('rect-number-input').value = value;
      self.rectThickness = value
    });
    //click handler
    select("#rect-decrease").mouseClicked(function () {
      value = parseInt(document.getElementById('rect-number-input').value, 10);
        value = isNaN(value) ? 1 : value;
        value < 2 ? value = 2 : '';
        value--;
        document.getElementById('rect-number-input').value = value;
        self.rectThickness = value
    });
  };
}
