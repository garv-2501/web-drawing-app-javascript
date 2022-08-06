function editableShapesTool() {
    // set an icon and a name for the object
    this.name = "Editable Shape Tool";
    this.icon = "assets/stampTool.png";
  
    this.stampSize = 20;
    this.stampFreq = 20
  
    let startMouseX = -1;
    let startMouseY = -1;
    let self = this;
  
    this.draw = function () {
      if (mouseIsPressed) {
        let stampX = mouseX - self.stampSize / 2;
        let stampY = mouseY - self.stampSize / 2;
        image(star, stampX, stampY, self.stampSize, self.stampSize);
      }
    };
  
    this.populateOptions = function () {
      let optionsHTML = {
        stampSizePrompt: "<label for='input' class='options-label'>Stamp Size:</label>",
        stampSizeInput: "<form class='increase-decrease-input'>  <div class='value-button' id='stamp-size-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='stamp-size-number-input' value='2'/>  <div class='value-button' id='stamp-size-increase' value='Increase Value'>+</div>  </form>  <br>",
        stampFreqPrompt: "<label for='input' class='options-label'>Frequency:</label>",
        stampFreqInput: "<form class='increase-decrease-input'>  <div class='value-button' id='stamp-freq-decrease' value='Decrease Value'>-</div>  <input type='number' class='number-input' id='stamp-freq-number-input' value='2'/>  <div class='value-button' id='stamp-freq-increase' value='Increase Value'>+</div>  </form>"
      }
      select(".options").html(optionsHTML.stampSizePrompt + optionsHTML.stampSizeInput + optionsHTML.stampFreqPrompt + optionsHTML.stampFreqInput);
      // Click handler - stamp size
      select("#stamp-size-increase").mouseClicked(function () {
        let stampSize = parseInt(document.getElementById('stamp-size-number-input').value, 10);
        stampSize = isNaN(stampSize) ? 0 : stampSize;
        stampSize++;
        document.getElementById('stamp-size-number-input').value = stampSize;
        self.stampSize = stampSize
      });
      select("#stamp-size-decrease").mouseClicked(function () {
        stampSize = parseInt(document.getElementById('stamp-size-number-input').value, 10);
        stampSize = isNaN(stampSize) ? 1 : stampSize;
        stampSize < 2 ? stampSize = 2 : '';
        stampSize--;
          document.getElementById('stamp-size-number-input').value = stampSize;
          self.stampSize = stampSize
      });
    };
  }
  