// Global variables that will store the toolbox, colour palette
// and the helper functions
let toolbox = null;
let colourP = null;
let helpers = null;

// Variable to store the main canvas
let c;

// Preloading the star image for the stamp tool
let star;
function preload() {
  star = loadImage("./assets/star.jpeg");
}

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  background(255)
  c.parent("content");

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new EraserTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new MirrorDrawTool());
  toolbox.addTool(new StampTool());
  toolbox.addTool(new RectTool());
  toolbox.addTool(new EllipseTool());
  toolbox.addTool(new EditableShapeTool())
}

function draw() {
  
  //call the draw function from the selected tool.
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
  
}
