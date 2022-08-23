// Global variables that will store the toolbox, colour palette
// and the helper functions
let toolbox = null;
let colourP = null;
let helpers = null;

// Variable to store the main canvas
let c;

// Preloading all images for the stamp tool
let star;
let cloud;
let grass;
let smoke;
let rain;

// Preload function for the stamp tool images
function preload() {
    star = loadImage("./assets/star.jpeg");
}

// Setup function, runs once
function setup() {
    // Canvas to fill the content div from index.html
    canvasContainer = select("#content");
    c = createCanvas(
        canvasContainer.size().width + 15,
        canvasContainer.size().height
    );
    c.parent("content");

    // Helper and color palette functions
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    // For storing all the tools in the sidebar
    toolbox = new Toolbox();

    // The tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new PaintBrushTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new RectTool());
    toolbox.addTool(new EllipseTool());
    toolbox.addTool(new EditableShapeTool());
    toolbox.addTool(new ScissorTool());

    // Background of the canvas
    background(255);
}

function draw() {
    //call the draw function from the selected tool.
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}

function mousePressed() {
    // Call the mousePressed function from the selected tool.
    if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
        toolbox.selectedTool.mousePressed();
    }
}

function mouseDragged() {
    // Call the mouseDragged function from the selected tool.
    if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
        toolbox.selectedTool.mouseDragged();
    }
}
