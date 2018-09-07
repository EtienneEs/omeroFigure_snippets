var displaytimemode = "hrs:mins:secs";
var timepoints = 5;

// this function adds the (predefined) channelnames of the choosen image

function add_channelnames(ImageID) {
  j = figureModel.panels.models[ImageID];
  for (var c = 0; c < j.attributes.channels.length; c++) {
    if (j.attributes.channels[c].active) {
      var text = j.attributes.channels[c].label;
      var color = j.attributes.channels[c].color;
      var labels = [{
        'text': text,
        'size': 12,
        'position': "leftvert",
        'color': color
      }]
    j.add_labels(labels);
    }
  };
}

// this function generates a split view of the choosen image
function splitview(ImageID) {
  var p = figureModel.panels.models[ImageID];
  var j = p.toJSON();
  for (var c=0; c<j.channels.length; c++){
      // offset below each time we create a new panel
      j.y = j.y + (j.height * 1.05);
      // turn all channels off except for the current index
      j.channels.forEach((ch, i) => {
          ch.active = i === c;
      });
      // create new panel from json
      figureModel.panels.create(j);
  };
}

// working on the next function, there is a bug in the function above, need to write a new one
// the function below does not solve the bug -> once both functions are called, although the pictures
// look exactly how i want them, the settings are always as the settings last used: in the case of the function
// below: it always shows channel0 and channel1 true

function splitview2(ImageID) {
  var pB = figureModel.panels.models[ImageID].toJSON();
  pB.channels[0].active = true;
  pB.channels[1].active = false;
  pB.y = pB.y + (pB.height * 1.05);
  figureModel.panels.create(pB);

  var pC = figureModel.panels.models[ImageID].toJSON();
  pC.channels[0].active = false;
  pC.channels[1].active = true;
  pC.y = pB.y + (pB.height * 1.05);
  figureModel.panels.create(pC);

  var pA = figureModel.panels.models[ImageID];
  pA.attributes.channels[0].active = true;
  pA.attributes.channels[1].active = true;

}


// this function displays the time of the choosen image
function displaytime(ImageID, displaytimemode = "hrs:mins:secs") {
  var j = figureModel.panels.models[ImageID];
  var labels = [{
    'time' : displaytimemode,
    'size' : 12,
    'position' : "topright",
    'color' : "ffffff"
  }]
  j.add_labels(labels);
}

// this function generates a copy of the first time point, then generates multiple
// images of consecutive timepoints
function multitimepoint(ImageID, timepoints = 5, tIncrement = 1) {
  j = figureModel.panels.models[ImageID].toJSON();
  //de-comment the line below in order to have z-projections of
  //multiple timepoints
  //figureModel.panels.models[ImageID].set({'z_projection': "true"})
  var left = j.x;
  var top = j.y;
  var columnCount = timepoints;
  panelCount = 1;
  for (var t=1; t<timepoints; t+=tIncrement){
      // offset to the right each time we create a new panel
      j.x = left + ((panelCount % columnCount) * j.width * 1.05);
      j.y = top + (parseInt(panelCount / columnCount) * j.height * 1.05);
      panelCount++;
      // Increment T
      j.theT = t;
      //var delta_t = j.get(""time"")
      // create new panel from json
      figureModel.panels.create(j);
  };
}

// the funciton multitimepoint2 generates additionally a z-projection of timepoint 0
function multitimepoint2(ImageID, timepoints = 5, tIncrement = 1) {
  j = figureModel.panels.models[ImageID].toJSON();

  var left = j.x;
  var top = j.y;
  var columnCount = timepoints;
  panelCount = 1;

  for (var t=0; t<timepoints; t+=tIncrement){
      if (t == 0) {
        figureModel.panels.models[ImageID].set({'z_projection': "true"})
      }
      // offset to the right each time we create a new panel
      j.x = left + ((panelCount % columnCount) * j.width * 1.05);
      j.y = top + (parseInt(panelCount / columnCount) * j.height * 1.05);
      panelCount++;
      // Increment T
      j.theT = t;
      //var delta_t = j.get(""time"")
      // create new panel from json
      figureModel.panels.create(j);
  };
}

// sets the maximum projection to active for the choosen image
function maxprojection(ImageID) {
  j = figureModel.panels.models[ImageID];
  j.set({'z_projection': "true"});
}

// What i want to do: have a maximum projection of a split view, and then
// single slides of 4 consecutive timepoints
var timepoints = 5;

multitimepoint2(0, timepoints);
for (var p = 0; p<(timepoints); p++) {
  splitview(p);
};
for (var p = 0; p<(timepoints); p++) {
  displaytime(p);
};
// add_channelnames(0);
// add_channelnames(5);
// add_channelnames(6);
