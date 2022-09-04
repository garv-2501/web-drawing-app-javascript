function FreehandTool() {
    // set an icon and a name for the object
    this.name = "Freehand Tool";
    this.icon = "assets/freehandTool.png";

    // ------------------------------------------------

    // for smooth drawing, we will create a line between each registered mouse coord.
    // and the previous mouse coord. Hence, will use previousMouseX and Y to store these coord.
    //set it to -1 to begin with
    let previousMouseX;
    let previousMouseY;
    // To store the slider values
    let sizeValue = 5;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);

        // Initialising previous (x, y) position
        previousMouseX = -1;
        previousMouseY = -1;

        self = this;

        // Slider for the freehandTool in the options menu
        self.sizeSlider.parent("#freehand-sliders");
        self.sizeSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

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
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                strokeWeight(self.sizeSlider.value());
                stroke(colourVal);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            // if the user released the mouse, set the previousMouse values to -1
            previousMouseX = -1;
            previousMouseY = -1;
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("freehand-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
    };

    // ------------------------------------------------

    this.mouseDragged = function () {};

    // ------------------------------------------------

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    // adds sliders and display slider value to the options menu
    this.populateOptions = function () {
        select(".options").html(
            "<label class='options-label'>Size:</label>  <div id='freehand-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='freehand-sizeSliderInput' value='' readonly/>"
        );
    };

    // ------------------------------------------------

    // To not let mousePress outside of canvas affect things in the canvas
    function mousePressOnCanvas(canvas) {
        if (
            mouseX > canvas.elt.offsetLeft - 60 &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop - 50 &&
            mouseY < canvas.elt.offsetTop + canvas.height - 65
        ) {
            return true;
        }
        return false;
    }
}
