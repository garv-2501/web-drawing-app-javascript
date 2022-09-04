function MirrorDrawTool() {
    this.name = "Mirror Tool";
    this.icon = "assets/mirrorDrawTool.png";

    //which axis is being mirrored (x or y) x is default
    this.axis = "x";
    //line of symmetry is halfway across the screen
    this.lineOfSymmetry = width / 2;

    // ------------------------------------------------

    //this changes in the p5.dom click handler. So storing it as
    //a variable self now means we can still access this in the handler
    let self;

    // for smooth drawing, we will create a line between each registered mouse coord.
    // and the previous mouse coord. Hence, will use previousMouseX and Y to store these coord.
    //set it to -1 to begin with
    let previousMouseX;
    let previousMouseY;
    //mouse coordinates for the other side of the Line of symmetry.
    let previousOppositeMouseX;
    let previousOppositeMouseY;
    // To store the slider values
    let sizeValue = 5;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);

        // Initialising previous (x, y) position
        previousMouseX = -1;
        previousMouseY = -1;

        previousOppositeMouseX = -1;
        previousOppositeMouseY = -1;

        self = this;

        // Slider for the freehandTool in the options menu
        self.sizeSlider.parent("#mirrorTool-sliders");
        self.sizeSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        //display the last save state of pixels
        updatePixels();

        // if the mouse is pressed on the canvas, do the following
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            //if the previous values are -1 set them to the current mouse location
            //and mirrored positions
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
                previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
            }

            //if there are values in the previous locations
            //draw a line between them and the current positions
            else {
                strokeWeight(self.sizeSlider.value());
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                stroke(colourVal);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;

                //these are for the mirrored drawing the other side of the
                //line of symmetry
                let oX = this.calculateOpposite(mouseX, "x");
                let oY = this.calculateOpposite(mouseY, "y");
                line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
                previousOppositeMouseX = oX;
                previousOppositeMouseY = oY;
            }
        }
        //if the mouse isn't pressed reset the previous values to -1
        else {
            previousMouseX = -1;
            previousMouseY = -1;

            previousOppositeMouseX = -1;
            previousOppositeMouseY = -1;
        }

        //after the drawing is done save the pixel state. We don't want the
        //line of symmetry to be part of our drawing
        loadPixels();

        //push the drawing state so that we can set the stroke weight and colour
        push();
        strokeWeight(10);
        stroke("red");
        //draw the line of symmetry
        if (this.axis == "x") {
            line(width / 2, 0, width / 2, height);
        } else {
            line(0, height / 2, width, height / 2);
        }
        //return to the original stroke
        pop();

        // Changing the slider input value displayed in the options menu
        document.getElementById("mirrorTool-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
    };

    // ------------------------------------------------

    /*calculate an opposite coordinate the other side of the
     *symmetry line.
     *@param n number: location for either x or y coordinate
     *@param a [x,y]: the axis of the coordinate (y or y)
     *@return number: the opposite coordinate
     */
    this.calculateOpposite = function (n, a) {
        //if the axis isn't the one being mirrored return the same
        //value
        if (a != this.axis) {
            return n;
        }

        //if n is less than the line of symmetry return a coorindate
        //that is far greater than the line of symmetry by the distance from
        //n to that line.
        if (n < this.lineOfSymmetry) {
            return this.lineOfSymmetry + (this.lineOfSymmetry - n);
        }

        //otherwise a coordinate that is smaller than the line of symmetry
        //by the distance between it and n.
        else {
            return this.lineOfSymmetry - (n - this.lineOfSymmetry);
        }
    };

    // ------------------------------------------------

    //when the tool is deselected update the pixels to just show the drawing and
    //hide the line of symmetry. Also clear options
    this.unselectTool = function () {
        updatePixels();
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    //adds a button and click handler to the options area. When clicked
    //toggle the line of symmetry between horizonatl to vertical
    this.populateOptions = function () {
        select(".options").html(
            "<button class='headButton' id='directionButton'>Make Horizontal</button>  <br>  <label class='options-label'>Size:</label>  <div id='mirrorTool-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='mirrorTool-sizeSliderInput' value='' readonly/>"
        );
        // 	//click handler
        select("#directionButton").mouseClicked(function () {
            var button = select("#" + this.elt.id);
            if (self.axis == "x") {
                self.axis = "y";
                self.lineOfSymmetry = height / 2;
                button.html("Make Vertical");
            } else {
                self.axis = "x";
                self.lineOfSymmetry = width / 2;
                button.html("Make Horizontal");
            }
        });
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
