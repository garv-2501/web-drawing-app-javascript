function LineToTool() {
    // set an icon and a name for the object
    this.name = "Line Tool";
    this.icon = "assets/lineTool.png";

    // ------------------------------------------------

    // We will be making a line from the previous point to the
    // new point.The following values store the location of the
    // starting point of the line. -1 shows that we haven't added a
    // starting point.
    let startMouseX;
    let startMouseY;
    // Boolean var that stores if drawing is on or off
    let drawing;
    // To store the slider values
    let sizeValue = 5;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);

        // Initialising previous (x, y) position and the drawing boolean var
        startMouseX = -1;
        startMouseY = -1;
        drawing = false;

        self = this;

        // Slider for the line tool in the options menu
        self.sizeSlider.parent("#lineTool-sliders");
        self.sizeSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed on the canvas, do the following
        if (mouseIsPressed && mousePressOnCanvas(c)) {
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
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                stroke(colourVal);
                strokeWeight(self.sizeSlider.value());
                line(startMouseX, startMouseY, mouseX, mouseY);
            }
        }
        // When the drawing is done, this will revert back the drawing state to false
        // and make the starting X and Y -1.
        else if (drawing) {
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("lineTool-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
    };

    // ------------------------------------------------

    // Clears the options when the tool is unselected
    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    // adds sliders and display slider value to the options menu
    this.populateOptions = function () {
        select(".options").html(
            "<label class='options-label'>Size:</label>  <div id='lineTool-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='lineTool-sizeSliderInput' value='' readonly/>"
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
