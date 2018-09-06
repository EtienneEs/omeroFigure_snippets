var displaytime = "hrs:mins:secs";
var timepoints = 4;


figureModel.panels.getSelected().forEach(p => {
    var j = p.toJSON();
    var left = j.x;
    var top = j.y;
    var columnCount = 10;
    var tIncrement = 1;
    var panelCount = 1;
    var labels = [{
            'time': displaytime,
            'size': 12,
            'position': "topright",
            'color': "ffffff",
        }]
    p.add_labels(labels);

    // displaying maximum projeciton of the first panel:
    p.set({'z_projection': "true"})
    for (var t=0; t<timepoints; t+=tIncrement){
        // offset to the right each time we create a new panel
        j.x = left + ((panelCount % columnCount) * j.width * 1.05);
        j.y = top + (parseInt(panelCount / columnCount) * j.height * 1.05);
        panelCount++;
        // Increment T
        j.theT = t;
        //var delta_t = j.get(""time"")
        // create new panel from json
        newp = figureModel.panels.create(j);
        var labels = [{
                'time': displaytime,
                'size': 12,
                'position': "topright",
                'color': "ffffff"
            }]
        newp.add_labels(labels);
    };
});

figureModel.panels.models.forEach(p => {
  var j = p.toJSON();
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
});

// simple if sentence
if (figureModel.panels.models[0].attributes.channels[0].active) {
  text = "Testphrase has been true"
}else {
    text = "Testphrase has been false"
}


// adding Channel names with the corresponding color to panel.model[0] if the channels are active:

function channelnames(figureID) {
  j = figureModel.panels.models[figureID];
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

j = figureModel.panels.models[0];
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

// the code below deletes all labels of a picture
figureModel.getSelected().forEach(p => {
    p.set({'labels': []});
});

// how to access an attribute:
figureModel.panels.models[0].attributes.channels[0].label
