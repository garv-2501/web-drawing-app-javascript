function PaintBrushTool() {
    // set an icon and a name for the object
    this.name = "Paint Brush Tool";
    this.icon = "assets/paintBrushTool.png";

    let previousMouseX = -1;
    let previousMouseY = -1;
    let orignalRadius = 50;

    this.setup = function () {};

    this.draw = function () {};

    function paintStroke(r, g, b, a, startX, startY) {
        noStroke();
        fill(r, g, b, a);

        for (let j = 0; j <= 10; j++) {
            let randomVal = random(2.0) - 1.0;

            beginShape();

            for (let i = 0; i <= 360; i += 20) {
                0;
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

    this.mousePressed = function () {
        paintStroke(255, 0, 0, 5, mouseX, mouseY);
    };

    this.mouseDragged = function () {
        paintStroke(255, 0, 0, 5, mouseX, mouseY);
    };

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
