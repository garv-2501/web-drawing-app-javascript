function FreehandTool() {
    // set an icon and a name for the object
    this.name = "Freehand Tool";
    this.icon = "assets/freehandTool.png";

    // ------------------------------------------------

    // for smooth drawing, we will create a line between each registered mouse coord.
    // and the previous mouse coord. Hence, will use previousMouseX and Y to store these coord.
    let previousMouseX;
    let previousMouseY;
    let self;

    // Sliders for the options menu:
    let sizeSlider;
    let opacitySlider;

    // ------------------------------------------------

    this.setup = function () {
        previousMouseX = -1;
        previousMouseY = -1;
        self = this;

        // Slider for the freehandTool in the options menu
        sizeSlider = createSlider(1, 100, 5);
        sizeSlider.parent("#freehand-sliders");
        opacitySlider = createSlider(1, 100, 100);
        opacitySlider.parent("#freehand-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed
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
                strokeWeight(sizeSlider.value());
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                stroke(colourVal);
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

    // ------------------------------------------------

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    //adds a button and click handler to the options area. When clicked
    //toggle the line of symmetry between horizonatl to vertical
    this.populateOptions = function () {
        select(".options").html("<div id='freehand-sliders'></div>");
    };
}
