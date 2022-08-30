// Global variables that will store the toolbox, colour palette
// and the helper functions
let toolbox = null;
let colourP = null;
let helpers = null;

// Variable to store the main canvas
let c;

// Preloading all images for the stamp tool
let star;
let stampCloud;
let stampGrass;
let stampSmoke;
let stampRain;

// Preload function for the stamp tool images
function preload() {
    // Images for the stamp tool
    star = loadImage("./assets/star.jpeg");
    stampCloud = loadImage("./assets/stampTool_img/cloud.png");
    stampGrass = loadImage("./assets/stampTool_img/grass.png");
    stampRain = loadImage("./assets/stampTool_img/rain.png");
    stampSmoke = loadImage("./assets/stampTool_img/smoke.png");
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
    toolbox.addTool(new SmoothLineTool());
    toolbox.addTool(new PaintBrushTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new EditableShapeTool());
    toolbox.addTool(new ScissorTool());
    toolbox.addTool(new RectTool());
    toolbox.addTool(new EllipseTool());

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
