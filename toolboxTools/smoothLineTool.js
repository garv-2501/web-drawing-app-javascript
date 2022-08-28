function SmoothLineTool() {
    // set an icon and a name for the object
    this.name = "Smooth Line Tool";
    this.icon = "assets/smoothLineTool.png";

    // ------------------------------------------------

    // Stores all points of a line
    let lineArray;
    // To store the slider values
    let sizeValue = 5;
    let opacityValue = 255;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);
        this.opacitySlider = createSlider(10, 255, opacityValue, 5);

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
        if (mousePressOnCanvas(c)) {
            // To just add a dot when the user presses but doesn't drag the mouse
            loadPixels();
            point(mouseX, mouseY);
        }
    };

    // ------------------------------------------------

    this.mouseDragged = function () {
        if (mousePressOnCanvas(c)) {
            updatePixels();
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }
            strokeWeight(self.sizeSlider.value());
            let colourVal;
            colourVal = colourP.convertColourVal(
                colourP.selectedColour,
                self.opacitySlider.value()
            );
            stroke(colourVal);
            noFill();
            beginShape();
            for (let i = 1; i < lineArray.length; i++) {
                curveVertex(lineArray[i].x, lineArray[i].y);
            }
            endShape();
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
            mouseY < canvas.elt.offsetTop + canvas.height - 50
        ) {
            return true;
        }
        return false;
    }
}
