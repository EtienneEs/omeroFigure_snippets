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
  j = figureModel.panels.models[ImageID].toJSON();
  for (var c=0; c<j.channels.length; c++){
      // offset to the right each time we create a new panel
      j.y = j.y + (j.height * 1.05);
      // turn all channels off except for the current index
      j.channels.forEach((ch, i) => {
          ch.active = i === c;
      });
      // create new panel from json
      figureModel.panels.create(j);
  };
}

// this function displays the time of the choosen image
function displaytime(ImageID, displaytimemode = "hrs:mins:secs") {
  j = figureModel.panels.models[ImageID];
  var labels = [{
    'time' : displaytime,
    'size' : 12,
    'position' : "topright",
    'color' : "ffffff"
  }]
  j.add_labels(labels);
}

// this function generates a copy of the first time point, then generates multiple
// images of consecutive timepoints
function multitimepoint(ImageID, columnCount, timepoints = 5, tIncrement = 1) {
  j = figureModel.panels.models[ImageID].toJSON();
  var left = j.x;
  var top = j.y;
  var columnCount = timepoints + 1;
  panelCount = 1;
  for (var t=0; t<timepoints; t+=tIncrement){
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
// single slides of 5 consecutive timepoints
