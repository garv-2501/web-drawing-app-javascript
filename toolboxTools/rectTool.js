function RectTool() {
    // set an icon and a name for the object
    this.name = "Rect Tool";
    this.icon = "assets/rectTool.png";

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
    let sizeValue = 3;
    let opacityValue = 255;
    let isFill = false;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders and buttons for the options menu:
        if (isFill) {
            this.fillButton = createButton("Don't Fill");
        } else {
            this.fillButton = createButton("Fill");
        }
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);
        this.opacitySlider = createSlider(10, 255, opacityValue, 5);

        // Initialising previous (x, y) position and the drawing boolean var
        startMouseX = -1;
        startMouseY = -1;
        drawing = false;

        self = this;

        // Sliders and buttons for the rect tool in the options menu
        self.fillButton.parent("#rect-buttons");
        self.fillButton.addClass("headButton");

        self.sizeSlider.parent("#rect-sliders");
        self.sizeSlider.addClass("tool-sliders");

        self.opacitySlider.parent("#rect-sliders-1");
        self.opacitySlider.addClass("tool-sliders");

        // giving functionality to the fillButton
        self.fillButton.mousePressed(function () {
            isFill = !isFill;
            if (isFill) {
                self.fillButton.html("Don't Fill");
            } else {
                self.fillButton.html("Fill");
            }
        });
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed
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

                // To add a colour with variable opacity
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    self.opacitySlider.value()
                );

                strokeWeight(self.sizeSlider.value());

                // Only fill when the fill button is pressed, noStroke when fill is ON
                if (isFill) {
                    noStroke();
                    fill(colourVal);
                } else {
                    stroke(colourVal);
                    noFill();
                }

                // conditionals checking how and where to draw the rectangle
                if (startMouseX - mouseX > 0) {
                    if (startMouseY - mouseY > 0) {
                        rect(
                            mouseX,
                            mouseY,
                            startMouseX - mouseX,
                            startMouseY - mouseY
                        );
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

        // Changing the slider input value displayed in the options menu
        document.getElementById("rectTool-sizeSliderInput").value =
            self.sizeSlider.value();
        document.getElementById("rectTool-opacitySliderInput").value =
            self.opacitySlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
        opacityValue = self.opacitySlider.value();
    };

    // ------------------------------------------------

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    // adds sliders and display slider value to the options menu
    this.populateOptions = function () {
        let optionsHTML = {
            fillInput:
                "<div id='rect-buttons' style='display:inline-block;margin-top:3px' ></div>  <br>",
            sizeInput:
                "<label class='options-label'>Border Size:</label>  <div id='rect-sliders' style='display:inline-block;margin-top:3px' ></div>  <input type='number' class='number-input' id='rectTool-sizeSliderInput' value='' readonly/>  <br>",
            opacityInput:
                "<label class='options-label'>Opacity:</label>  <div id='rect-sliders-1' style='display:inline-block;margin-top:3px' ></div>  <input type='number' class='number-input' id='rectTool-opacitySliderInput' value='' readonly/>",
        };
        select(".options").html(
            optionsHTML.fillInput +
                optionsHTML.sizeInput +
                optionsHTML.opacityInput
        );
    };

    // ------------------------------------------------

    // To not let mousePress outside of canvas affect things in the canvas
    function mousePressOnCanvas(canvas) {
        if (
            mouseX > canvas.elt.offsetLeft - 60 &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop - 50 &&
            mouseY < canvas.elt.offsetTop + canvas.height - 50
        ) {
            return true;
        }
        return false;
    }

    // ------------------------------------------------
}
