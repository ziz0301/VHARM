var middleLayer = function(){
     const $ = go.GraphObject.make;
     var creatingDiagram = function(){
          // console.log('MiddleLayer-CreateingDiagram');
          mymiddleHarm= $(go.Diagram,'middlelayer',
          {
               initialAutoScale: go.Diagram.Uniform,
               contentAlignment: go.Spot.Center,
               layout: $(go.ForceDirectedLayout, { defaultSpringLength: 10, maxIterations: 300 }),
               maxSelectionCount: 2
          });
          mymiddleHarm.zoomToRect(mymiddleHarm.documentBounds);
     }

	var settingNodeTemplate = function(){
		// console.log('MiddleLayer-SettingNode');
		mymiddleHarm.nodeTemplate =
		$(go.Node, "Auto",
			{locationSpot: go.Spot.Center,  // Node.location is the center of the Shape
			selectionAdorned: false,
			selectionChanged: nodeSelectionChanged
			},
			$(go.Shape, "Circle",
			{
				fill: "white",
				width: 70,
				height: 70,
			},
			new go.Binding("fill", "type",setcolor)),
			$(go.TextBlock,
				{
					font: "8px sans-serif",
					stroke: '#333',
					margin: 6,
					isMultiline: false,
					editable: false
				},
				new go.Binding("text", "", function(data){return data.component || data.key;}),
				//new go.Binding("text", "key")
			),
		
		);
	}
		

     var settingEdgeTemplate = function(){
          // console.log('MiddleLayer-SettingEdge');
          mymiddleHarm.linkTemplate =
          $(go.Link,
               {selectable: false,
               layerName: "Background"},
               $(go.Shape,  // this shape only shows when it isHighlighted
               {
                    isPanelMain: true,
                    stroke: null,
                    strokeWidth: 5
               },
              new go.Binding("stroke", "isHighlighted", h => h ? "red" : null).ofObject()),
              $(go.Shape,
              {
                   isPanelMain: true,
                   stroke: "black",
                   strokeWidth: 1
              },
              new go.Binding("stroke", "connecttype", setlinkcolor),
              new go.Binding("strokeDashArray", "connecttype", setconnecttype)),
              $(go.Shape,
              {
                   toArrow: "Standard"
              })
          );
     }

     var generateGraph = function(upperNodeData, upperLinkData ){
         // console.log('MiddleLayer-Drawing');
         var nodeDataArray = upperNodeData;
         var linkDataArray= upperLinkData;
          // var nodeDataArray = [
      		//    {"key": "A"},
      		//    {"key": "Browser", "group": "HU"  },
      		//    {"key": "Intel Kernel", "group": "HU"  },
      		//    {"key": "TiDra Kernel", "group": "HU" },
      		//    {"key": "Qualcomm Kernel", "group": "TU" },
      		//    {"key": "Seat Module","group": "KCAN ECUs"},
      		//    {"key": "Heating Module","group": "KCAN ECUs"},
      		//    {"key": "IC","group": "PTCAN-ECUs"},
          //
      		//    {"key":"HU", "isGroup": true},
      		//    {"key":"TU", "isGroup": true},
      		//    {"key":"KCAN ECUs", "isGroup": true},
      		//    {"key":"PTCAN ECUs", "isGroup": true}
      		// ];
          // var linkDataArray = [
      		//    {"from": "A", "to": "Browser" },
      		//    {"from": "A", "to": "Intel Kernel", "dash": [1, 1], "color": "red" },
      		//    {"from": "A", "to": "Qualcomm Kernel" },
      		//    {"from": "Browser", "to": "Intel Kernel" },
      		//    {"from": "Intel Kernel", "to": "TiDra Kernel" },
      		//    {"from": "Intel Kernel", "to": "Seat Module", "dash": [7, 7] },
      		//    {"from": "Intel Kernel", "to": "Heating Module", "dash": [7, 7] },
      		//    {"from": "Intel Kernel", "to": "IC", "dash": [7, 7] },
      		//    {"from": "TiDra Kernel", "to": "Seat Module", "dash": [3, 2]  },
      		//    {"from": "TiDra Kernel", "to": "Heating Module", "dash": [3, 2] },
      		//    {"from": "Qualcomm Kernel", "to": "Seat Module", "dash": [7, 7] },
      		//    {"from": "Qualcomm Kernel", "to": "Heating Module", "dash": [7, 7] },
      		//    {"from": "Qualcomm Kernel", "to": "IC", "dash": [7, 7] }
      		// ];
          mymiddleHarm.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
     };

     function setconnecttype(ct) {
       switch (ct) {
        case "CAN": return [4, 2];
        case "UDS": return [7, 7];
        case "phisicalaccess": return [1, 1];
        default: return "";
      }
    }
    function setlinkcolor(ct) {
      switch (ct) {
       case "phisicalaccess": return "red";
       default: return "black";
     }
   }

     function setcolor(c) {
       switch (c) {
        case "special": return "#db9ca2";
        case "AccessNode": return "#fdebb4";
        default: return "#ffffff";
      }
    }
     var toolsetting = function(){
          mymiddleHarm.toolManager.clickSelectingTool.standardMouseSelect = function() {
               const diagram = this.diagram;
               if (diagram === null || !diagram.allowSelect) return;
               var e = diagram.lastInput;
               var count = diagram.selection.count;
               var curobj = diagram.findPartAt(e.documentPoint, false);
               if (curobj !== null) {
                    if (count < 2) {  // add the part to the selection
                         if (!curobj.isSelected) {
                              var part = curobj;
                              if (part !== null) part.isSelected = true;
                         }
                    }
                    else {
                         if (!curobj.isSelected) {
                              var part = curobj;
                              if (part !== null) diagram.select(part);
                         }
                    }
               }
               else if (e.left && !(e.control || e.meta) && !e.shift) {
               // left click on background with no modifier: clear selection
               diagram.clearSelection();
               }
          }
     }


     return {
          init: function(upperNodeData, upperLinkData) {
               // console.log('MiddleLayer Creating...');
               creatingDiagram();
               settingNodeTemplate();
               settingEdgeTemplate();
               generateGraph(upperNodeData, upperLinkData);
               toolsetting();
          }
     }
}();
