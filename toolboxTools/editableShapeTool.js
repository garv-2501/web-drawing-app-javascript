function EditableShapeTool() {
    // set an icon and a name for the object
    this.name = "Editable Shape Tool";
    this.icon = "assets/editableShapeTool.png";

    let editMode = false;
    let currentShape = [];
  
    this.draw = function () {
      noFill();
      updatePixels();

      if (mouseIsPressed && mousePressOnCanvas(c)) {
        if (!editMode) {
          // Adding verticies to the currentShape array
          currentShape.push({
            x: mouseX,
            y: mouseY,
          });
        } else {
          for (i = 0; i < currentShape.length; i++) {
            if (dist(mouseX, mouseY, currentShape[i].x, currentShape[i].y) < 15) {
              currentShape[i].x = mouseX;
              currentShape[i].y = mouseY;
            }
          }
        }
      }
    
      beginShape();
      for (let i = 0; i < currentShape.length; i++) {
        vertex(currentShape[i].x, currentShape[i].y);
    
        // showing dots to move when edit mode on
        if (editMode) {
          ellipse(currentShape[i].x, currentShape[i].y, 5, 5);
        }
      }
      endShape();
    };

    this.unselectTool = function() {
      updatePixels();
      //clear options
      select(".options").html("");
    }
  
    this.populateOptions = function () {
      let optionsHTML = {
        finishButton: "<button class='headButton' id='finishButton'>Finish Shape</button> <br>",
        editButton: "<button class='headButton' id='editButton'>Edit Shape</button>"
      }
      select(".options").html(optionsHTML.finishButton + optionsHTML.editButton);

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
      select("#finishButton").mouseClicked(function() {
        editMode = false;
        select("#editButton").html("Edit shape")
        draw();
        loadPixels();
        currentShape = [];
      })
    };

    // To not let mousePress outside of canvas affect things in the canvas
    function mousePressOnCanvas(canvas) {
      if (
        mouseX > (canvas.elt.offsetLeft - 60) &&
        mouseX < (canvas.elt.offsetLeft + canvas.width) &&
        mouseY > (canvas.elt.offsetTop - 50) &&
        mouseY < (canvas.elt.offsetTop + canvas.height - 30)
      ) {
        return true;
      }
      return false;
    }
  }
  