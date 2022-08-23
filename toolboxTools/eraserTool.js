function EraserTool() {
    // set an icon and a name for the object
    this.name = "Eraser Tool";
    this.icon = "assets/eraserTool.png";

    this.eraserThickness = 50;
    // to smoothly draw we'll draw a line from the previous mouse location
    // to the current mouse location. The following values store
    // the locations from the last frame. They are -1 to start with because
    // we haven't started drawing yet.
    let previousMouseX = -1;
    let previousMouseY = -1;
    let self = this;

    this.draw = function () {
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            // check if they previousX and Y are -1. set them to the current
            // mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            // if we already have values for previousX and Y we can draw a line from
            // there to the current mouse location
            else {
                push();
                strokeWeight(self.eraserThickness + 5);
                stroke(255);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                pop();
            }
            loadPixels();
            push();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(mouseX, mouseY, self.eraserThickness);
        }
        // if the user has released the mouse we want to set the previousMouse values
        // back to -1.
        // try and comment out these lines and see what happens!
        else {
            previousMouseX = -1;
            previousMouseY = -1;

            updatePixels();
            push();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(mouseX, mouseY, self.eraserThickness);
        }
    };

    this.unselectTool = function () {
        //updatePixels();
        //clear options
        select(".options").html("");
    };

    //adds a button and click handler to the options area. When clicked
    //toggle the line of symmetry between horizonatl to vertical
    this.populateOptions = function () {
        let optionsHTML = {
            penSizePrompt:
                "<label for='input' class='options-label'>Eraser Thickness:</label>",
            penSizeInput:
                "<form class='increase-decrease-input'>  <div class='value-button' id='eraser-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='eraser-number-input' value='10'/>  <div class='value-button' id='eraser-increase' value='Increase Value'>+</div>  </form>",
        };
        select(".options").html(
            optionsHTML.penSizePrompt + optionsHTML.penSizeInput
        );
        // Click handler
        // increase
        select("#eraser-increase").mouseClicked(function () {
            let value = parseInt(
                document.getElementById("eraser-number-input").value,
                10
            );
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById("eraser-number-input").value = value;
            self.eraserThickness = value * 5;
        });
        //click handler
        select("#eraser-decrease").mouseClicked(function () {
            value = parseInt(
                document.getElementById("eraser-number-input").value,
                10
            );
            value = isNaN(value) ? 1 : value;
            value < 2 ? (value = 2) : "";
            value--;
            document.getElementById("eraser-number-input").value = value;
            self.eraserThickness = value * 5;
        });
    };
}
