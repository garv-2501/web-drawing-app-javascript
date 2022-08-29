function SprayCanTool() {
    // set an icon and a name for the object
    this.name = "sprayCan Tool";
    this.icon = "assets/sprayCanTool.png";

    // ------------------------------------------------

    // To store the slider values
    let thicknessValue = 2;
    let pointsValue = 12;
    let spreadValue = 30;

    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.thicknessSlider = createSlider(1, 20, thicknessValue, 1);
        this.pointsSlider = createSlider(1, 200, pointsValue, 1);
        this.spreadSlider = createSlider(1, 300, spreadValue, 1);

        self = this;

        // Slider for the spray can tool in the options menu
        self.thicknessSlider.parent("#sprayCan-sliders");
        self.thicknessSlider.addClass("tool-sliders");

        self.pointsSlider.parent("#sprayCan-sliders-1");
        self.pointsSlider.addClass("tool-sliders");

        self.spreadSlider.parent("#sprayCan-sliders-2");
        self.spreadSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            for (let i = 0; i < self.pointsSlider.value(); i++) {
                strokeWeight(self.thicknessSlider.value());
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                stroke(colourVal);
                point(
                    random(
                        mouseX - self.spreadSlider.value(),
                        mouseX + self.spreadSlider.value()
                    ),
                    random(
                        mouseY - self.spreadSlider.value(),
                        mouseY + self.spreadSlider.value()
                    )
                );
            }
        }

        // Changing the slider input value displayed in the options menu
        document.getElementById("sprayCan-thicknessSliderInput").value =
            self.thicknessSlider.value();
        document.getElementById("sprayCan-pointsSliderInput").value =
            self.pointsSlider.value();
        document.getElementById("sprayCan-spreadSliderInput").value =
            self.spreadSlider.value();
        // Store the slider value:
        thicknessValue = self.thicknessSlider.value();
        pointsValue = self.pointsSlider.value();
        spreadValue = self.spreadSlider.value();
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
            thicknessInput:
                "<label class='options-label'>Thickness:</label>  <div id='sprayCan-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='sprayCan-thicknessSliderInput' value='' readonly/>  <br>",
            pointsInput:
                "<label class='options-label'>Points:</label>  <div id='sprayCan-sliders-1' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='sprayCan-pointsSliderInput' value='' readonly/>  <br>",
            spreadInput:
                "<label class='options-label'>Spread:</label>  <div id='sprayCan-sliders-2' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='sprayCan-spreadSliderInput' value='' readonly/>",
        };
        select(".options").html(
            optionsHTML.thicknessInput +
                optionsHTML.pointsInput +
                optionsHTML.spreadInput
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
