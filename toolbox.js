//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {
    let self = this;

    this.tools = [];
    this.selectedTool = null;

    let toolbarItemClick = function () {
        //remove any existing borders
        let items = selectAll(".sideBarItem");
        for (let i = 0; i < items.length; i++) {
            items[i].style("border", "0");
        }

        let toolName = this.id().split("sideBarItem")[0];
        self.selectTool(toolName);

        //call loadPixels to make sure most recent changes are saved to pixel array
        loadPixels();
    };

    //add a new tool icon to the html page
    let addToolIcon = function (icon, name) {
        // Creates a div for the image that also contains the tooltip of the tool with the desired name
        let sideBarItem = createDiv(
            "<img src='" +
                icon +
                "'>  <span class='tooltip-text'>" +
                name +
                " button" +
                "</span>  </div>"
        );
        sideBarItem.class("sideBarItem tooltip");
        sideBarItem.id(name + "sideBarItem");
        sideBarItem.parent("sidebar");
        sideBarItem.mouseClicked(toolbarItemClick);
    };

    //add a tool to the tools array
    this.addTool = function (tool) {
        //check that the object tool has an icon and a name
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("make sure your tool has both a name and an icon");
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        //if no tool is selected (ie. none have been added so far)
        //make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    this.selectTool = function (toolName) {
        //search through the tools for one that's name matches
        //toolName
        for (let i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                //if the tool has an unselectTool method run it.
                if (
                    this.selectedTool != null &&
                    this.selectedTool.hasOwnProperty("unselectTool")
                ) {
                    this.selectedTool.unselectTool();
                }
                //select the tool and highlight it on the toolbar
                this.selectedTool = this.tools[i];
                select("#" + toolName + "sideBarItem").style(
                    "border",
                    "solid blue"
                );

                //if the tool has an options area. Populate it now.
                if (this.selectedTool.hasOwnProperty("populateOptions")) {
                    this.selectedTool.populateOptions();
                }
                //if the tool has setup function, implement it now
                // Implemented once, just like the setup function in sketch.js
                if (this.selectedTool.hasOwnProperty("setup")) {
                    this.selectedTool.setup();
                }
            }
        }
    };
}
