function StampTool() {
    // set an icon and a name for the object
    this.name = "Stamp Tool";
    this.icon = "assets/stampTool.png";

    this.stampSize = 20;
    this.stampFreq = 20;

    // ------------------------------------------------

    // To store the slider values
    let sizeValue = 150;
    let selectedImage;
    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Select button for the options menu:
        this.selectStamp = createSelect();
        // Adding items to the select button:
        this.selectStamp.option("Grass");
        this.selectStamp.option("Cloud");
        this.selectStamp.option("Rain");
        this.selectStamp.option("Smoke");

        this.sizeSlider = createSlider(10, 400, sizeValue, 1);

        // Initialising previous (x, y) position
        previousMouseX = -1;
        previousMouseY = -1;

        self = this;

        // Slider for the stamp tool in the options menu
        self.sizeSlider.parent("#stamp-sliders");
        self.sizeSlider.addClass("tool-sliders");
        // Select for stamp tool (contains different images)
        self.selectStamp.parent("#stamp-select");
        self.selectStamp.style("width", "150px");
        self.selectStamp.style("height", "25px");
        self.selectStamp.style("font-weight", "bold");
    };

    // ------------------------------------------------

    this.draw = function () {
        // Changing the slider input value displayed in the options menu
        document.getElementById("stamp-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
    };

    // ------------------------------------------------

    this.mousePressed = function () {
        if (mousePressOnCanvas(c)) {
            let stampX = mouseX - self.sizeSlider.value() / 2;
            let stampY = mouseY - self.sizeSlider.value() / 2;
            if (self.selectStamp.value() == "Grass") {
                image(
                    stampGrass,
                    stampX,
                    stampY,
                    self.sizeSlider.value(),
                    self.sizeSlider.value()
                );
            } else if (self.selectStamp.value() == "Cloud") {
                image(
                    stampCloud,
                    stampX,
                    stampY,
                    self.sizeSlider.value(),
                    self.sizeSlider.value()
                );
            } else if (self.selectStamp.value() == "Rain") {
                image(
                    stampRain,
                    stampX,
                    stampY,
                    self.sizeSlider.value(),
                    self.sizeSlider.value()
                );
            } else if (self.selectStamp.value() == "Smoke") {
                image(
                    stampSmoke,
                    stampX,
                    stampY,
                    self.sizeSlider.value(),
                    self.sizeSlider.value()
                );
            }
        }
    };

    // ------------------------------------------------

    // adds sliders and display slider value to the options menu
    this.populateOptions = function () {
        let optionsHTML = {
            sizeInput:
                "<label class='options-label'>Size:</label>  <div id='stamp-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='stamp-sizeSliderInput' value='' readonly/>  <br>",
            selectInput:
                "<label class='options-label'>Select Image:</label>  <div id='stamp-select' style='display:inline-block;margin-top:5px' ></div>",
        };
        select(".options").html(
            optionsHTML.sizeInput + optionsHTML.selectInput
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
