function FreehandTool() {
  // set an icon and a name for the object
  this.name = "Freehand Tool";
  this.icon = "assets/freehand.png";
  
  this.FreehandThickness = 5;

  // to smoothly draw we'll draw a line from the previous mouse location
  // to the current mouse location. The following values store
  // the locations from the last frame. They are -1 to start with because
  // we haven't started drawing yet.
  let previousMouseX = -1;
  let previousMouseY = -1;
  let self = this;

  this.draw = function () {
    // if the mouse is pressed
    if (mouseIsPressed) {
      // check if they previousX and Y are -1. set them to the current
      // mouse X and Y if they are.
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
      // if we already have values for previousX and Y we can draw a line from
      // there to the current mouse location
      else {
        strokeWeight(self.FreehandThickness);
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    }
    // if the user has released the mouse we want to set the previousMouse values
    // back to -1.
    // try and comment out these lines and see what happens!
    else {
      previousMouseX = -1;
      previousMouseY = -1;
    }
  };

  //adds a button and click handler to the options area. When clicked
  //toggle the line of symmetry between horizonatl to vertical
  this.populateOptions = function () {
    let optionsHTML = {
      penSizePrompt: "<label for='input' class='options-label'>Pen Thickness:</label>",
      penSizeInput: "<form class='increase-decrease-input'>  <div class='value-button' id='freehand-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='freehand-number-input' value='2'/>  <div class='value-button' id='freehand-increase' value='Increase Value'>+</div>  </form>"
      
    }
    select(".options").html(optionsHTML.penSizePrompt + optionsHTML.penSizeInput);
    // Click handler
    // increase
    select("#freehand-increase").mouseClicked(function () {
      let value = parseInt(document.getElementById('freehand-number-input').value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      document.getElementById('freehand-number-input').value = value;
      self.FreehandThickness = value
    });
    //click handler
    select("#freehand-decrease").mouseClicked(function () {
      value = parseInt(document.getElementById('freehand-number-input').value, 10);
        value = isNaN(value) ? 1 : value;
        value < 2 ? value = 2 : '';
        value--;
        document.getElementById('freehand-number-input').value = value;
        self.FreehandThickness = value
    });
  };
}
