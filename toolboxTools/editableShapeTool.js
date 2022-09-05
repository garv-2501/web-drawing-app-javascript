function EditableShapeTool() {
    // set an icon and a name for the object
    this.name = "Editable Shape Tool";
    this.icon = "assets/editableShapeTool.png";

    // ------------------------------------------------

    // Used to change the behaviour of the tool
    let editMode;
    // Stores the vertices of the current shape (array)
    let currentShape;
    // To store the slider values
    let sizeValue = 5;

    //this changes in the p5.dom click handler. So storing it as
    //a variable self now means we can still access this in the handler
    let self;

    // ------------------------------------------------

    this.setup = function () {
        // Sliders for the options menu:
        this.sizeSlider = createSlider(1, 50, sizeValue, 1);

        // Initialising variables
        editMode = false;
        currentShape = [];

        self = this;

        // Slider for the freehandTool in the options menu
        self.sizeSlider.parent("#editableShapes-sliders");
        self.sizeSlider.addClass("tool-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        updatePixels();

        // if the mouse is pressed on the canvas, do the following
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (!editMode) {
                // Adding verticies to the currentShape array
                currentShape.push({
                    x: mouseX,
                    y: mouseY,
                });
            } else {
                // When editmode = false, edit the shape by moving the vertex selected
                for (i = 0; i < currentShape.length; i++) {
                    if (
                        dist(
                            mouseX,
                            mouseY,
                            currentShape[i].x,
                            currentShape[i].y
                        ) < 25
                    ) {
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }
            }
        }

        // Drawing the shape
        beginShape();
        // Giving the shape the same stroke size as the slider value
        strokeWeight(self.sizeSlider.value());
        // To add a colour with variable opacity
        let colourVal;
        colourVal = colourP.convertColourVal(colourP.selectedColour, 255);
        stroke(colourVal);
        noFill();
        for (let i = 0; i < currentShape.length; i++) {
            vertex(currentShape[i].x, currentShape[i].y);

            // showing dots to move when edit mode on
            if (editMode) {
                ellipse(currentShape[i].x, currentShape[i].y, 5, 5);
            }
        }
        endShape();

        // Changing the slider input value displayed in the options menu
        document.getElementById("editableShapes-sizeSliderInput").value =
            self.sizeSlider.value();
        // Store the slider value:
        sizeValue = self.sizeSlider.value();
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
            finishButton:
                "<button class='headButton' id='finishButton'>Finish Shape</button>",
            editButton:
                "<button class='headButton' id='editButton'>Edit Shape</button>  <br>",
            sizeInput:
                "<label class='options-label'>Size:</label>  <div id='editableShapes-sliders' style='display:inline-block;margin-top:5px' ></div>  <input type='number' class='number-input' id='editableShapes-sizeSliderInput' value='' readonly/>",
        };
        select(".options").html(
            optionsHTML.finishButton +
                optionsHTML.editButton +
                optionsHTML.sizeInput
        );

        // click handler for edit button
        select("#editButton").mouseClicked(function () {
            if (editMode) {
                editMode = false;
                select("#editButton").html("Edit shape");
            } else {
                if (currentShape.length != 0) {
                    editMode = true;
                    select("#editButton").html("Add vertices");
                }
            }
        });

        // click handler for finish button
        select("#finishButton").mouseClicked(function () {
            editMode = false;
            select("#editButton").html("Edit shape");
            draw();
            loadPixels();
            currentShape = [];
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
