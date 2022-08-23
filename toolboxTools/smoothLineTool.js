function SmoothLineTool() {
    // set an icon and a name for the object
    this.name = "Smooth Line Tool";
    this.icon = "assets/smoothLineTool.png";
    this.FreehandThickness = 5;

    // ------------------------------------------------

    // Stores all points of a line
    let lineArray;
    let self;

    // ------------------------------------------------

    this.setup = function () {
        lineArray = [{ x: -1, y: -1 }];
        self = this;
    };

    // ------------------------------------------------

    this.draw = function () {
        // if the mouse is pressed
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (lineArray[lineArray.length - 1].x != mouseX) {
                lineArray.push({ x: mouseX, y: mouseY });
                console.log(lineArray);
            }

            strokeWeight(self.FreehandThickness);
            noFill();
            beginShape();
            for (let i = 1; i < lineArray.length; i++) {
                curveVertex(lineArray[i].x, lineArray[i].y);
            }
            endShape();
        }
        // if the user has released the mouse we want to set the previousMouse values
        // back to -1.
        // try and comment out these lines and see what happens!
        else {
            lineArray = [{ x: -1, y: -1 }];
        }
    };

    // ------------------------------------------------

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    //adds a button and click handler to the options area. When clicked
    //toggle the line of symmetry between horizonatl to vertical
    this.populateOptions = function () {
        let optionsHTML = {
            penSizePrompt:
                "<label for='input' class='options-label'>Pen Thickness:</label>",
            penSizeInput:
                "<form class='increase-decrease-input'>  <div class='value-button' id='freehand-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='freehand-number-input' value='2'/>  <div class='value-button' id='freehand-increase' value='Increase Value'>+</div>  </form>",
        };
        select(".options").html(
            optionsHTML.penSizePrompt + optionsHTML.penSizeInput
        );
        // Click handler
        // increase
        select("#freehand-increase").mouseClicked(function () {
            let value = parseInt(
                document.getElementById("freehand-number-input").value,
                10
            );
            value = isNaN(value) ? 0 : value;
            value++;
            document.getElementById("freehand-number-input").value = value;
            self.FreehandThickness = value;
        });
        //click handler
        select("#freehand-decrease").mouseClicked(function () {
            value = parseInt(
                document.getElementById("freehand-number-input").value,
                10
            );
            value = isNaN(value) ? 1 : value;
            value < 2 ? (value = 2) : "";
            value--;
            document.getElementById("freehand-number-input").value = value;
            self.FreehandThickness = value;
        });
    };
}
