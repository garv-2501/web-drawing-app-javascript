function SprayCanTool() {
    // set an icon and a name for the object
    this.name = "sprayCan Tool";
    this.icon = "assets/sprayCanTool.png";
    // set the number of points and the spread of the spray
    this.sprayThickness = 2;
    this.sprayPoints = 13;
    this.spraySpread = 30;

    let self = this;

    this.draw = function () {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            for (let i = 0; i < self.sprayPoints; i++) {
                strokeWeight(self.sprayThickness);
                let colourVal;
                colourVal = colourP.convertColourVal(
                    colourP.selectedColour,
                    255
                );
                stroke(colourVal);
                point(
                    random(
                        mouseX - self.spraySpread,
                        mouseX + self.spraySpread
                    ),
                    random(mouseY - self.spraySpread, mouseY + self.spraySpread)
                );
            }
        }
    };

    this.unselectTool = function () {
        //updatePixels();
        //clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        let optionsHTML = {
            sprayThicknessPrompt:
                "<label for='input' class='options-label'>Spray Thickness:</label>",
            sprayThicknessInput:
                "<form class='increase-decrease-input'>  <div class='value-button' id='spray-thickness-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='spray-thickness-number-input' value='2'/>  <div class='value-button' id='spray-thickness-increase' value='Increase Value'>+</div>  </form>  <br>",
            sprayPointsPrompt:
                "<label for='input' class='options-label'>Spray Points:</label>",
            sprayPointsInput:
                "<form class='increase-decrease-input'>  <div class='value-button' id='spray-points-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='spray-points-number-input' value='10'/>  <div class='value-button' id='spray-points-increase' value='Increase Value'>+</div>  </form>  <br>",
            spraySpreadPrompt:
                "<label for='input' class='options-label'>Spray Spread:</label>",
            spraySpreadInput:
                "<form class='increase-decrease-input'>  <div class='value-button' id='spray-spread-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='spray-spread-number-input' value='30'/>  <div class='value-button' id='spray-spread-increase' value='Increase Value'>+</div>  </form>",
        };
        select(".options").html(
            optionsHTML.sprayThicknessPrompt +
                optionsHTML.sprayThicknessInput +
                optionsHTML.sprayPointsPrompt +
                optionsHTML.sprayPointsInput +
                optionsHTML.spraySpreadPrompt +
                optionsHTML.spraySpreadInput
        );

        // Click handler - spray thickness
        select("#spray-thickness-increase").mouseClicked(function () {
            let thicknessValue = parseInt(
                document.getElementById("spray-thickness-number-input").value,
                10
            );
            thicknessValue = isNaN(thicknessValue) ? 0 : thicknessValue;
            thicknessValue++;
            document.getElementById("spray-thickness-number-input").value =
                thicknessValue;
            self.sprayThickness = thicknessValue;
        });
        select("#spray-thickness-decrease").mouseClicked(function () {
            thicknessValue = parseInt(
                document.getElementById("spray-thickness-number-input").value,
                10
            );
            thicknessValue = isNaN(thicknessValue) ? 0 : thicknessValue;
            thicknessValue < 2 ? (thicknessValue = 2) : "";
            thicknessValue--;
            document.getElementById("spray-thickness-number-input").value =
                thicknessValue;
            self.sprayThickness = thicknessValue;
        });

        // Click handler - number of spray points
        select("#spray-points-increase").mouseClicked(function () {
            let pointsValue = parseInt(
                document.getElementById("spray-points-number-input").value,
                10
            );
            pointsValue = isNaN(pointsValue) ? 0 : pointsValue;
            pointsValue++;
            document.getElementById("spray-points-number-input").value =
                pointsValue;
            self.sprayPoints = pointsValue;
        });
        select("#spray-points-decrease").mouseClicked(function () {
            pointsValue = parseInt(
                document.getElementById("spray-points-number-input").value,
                10
            );
            pointsValue = isNaN(pointsValue) ? 0 : pointsValue;
            pointsValue < 2 ? (pointsValue = 2) : "";
            pointsValue--;
            document.getElementById("spray-points-number-input").value =
                pointsValue;
            self.sprayPoints = pointsValue;
        });

        // Click handler - spray spread
        select("#spray-spread-increase").mouseClicked(function () {
            let spreadValue = parseInt(
                document.getElementById("spray-spread-number-input").value,
                10
            );
            spreadValue = isNaN(spreadValue) ? 0 : spreadValue;
            spreadValue++;
            document.getElementById("spray-spread-number-input").value =
                spreadValue;
            self.spraySpread = spreadValue;
        });
        select("#spray-spread-decrease").mouseClicked(function () {
            spreadValue = parseInt(
                document.getElementById("spray-spread-number-input").value,
                10
            );
            spreadValue = isNaN(spreadValue) ? 0 : spreadValue;
            spreadValue < 2 ? (spreadValue = 2) : "";
            spreadValue--;
            document.getElementById("spray-spread-number-input").value =
                spreadValue;
            self.spraySpread = spreadValue;
        });
    };
}
