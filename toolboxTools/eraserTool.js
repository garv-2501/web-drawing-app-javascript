function EraserTool() {
    // set an icon and a name for the object
    this.name = "Eraser Tool";
    this.icon = "assets/eraserTool.png";

    // ------------------------------------------------

    // for smooth drawing, we will create a line between each registered mouse coord.
    // and the previous mouse coord. Hence, will use previousMouseX and Y to store these coord.
    let previousMouseX;
    let previousMouseY;
    // To store the slider values
    let sizeValue = 50;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Slider for the options menu:
        this.sizeSlider = createSlider(1, 200, sizeValue, 1);

        // Initialising previous (x, y) position
        previousMouseX = -1;
        previousMouseY = -1;

        self = this;

        // Slider for the eraser in the options menu
        self.sizeSlider.parent("#eraser-sliders");
        self.sizeSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        if (!mouseIsPressed) {
            // if the user released the mouse, set the previousMouse values to -1
            previousMouseX = -1;
            previousMouseY = -1;

            if (mousePressOnCanvas(c)) {
                // Update the eraser border
                updatePixels();
                push();
                noFill();
                strokeWeight(1);
                stroke(0);
                ellipse(mouseX, mouseY, self.sizeSlider.value());
            }
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("eraser-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
    };

    // ------------------------------------------------

    // To erase the border mark left by eraser when selecting a different tool
    this.mousePressed = function () {
        if (!mousePressOnCanvas(c)) {
            updatePixels();
        }
    };

    // ------------------------------------------------

    this.mouseDragged = function () {
        if (mousePressOnCanvas(c)) {
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
                // Added a fraction of the value so the eraser does not leave marks
                strokeWeight(
                    self.sizeSlider.value() + self.sizeSlider.value() / 5
                );
                stroke(255);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                pop();
            }

            // For the eraser border
            loadPixels();
            push();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(mouseX, mouseY, self.sizeSlider.value());
            pop();
        }
    };

    // ------------------------------------------------

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    // adds sliders and display slider value to the options menu
    this.populateOptions = function () {
        select(".options").html(
            "<label class='options-label'>Size:</label>  <div id='eraser-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='eraser-sizeSliderInput' value='' readonly/>"
        );
    };

    // ------------------------------------------------

    function mousePressOnCanvas(canvas) {
        if (
            mouseX > canvas.elt.offsetLeft - 60 &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop - 50 &&
            mouseY < canvas.elt.offsetTop + canvas.height - 30
        ) {
            return true;
        }
        return false;
    }
}
