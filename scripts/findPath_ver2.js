/********************************************************
=========================================================
============LIST MANUAL PATHS AND ALL PATHS==============
=========================================================
********************************************************/

// A collection of all of the paths between a pair of nodes, a List of Lists of Nodes
var paths = null;
var alpath = new go.List();


/**
Input: Event - Click the Reset button
Output: Clear the selection Node
**/
function resetNodes() {
     console.log("Reset Source and Destination Node Done");
     mymiddleHarm.clearSelection();
     var num = mymiddleHarm.model.nodeDataArray.length;
     var node1 = null;
     var node2 = null;
 }

/**
Input: Event - Select the source node and destination node
Output: (1) Hightlight the shorstest path
       (2) List all path from the source and the dest node
**/
function nodeSelectionChanged(node) {
     var diagram = node.diagram;
     if (diagram === null) return;
     diagram.clearHighlighteds();
     if (node.isSelected) {
          // when there is a selection made, always clear out the list of all paths
          var sel = document.getElementById("manualPaths");
          sel.innerHTML = "";
          var begin = diagram.selection.first();
          // console.log("begin"+begin);
          showDistances(begin);
          if (diagram.selection.count === 2) {
                 var end = node;  // just became selected
                 highlightShortestPath(begin, end);
                 listAllPaths(begin, end);
                 // console.log("end"+end);
          }
     }
}


/**
Input: Source  Nodes
Output: Count the distance and set data to the middle IVHARM
**/
function showDistances(begin) {
     distances = findDistances(begin);
     var it = distances.iterator;
     while (it.next()) {
          var n = it.key;
          var dist = it.value;
          mymiddleHarm.model.setDataProperty(n.data, "distance", dist);
     }
}

/**
 Input: Source Node
 Output: findDistances(Node) computes the distance of each Node from the given Node.
             This function is used by showDistances to update the model data.
 Returns a Map of Nodes with distance values from the given source Node.
Assumes all links are directional
**/
function findDistances(source) {
     var diagram = source.diagram;
     var distances = new go.Map(/*go.Node, "number"*/);
     var nit = diagram.nodes;
     while (nit.next()) {
          var n = nit.value;
          distances.set(n, Infinity);
     }

     distances.set(source, 0);
     var seen = new go.Set(/*go.Node*/);
     seen.add(source);
     var finished = new go.Set(/*go.Node*/);
     while (seen.count > 0) {
          var least = leastNode(seen, distances);
          var leastdist = distances.get(least);
          seen.delete(least);
          finished.add(least);
          var it = least.findLinksOutOf();
          while (it.next()) {
               var link = it.value;
               var neighbor = link.getOtherNode(least);
               if (finished.has(neighbor)) continue;
               var neighbordist = distances.get(neighbor);
               var dist = leastdist + 1;
               if (dist < neighbordist) {
               if (neighbordist === Infinity) {
                   seen.add(neighbor);
               }
               distances.set(neighbor, dist);
               }
          }
     }

     return distances;
}

/**
Input: Source and Destination Nodes
Output: Highlight the shortest path with red color
**/
function highlightShortestPath(begin, end) {
     highlightPath(findShortestPath(begin, end));
}

/**
Input: Path that need to be highlighted
Output: (1) Clear the old highlight path
        (2) Highlight the new path
**/
function highlightPath(path) {
     mymiddleHarm.clearHighlighteds();
     for (var i = 0; i < path.count - 1; i++) {
          var f = path.get(i);
          var t = path.get(i + 1);
          f.findLinksTo(t).each(l => l.isHighlighted = true);
     }
}

/**
 Input: Source Node and destination Node
 Output: findShortestPath(Node, Node) finds a shortest path from one Node to another.
    This uses findDistances.  This is used by highlightShortestPath.
    Assumes all links are directional
**/
function findShortestPath(begin, end) {
     distances = findDistances(begin);
     var path = new go.List();
     path.add(end);
     while (end !== null) {
     var next = leastNode(end.findNodesInto(), distances);
     if (next !== null) {
       if (distances.get(next) < distances.get(end)) {
         path.add(next);  // making progress towards the beginning
       } else {
         next = null;  // nothing better found -- stop looking
       }
     }
     end = next;
     }

     path.reverse();
     return path;
}


/**
This helper function finds a Node in the given collection that has the smallest distance.
**/
function leastNode(coll, distances) {
     var bestdist = Infinity;
     var bestnode = null;
     var it = coll.iterator;
     while (it.next()) {
          var n = it.value;
          var dist = distances.get(n);
          if (dist < bestdist) {
            bestdist = dist;
            bestnode = n;
          }
     }
     return bestnode;
}


/**
Input: Destination Node and Source Node
Output: (1) Collect all path from source and destination node
        (2) Write all path to HTML ID "manualPaths"
**/
function listAllPaths(begin, end) {
     var numofpath = 0;
     var distancearr = [];
     paths = collectPaths(begin, end);
     // collectEdge(begin,end);
     var sel = document.getElementById("manualPaths");
     sel.innerHTML = "";
     paths.each(p => {
          var opt = document.createElement("option");
          opt.text = pathToString(p);
          // pathToString1(p);
          sel.add(opt, null);
          numofpath ++;
          dist = calculateKzero(p)
          distancearr.push(dist);
     });
     var kzerosafety = Math.min(...distancearr)
     console.log ("K-zero day safety value is: " + kzerosafety);
     sel.onchange = highlightSelectedPath;
     var numofmanualPath = document.getElementById("numofmanualPath");
     numofmanualPath.innerHTML="Number of path: " +numofpath;
}

function calculateKzero(path){
    var distance = path.length;
    for (var i = 0; i < path.length; i++) {
        if(path.get(i).data.type == "special" || path.get(i).data.type == "AccessNode"){
          distance = distance - 1;
        }
    }
    return distance;
}

/**
This function is used by listAllPaths to hightlight the selected path
Input: ListAllPaths call
Output: Highlight selected path
**/
function highlightSelectedPath() {
     var sel = document.getElementById("manualPaths");
     highlightPath(paths.get(sel.selectedIndex));
}

/**
collectPaths(Node, Node) produces a collection of all paths from one Node to another.
This is used by listAllPaths and collect collectEveryPaths
The result is remembered in a global variable which is used by highlightSelectedPath.
This does not depend on findDistances.
Input: Source node and destination node
Output: Recusively find All path from the source node to destination node
**/
function collectPaths(begin, end) {
     var stack = new go.List(/*go.Node*/);
     var coll = new go.List(/*go.List*/);

     function find(source, end) {
          source.findNodesOutOf().each(n => {
            if (n === source) return;
            if (n === end) {  // success
              var path = stack.copy();
              path.add(end);
              coll.add(path);
            }
            else if (!stack.has(n)) {
              stack.add(n);
              find(n, end);
              stack.removeAt(stack.count - 1);
            }
          });
     }
     stack.add(begin);
     find(begin, end);
     return coll;
}

/**
Input: GoJS Path
Output: Turn the GoJS path to string to show in HTML tag
**/
function pathToString(path) {
     var s = path.length - 1 + ": ";
     for (var i = 0; i < path.length; i++) {
          if (i > 0) s += " -- ";
          s += path.get(i).data.key;
     }
     return s;
}

/**
collectEveryPaths produces a collection of all paths from the Node without NodeInto to the Node without NodeOutOf
(Or can be said from the attacker to multiple target)
This is used by the main funtion.
This is calculate right after the drawing process of the middleLayer
This does not depend on findDistances.
Input: After the MiddleLayer finished drawing
Output: Recusively find All path from attacker to target
**/
function collectEveryPaths(){
     var distancearr = [];
     var beginnode = new go.List();
     var outnode = new go.List();
     var numofpath = 0;
     var sel = document.getElementById("allPaths");
     sel.innerHTML = "";  // clear out any old Option elements
     mymiddleHarm.nodes.each(node =>{
         var nodeInto = node.findNodesInto();
         var nodeOut = node.findNodesOutOf();
         if (nodeInto.count == 0){
              beginnode.add(node);
         }
         if(nodeOut.count == 0){
              outnode.add(node);
         }
     });
     beginnode.each(n1=>{
         // console.log("beginnode:"+n1.data.key);
         outnode.each(n2=>{
              // console.log("end:"+n2.data.key);
              paths = collectPaths(n1, n2);
              paths.each(p => {
                   var opt = document.createElement("option");
                   opt.text = pathToString(p);
                   sel.add(opt, null);
                   numofpath ++;
                   dist = calculateDistance(p)
                   distancearr.push(dist);
                   // console.log(opt.text);
                   alpath.add(p);
              });
              sel.onchange = highlightThisPath;
         });
     });
     var numofallPath = document.getElementById("numofallPath");
     numofallPath.innerHTML="Number of path: " +numofpath;

     var shortestattackpath = Math.min(...distancearr)
     var longestattackpath = Math.max(...distancearr)
     console.log ("Shortest attack path: " + shortestattackpath);
     console.log ("Longest attack path: " + longestattackpath);
     // console.log("all path print:"+alpath.count);
     // console.log ("numberofpath:"+numofpath);
}

function calculateDistance(path){
    var distance = path.length;
    for (var i = 0; i < path.length; i++) {
        if(path.get(i).data.type == "special"){
          distance = distance - 1;
        }
    }
    return distance;
}



/**
This function is used by collectEveryPaths to hightlight the selected path
Input: collectEveryPaths call
Output: Highlight selected path
**/
function highlightThisPath() {
     var sel = document.getElementById("allPaths");
     highlightPath(alpath.get(sel.selectedIndex));
}




/********************************************************
=========================================================
============THE CALCULATION START FROM HERE==============
=========================================================
********************************************************/

/**
This function is the main function for security analysis
Input: data ready for 3 IVHARM layers
Output: Fill table of probability, impact and risk of node in upperlayer and middlelayer
**/
function nodeInfo(){
     fatherimparr = getImpactOfUnit();
     fatherprobarr = getProbOfUnit();
     pathInfo();
      // getProbOfUnit();
     mymiddleHarm.nodes.each(n => {
          if(n.data.type == "component"|| n.data.type == "AccessNode"){
              parentnode = mylowerHarm.findNodeForKey(n.data.key);
              prob = getProbOfNode(parentnode);
              impact = n.data.impact
              risk = prob * impact;
              risk_round = Math.round(risk * 100) / 100;
              $("#serviceinfotable").append("<tr><td>"+ n.data.key +"</td><td>"+ prob +"</td><td>"+ impact +"</td><td>"+ risk_round +"</td><tr>");
          }
          else if(n.data.type == "ECU" || n.data.type == "CANBUS"){
                  impact = fatherimparr[n.data.key];
                  prob = fatherprobarr[n.data.key];
                  risk = prob * impact;
                  risk_round = Math.round(risk * 100) / 100;
                  $("#unitinfotable").append("<tr><td>"+ n.data.key +"</td><td>"+ prob +"</td><td>"+ impact +"</td><td>"+ risk_round +"</td><tr>");
          }
     });
}


function pathInfo(){
     var beginnode = new go.List();
     var outnode = new go.List();
     var numofpath = 0;
     var systemrisk1 = 0;
     var systemrisk2 = 0;
     var pathtbl = $("#pathinfotable");

     // sel.innerHTML = "";  // clear out any old Option elements
     mymiddleHarm.nodes.each(node =>{
         var nodeInto = node.findNodesInto();
         var nodeOut = node.findNodesOutOf();
         if (nodeInto.count == 0){
              beginnode.add(node);
         }
         if(nodeOut.count == 0){
              outnode.add(node);
         }
     });
     beginnode.each(n1=>{
         // console.log("beginnode:"+n1.data.key);
         outnode.each(n2=>{
            // console.log("end:"+n2.data.key);
            paths = collectPaths(n1, n2);
            paths.each(p => {
                var reallength = p.length - 1;
                 var pathstring = showstringpath(p);
                 var pathimpact = getImpactofPath(p);
                 var pathrisk = getRiskOfPath(p);
                 var pathprob = getProbOfPath(p);
                 var pathrisk2 = pathimpact * pathprob;
                 var pathrisk2_round = Math.round(pathrisk2 * 100) / 100;
                 pathtbl.append("<tr><td>"+ pathstring +"</td><td>"+ reallength +"</td><td>"+ pathimpact +"</td><td>"+ pathprob + "<td>"+ pathrisk +"</td><td>"+ pathrisk2_round +"</td><tr>");
               numofpath ++;
               // console.log(opt.text);
               alpath.add(p);
               systemrisk1 += pathrisk;
               systemrisk2 += pathrisk2; //Pathrisk 2 calculate based on multiplation of prob and impact in path level
            });
         });
     });
     var numofallPath = document.getElementById("numofPath");
     numofallPath.innerHTML="Number of path: " +numofpath;
     $("#systemrisksum").append("System risk based on sum of all path risk: " +systemrisk1);
     $("#systemriskmul").append("System risk based on multiple of all path impact and path probability: " +Math.round(systemrisk2 * 100) / 100);
     // console.log("-------------Analystic Summary---------------");
     console.log("Number of path: " + numofpath);
     console.log("System risk (sumofpathrisk): " +systemrisk1);
     console.log("System risk (impandprob): " + systemrisk2);
     // console.log("all path print:"+alpath.count);
     // console.log ("numberofpath:"+numofpath);

}
function showstringpath(path) {
     var s = "";
     for (var i = 0; i < path.length; i++) {
          if (i > 0) s += " -- ";
          s += path.get(i).data.key;
     }
     return s;
}

function getImpactofPath(path){
   var impact = 0;
   var imparr = [];
   var listimpact = getListImpactOfNode();
   for (var i = 0; i < path.length; i++) {
      if(path.get(i).data.type == "component"|| path.get(i).data.type == "AccessNode"){
          tmp_impact = listimpact[path.get(i).data.key];
          imparr.push(tmp_impact);
      }
   }
    impact = Math.max(...imparr);
    // console.log(impact);
    return impact;
}

function getProbOfPath(path){
    var prob = 0;
    var probarr = [];
    var listprob = getListProbOfNode();
    // console.log("newpath");
    for (var i = 0; i < path.length; i++) {
       if(path.get(i).data.type == "component" || path.get(i).data.type == "AccessNode"){
           tmp_prob = listprob[path.get(i).data.key];
           probarr.push(tmp_prob);
           // console.log(path.get(i).data.key+" prob value: " + tmp_prob);
       }
    }
      // console.log(probarr);
     prob = probarr.reduce( (a, b) => a * b );
     // console.log(prob);
     return Math.round(prob * 100) / 100;
}

function getRiskOfPath(path){
  var risk = 0;
  var riskarr = [];
  var listrisk = getListRiskOfNode();
  for (var i = 0; i < path.length; i++) {
     if(path.get(i).data.type == "component"|| path.get(i).data.type == "AccessNode"){
         tmp_risk = listrisk[path.get(i).data.key];
         riskarr.push(tmp_risk);
     }
  }
   risk = riskarr.reduce( (a, b) => a + b );
   return Math.round(risk * 100) / 100;
}

/**
This function is used for function getProbOfNode
Input: the gatefigure and array of probability inside the gate
Output: calculate the probability of the gate
**/
function getProbOfGate(figure, probarr){
  var prob =0;
    if(figure == "OrGate"){
        reversearr = probarr.map(x => 1- x);
        reverseprob = reversearr.reduce( (a, b) => a * b );
        prob = 1-reverseprob;
    }
    else if(figure == "AndGate"){
      prob = probarr.reduce( (a, b) => a * b );
    }
    else{
           prob = probarr;
    };
    return Math.round(prob * 100) / 100;
}


/**
This function is used to calculate probability of the parent node in lowerlayer
Input: parent node in lowerlayer
Output: calculate the probability of the parent node in lowerlayer
**/
function getProbOfNode(pnode){
    var probarr = [];
    var figure = pnode.data.figure;
    children = pnode.findTreeChildrenNodes();
    if(children.count >0){
       children.each(child => {
           if(child.data.type=="gate"){
             var temp_prob1 = getProbOfNode(child);
             child.data.prob = temp_prob1;
             // console.log("temp_prob: "+temp_prob1);
             // console.log("child.data.prob : "+child.data.prob);
             probarr.push(temp_prob1);
           }
           else{
              var temp_prob = child.data.prob;
              probarr.push(temp_prob);
           }
       });
    }
      prob_value = getProbOfGate(figure, probarr);
      //console.log(pnode.data.key +" probability value: " +prob_value);
      return prob_value;
}




/**
This function is used by NodeInfo() to get the probability of Unit
Input: data ready for 3 IVHARM layers
Output: Probability of node in Upper layer (called Unit)
**/
function getProbOfUnit(){
    var fatherarr = [];
    var fatherprobarr =[];
    var listprob = getListProbOfNode();
    //get the array of all father
    myupperHarm.nodes.each(n=>{
        if(n.data.type == "ECU"|| n.data.type == "CANBUS"){
          father = n.data.key;
          fatherarr.push(father);
        }
    });
    // console.log (fatherarr);

    fatherarr.forEach(e=>{
      var temparr = [];
      mymiddleHarm.nodes.each(n => {
           if(n.data.type == "component"|| n.data.type == "AccessNode"){
             if (n.data.group == e){
               temparr.push(listprob[n.data.key]);
               // console.log (n.data.key + "---" + listprob[n.data.key]);
             }
           }
      });
      // console.log(e +": "+temparr);
      var unitprob = temparr.reduce( (a, b) => a * b );
      fatherprobarr[e] = Math.round(unitprob * 100) / 100;
    });
    return fatherprobarr;
}


/**
This function is used by NodeInfo() to get the impact of Unit
Input: data ready for 3 IVHARM layers
Output: Impact of node in Upper layer (called Unit)
**/
function getImpactOfUnit(){
    var fatherarr = [];
    myupperHarm.nodes.each(n=>{
        if(n.data.type == "ECU" || n.data.type == "CANBUS"){
          father = n.data.key;
          fatherarr.push(father);
        }
    });
    var fatherimparr =[];
    fatherarr.forEach(e=>{
      var temparr = [];
      mymiddleHarm.nodes.each(n => {
           if(n.data.type == "component"|| n.data.type == "AccessNode"){
             if (n.data.group == e){
               temparr.push(n.data.impact);
             }
           }
      });
      var maximp = Math.max(...temparr);
      fatherimparr[e] = maximp;
    });
    return fatherimparr;
}

/**
This function is used by getProbOfUnit() to get the probability of node in the middle layer
Input: data ready for 3 IVHARM layers
Output: Array of impact of middle layer node
**/
function getListImpactOfNode(){
    var listnodeimp = [];
    mymiddleHarm.nodes.each(n => {
         if(n.data.type == "component"|| n.data.type == "AccessNode"){
             impact = n.data.impact
             listnodeimp[n.data.key] = impact;
         }
    });
     // console.log(listnodeimp);
    return listnodeimp;
}

/**
This function is used by getProbOfUnit() to get the probability of node in the middle layer
Input: data ready for 3 IVHARM layers
Output: Array of probability of middle layer node
**/
function getListProbOfNode(){
    var listnodeprob = [];
    mymiddleHarm.nodes.each(n => {
         if(n.data.type == "component" || n.data.type == "AccessNode"){
             parentnode = mylowerHarm.findNodeForKey(n.data.key);
             prob = getProbOfNode(parentnode);
             listnodeprob[n.data.key] = prob;
         }
    });
     // console.log(listnodeprob);
    return listnodeprob;
}

/**
This function is used by getProbOfUnit() to get the risk of node in the middle layer
Input: data ready for 3 IVHARM layers
Output: Array of risk of middle layer node
**/
function getListRiskOfNode(){
    var listriskofnode = [];
    var listprob = getListProbOfNode();
    var listimp = getListImpactOfNode();
    mymiddleHarm.nodes.each(n => {
         if(n.data.type == "component" || n.data.type == "AccessNode"){
             imp = listimp[n.data.key];
             prob =listprob[n.data.key];
             risk = imp*prob;
             risk_round = Math.round(risk * 100) / 100;
             listriskofnode[n.data.key] = risk_round;
         }
    });
     // console.log(listnodeprob);
    return listriskofnode;
}




/********************************************************
=========================================================
============WORKING WITH EDGE FUNCTIONS==================
=========================================================
********************************************************/
function pathToString1(path) {
     var vec = [0,0,0,0,0,0,0,0,0];
     var s = path.length-1 + ": ";
     var listnode = "";
     for (var i = 0; i < path.length; i++) {
          if (i > 0){
                s += "--";
                listnode += ",";
          }
          s += path.get(i).data.key;
          listnode +=path.get(i).data.key;
     }

     nodearr = listnode.split(",");
     console.log(nodearr);
     for(var i=0; i<=nodearr.length; i++){
          if(i+1 == nodearr.length) return vec;
          else{
               console.log("Path: "+nodearr[i]+"--"+nodearr[i+1] );
               beginnode = mymiddleHarm.findNodeForKey(nodearr[i]);
               nextnode = mymiddleHarm.findNodeForKey(nodearr[i+1]);
               var l = beginnode.findLinksTo(nextnode).each(function(link) {
                    linkvec = link.data.vec;
                    console.log("vecoflink:" +linkvec);
                    var arrvec =JSON.parse(linkvec);
                    vec = addvector(vec, arrvec);
                    console.log("vec la: "+vec);
               });
          }
     }
}

function collectEdge(begin,end){
     var vec = [0,0,0,0,0,0,0,0,0];
     var stack = new go.List(/*go.Node*/);
     var coll = new go.List(/*go.List*/);
     var edge = new go.List(/*go.Edge*/);

     function find(source, end) {
          source.findNodesOutOf().each(n => {
            if (n === source) return;
            if (n === end) {  // success
              var l = source.findLinksTo(end).each(function(link) {
                   linkvec = link.data.vec;
                   console.log("vecoflink:" +linkvec);
                   var arrvec =JSON.parse(linkvec);
                   vec = addvector(vec, arrvec);
              });
              var path = stack.copy();
              path.add(end);
              coll.add(path);
            }
            else if (!stack.has(n)) {
              stack.add(n);
              find(n, end);
              stack.removeAt(stack.count - 1);
            }
          });
     }
     stack.add(begin);
     find(begin, end);
     console.log("vec la: "+vec);
}

function addvector(a,b){
    return a.map((e,i) => e + b[i]);
}
