function SmoothLineTool() {
    // set an icon and a name for the object
    this.name = "Smooth Line Tool";
    this.icon = "assets/smoothLineTool.png";

    // ------------------------------------------------

    // Stores all points of a line
    let lineArray;
    // To store the slider values
    let sizeValue = 5;
    let opacityValue = 100;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);
        this.opacitySlider = createSlider(5, 100, opacityValue, 5);

        // Initialising line Array
        lineArray = [{ x: -1, y: -1 }];
        self = this;

        // Slider for the smoothLineTool in the options menu
        self.sizeSlider.parent("#smoothLine-sliders");
        self.sizeSlider.addClass("tool-sliders");
        self.opacitySlider.parent("#smoothLine-sliders-1");
        self.opacitySlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is released
        if (!mouseIsPressed) {
            lineArray = [{ x: -1, y: -1 }];
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("smoothLine-sizeSliderInput").value =
            self.sizeSlider.value();
        document.getElementById("smoothLine-opacitySliderInput").value =
            self.opacitySlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
        opacityValue = self.opacitySlider.value();
    };

    // ------------------------------------------------

    this.mousePressed = function () {
        // When the mouse is pressed on the canvas, do the following:
        if (mousePressOnCanvas(c)) {
            // This adds a dot when the user presses the mouse but deletes the dot if the
            // mouse is dragged
            loadPixels();
            push();
            strokeWeight(self.sizeSlider.value());
            point(mouseX, mouseY);
            pop();
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }
        }
    };

    // ------------------------------------------------

    this.mouseDragged = function () {
        // When the mouse is dragged on the canvas, do the following:
        if (mousePressOnCanvas(c)) {
            updatePixels();
            // this code adds a point in the line array if the point
            // is not the same as the previous point at regular intervals.
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }
            // Used to give the tool a colour with variable opacity
            let colourVal;
            colourVal = colourP.convertColourVal(
                colourP.selectedColour,
                (self.opacitySlider.value() / 100) * 255
            );
            strokeWeight(self.sizeSlider.value());
            stroke(colourVal);
            noFill();
            // this code draws the shape with curved vertices so that the line remains smooth
            beginShape();
            for (let i = 1; i < lineArray.length; i++) {
                curveVertex(lineArray[i].x, lineArray[i].y);
            }
            endShape();
        } else {
            // Added so that the previous line doesn't disappear when you draw a line
            // that doesn't start from the canvas
            loadPixels();
        }
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
        // An object that stores different parts of the HTML code that needs to be added to the options menu
        let optionsHTML = {
            sizeInput:
                "<label class='options-label'>Size:</label>  <div id='smoothLine-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='smoothLine-sizeSliderInput' value='' readonly/>  <br>",
            opacityInput:
                "<label class='options-label'>Opacity:</label>  <div id='smoothLine-sliders-1' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='smoothLine-opacitySliderInput' value='' readonly/>",
        };
        select(".options").html(
            optionsHTML.sizeInput + optionsHTML.opacityInput
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
