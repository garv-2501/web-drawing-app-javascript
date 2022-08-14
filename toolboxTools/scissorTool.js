function ScissorTool() {
  // set an icon and a name for the object
  this.name = "Scissor Tool";
  this.icon = "assets/scissorTool.png";

  let selectButton
  let selectMode;
  let selectedArea;
  let selectedPixels


  this.setup = function() {

    selectMode = false;
    selectedArea = {x:0, y:0, w:0, h:0};

    // Main button for the scissorTool
    scissorButton = createButton('cut selected area');
    scissorButton.parent("#scissorButton");
    scissorButton.class(".headButton")

    scissorButton.mousePressed(function () {
      loadPixels();
      if (selectMode == false) {
        
        selectMode = true;
        scissorButton.html("select area")
        
        updatePixels();

        selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h)
      } else {
        selectMode = false;
        selectedArea = {x:0, y:0, w:10, h:10};
        scissorButton.html("cut selected area")
      }
    })
    
  }

  this.draw = function () {
    if (mouseIsPressed) {
      if (selectMode == false) {
        updatePixels();
        loadPixels();
        push();
        noStroke();
        fill(80, 80, 80, 80);
        rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        pop();
      }
    }
  }

  this.mousePressed = function() {
    if (selectMode == false) {
      selectedArea.x = mouseX;
      selectedArea.y = mouseY;
      selectedArea.w = 0;
      selectedArea.w = 0
    }
  }

  this.mouseDragged = function() {
    if (selectMode == false) {
      let w = mouseX - selectedArea.x;
      let h = mouseY - selectedArea.y;

      selectedArea.w = w;
      selectedArea.h = h;
    }
    if (selectMode == true) {
      updatePixels();
      push();
      fill(255);
      noStroke();
      rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
      pop();
      image(selectedPixels, mouseX - (selectedArea.w / 2), mouseY - (selectedArea.h / 2))
    }
  }

  // clears populate options when tool is unselected
  this.unselectTool = function() {
    //updatePixels();
    //clear options
    select(".options").html("");
  }

  this.populateOptions = function () {
    select(".options").html("<div id='scissorButton'></div>")
  }
}