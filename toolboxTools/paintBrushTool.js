function PaintBrushTool() {
    // set an icon and a name for the object
    this.name = "Paint Brush Tool";
    this.icon = "assets/paintBrushTool.png";

    // ------------------------------------------------

    let lineArray;
    let orignalRadius;

    // Sliders for the options menu:
    let sizeSlider;
    let opacitySlider;

    // ------------------------------------------------

    this.setup = function () {
        lineArray = [{ x: -1, y: -1 }];

        // Slider for the paintBrushTool in the options menu
        sizeSlider = createSlider(30, 100, 50, 2);
        sizeSlider.parent("#paintBrush-sliders");
        opacitySlider = createSlider(1, 60, 3, 1);
        opacitySlider.parent("#paintBrush-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }

            let colourVal;
            colourVal = colourP.convertColourVal(
                colourP.selectedColour,
                opacitySlider.value()
            );
            fill(colourVal);
            orignalRadius = sizeSlider.value();
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
        select(".options").html("<div id='paintBrush-sliders'></div>");
    };
}
