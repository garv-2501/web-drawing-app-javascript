function ScissorTool() {
    // set an icon and a name for the object
    this.name = "Scissor Tool";
    this.icon = "assets/scissorTool.png";

    // ------------------------------------------------

    // Used to loadPixels just once in a loop
    let scissorMode;
    let selectedArea;
    let selectedPixels;

    // Buttons for the options menu:
    let scissorButton;

    // ------------------------------------------------

    this.setup = function () {
        scissorMode = 0;
        selectedArea = { x: 0, y: 0, w: 0, h: 0 };

        // Main button and paragraph for the scissorTool
        scissorButton = createButton("cut selected area");
        scissorButton.parent("#scissorButton");
        scissorButton.class("headButton");

        scissorDescription = createP(
            "Select some area and press the 'cut selected area' button"
        );
        scissorDescription.parent("#scissorButton");
        scissorDescription.style("margin", "5px");

        loadPixels();
        scissorButton.mousePressed(function () {
            if (scissorMode == 0) {
                scissorMode = 1;
                scissorButton.html("Select area");
                scissorDescription.html(
                    "Click where you want to paste the selected area. Click on the 'Select area' button to <br> paste and select a new area"
                );
                updatePixels();
                selectedPixels = get(
                    selectedArea.x,
                    selectedArea.y,
                    selectedArea.w,
                    selectedArea.h
                );
                // drawing a white rectangle
                push();
                fill(255);
                noStroke();
                updatePixels();
                rect(
                    selectedArea.x,
                    selectedArea.y,
                    selectedArea.w,
                    selectedArea.h
                );
                pop();
            } else {
                scissorMode = 0;
                selectedArea = { x: 0, y: 0, w: 10, h: 10 };
                scissorButton.html("Cut new selected area");
                scissorDescription.html(
                    "Select some area and press the 'cut selected area' button"
                );
                loadPixels();
            }
        });
    };

    // ------------------------------------------------

    this.draw = function () {
        if (mouseIsPressed && mousePressOnCanvas(c)) {
            if (scissorMode == 0) {
                updatePixels();
                push();
                noStroke();
                fill(80, 80, 80, 80);
                rect(
                    selectedArea.x,
                    selectedArea.y,
                    selectedArea.w,
                    selectedArea.h
                );
                pop();
            }
        }
    };

    // ------------------------------------------------

    this.mousePressed = function () {
        if (mousePressOnCanvas(c)) {
            if (scissorMode == 0) {
                selectedArea.x = mouseX;
                selectedArea.y = mouseY;
                selectedArea.w = 0;
                selectedArea.w = 0;
            } else {
                image(
                    selectedPixels,
                    mouseX - selectedArea.w / 2,
                    mouseY - selectedArea.h / 2
                );
                loadPixels();
            }
        }
    };

    // ------------------------------------------------

    this.mouseDragged = function () {
        if (scissorMode == 0) {
            let w = mouseX - selectedArea.x;
            let h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;
        }
    };

    // ------------------------------------------------

    // clears populate options when tool is unselected
    this.unselectTool = function () {
        // This will remove the grey rectangle when you click on another tool
        updatePixels();
        //clear options
        select(".options").html("");
    };

    // ------------------------------------------------

    this.populateOptions = function () {
        select(".options").html(
            "<div id='scissorButton' style='display:inline-block;margin-top:5px'></div>"
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
