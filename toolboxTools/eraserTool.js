function EraserTool() {
    // set an icon and a name for the object
    this.name = "Eraser Tool";
    this.icon = "assets/eraserTool.png";

    // ------------------------------------------------

    // for smooth drawing, we will create a line between each registered mouse coord.
    // and the previous mouse coord. Hence, will use previousMouseX and Y to store these coord.
    let previousMouseX;
    let previousMouseY;

    let self;

    // Slider for the options menu:
    let sizeSlider;
    let opacitySlider;

    // ------------------------------------------------

    this.setup = function () {
        previousMouseX = -1;
        previousMouseY = -1;

        self = this;

        // Slider for the eraser in the options menu
        sizeSlider = createSlider(2, 200, 40);
        sizeSlider.parent("#eraser-sliders");
        opacitySlider = createSlider(1, 100, 100);
        opacitySlider.parent("#eraser-sliders");
    };

    // ------------------------------------------------

    this.draw = function () {
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            // check if they previousX and Y are -1. set them to the current
            // mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            // if we already have values for previousX and Y we can draw a line from
            // there to the current mouse location
            else {
                push();
                strokeWeight(sizeSlider.value() + 10);
                stroke(255, (opacitySlider.value() / 100) * 255);
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                pop();
            }
            loadPixels();
            push();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(mouseX, mouseY, sizeSlider.value());
            pop();
        }
        // if the user has released the mouse we want to set the previousMouse values
        // back to -1.
        // try and comment out these lines and see what happens!
        else {
            previousMouseX = -1;
            previousMouseY = -1;

            updatePixels();
            push();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(mouseX, mouseY, sizeSlider.value());
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
        select(".options").html("<div id='eraser-sliders'></div>");
    };

    function mousePressOnCanvas(canvas) {
        if (
            mouseX > canvas.elt.offsetLeft - 60 &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop - 50 &&
            mouseY < canvas.elt.offsetTop + canvas.height - 30
        ) {
            return true;
        }
        return false;
    }
}
