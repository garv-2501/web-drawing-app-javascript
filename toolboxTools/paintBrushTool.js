function PaintBrushTool() {
    // set an icon and a name for the object
    this.name = "Paint Brush Tool";
    this.icon = "assets/paintBrushTool.png";

    // ------------------------------------------------

    // Stores all points of a line
    let lineArray;
    let orignalRadius;

    // Sliders for the options menu:
    let sizeValue = 40;
    let opacityValue = 70;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(30, 200, sizeValue, 1);
        this.opacitySlider = createSlider(1, 100, opacityValue, 1);

        // Initialising line Array
        lineArray = [{ x: -1, y: -1 }];
        self = this;

        // Slider for the paintBrushTool in the options menu
        self.sizeSlider.parent("#paintBrush-sliders");
        self.sizeSlider.addClass("tool-sliders");
        self.opacitySlider.parent("#paintBrush-sliders-1");
        self.opacitySlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }

            let colourVal;
            let opacity;
            opacity = (self.opacitySlider.value() / 100) * 255;
            colourVal = colourP.convertColourVal(
                colourP.selectedColour,
                self.opacitySlider.value()
            );
            fill(colourVal);
            orignalRadius = self.sizeSlider.value();
            strokeWeight(orignalRadius);
            for (let i = 1; i < lineArray.length; i++) {
                paintStroke(lineArray[i].x, lineArray[i].y);
            }
        }
        // if the user has released the mouse we want to set the previousMouse values
        // back to -1.
        // try and comment out these lines and see what happens!
        else {
            lineArray = [{ x: -1, y: -1 }];
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("paintBrush-sizeSliderInput").value =
            self.sizeSlider.value();
        document.getElementById("paintBrush-opacitySliderInput").value =
            self.opacitySlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
        opacityValue = self.opacitySlider.value();
    };

    // ------------------------------------------------

    function paintStroke(startX, startY) {
        noStroke();

        for (let j = 0; j <= 10; j++) {
            let randomVal = random(2.0) - 1.0;

            beginShape();

            for (let i = 0; i <= 360; i += 20) {
                let radius =
                    orignalRadius +
                    orignalRadius * 0.7 * (noise(10 * randomVal + i) * 2 - 1);

                let x = radius * cos(i);
                let y = radius * sin(i);
                curveVertex(startX + x, startY - y);
            }

            endShape();
        }
    }

    // ------------------------------------------------

    // clears populate options when tool is unselected
    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    this.populateOptions = function () {
        let optionsHTML = {
            sizeInput:
                "<label class='options-label'>Size:</label>  <div id='paintBrush-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='paintBrush-sizeSliderInput' value='' readonly/>  <br>",
            opacityInput:
                "<label class='options-label'>Opacity:</label>  <div id='paintBrush-sliders-1' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='paintBrush-opacitySliderInput' value='' readonly/>",
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
