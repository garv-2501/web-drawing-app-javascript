function PaintBrushTool() {
    // set an icon and a name for the object
    this.name = "Paint Brush Tool";
    this.icon = "assets/paintBrushTool.png";

    let lineArray;
    let orignalRadius = 50;
    let mainButton;

    this.setup = function () {
        lineArray = [{ x: -1, y: -1 }];
    };

    this.draw = function () {
        // if the mouse is pressed
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
            }

            colourVal = colourP.convertColourVal(colourP.selectedColour, 3);
            fill(colourVal);
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

    // clears populate options when tool is unselected
    this.unselectTool = function () {
        //updatePixels();
        //clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        select(".options").html("<div id='scissorButton'></div>");
    };
}
