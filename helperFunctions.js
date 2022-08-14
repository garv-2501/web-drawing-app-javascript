function HelperFunctions() {
    //p5.dom click click events. Notice that there is no this. at the
    //start we don't need to do that here because the event will
    //be added to the button and doesn't 'belong' to the object
  
    //event handler for the clear button event. Clears the screen
    select("#clearButton").mouseClicked(function () {
      background(255);
  
      //call loadPixels to update the drawing state
      //this is needed for the mirror tool
      loadPixels();
    });
  
    //event handler for the save image button. saves the canvsa to the
    //local file system.
    select("#saveImageButton").mouseClicked(function () {
      let result = window.prompt("Name your project:");
      if (result == "") {
        d = day();
        m = month();
        y = year();
        dateString = d + "_" + m + "_" + y + ".png";
        saveCanvas(dateString);
      } else if (result == null) {
        console.log("Did not save the file")
      } else {
        saveCanvas(result)
      }
    });

    
}

// To not let mousePress outside of canvas affect things in the canvas
function mousePressOnCanvas(canvas) {
  if (
    mouseX > (canvas.elt.offsetLeft - 70) &&
    mouseX < (canvas.elt.offsetLeft + canvas.width - 20) &&
    mouseY > (canvas.elt.offsetTop - 60) &&
    mouseY < (canvas.elt.offsetTop + canvas.height - 30)
  ) {
    return true;
  }
  return false;
}