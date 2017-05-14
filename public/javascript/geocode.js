var pubnubDemo = new PubNub({
    publishKey: 'pub-c-553420fa-6c08-49b4-b282-30ff5d9b34a3',
    subscribeKey: 'sub-c-8e5ada48-3805-11e7-a268-0619f8945a4f'
});
var UniqueID = PubNub.generateUUID();

  // Subscribe to the demo_tutorial channel
  pubnubDemo.addListener({
      message: function(message){
        if (UniqueID === message.message.uniqueid) {
          let { Place_addr } = message.message.geocode.candidates[0].attributes;
          let { x, y } = message.message.geocode.candidates[0].location;
          mapFunctionDisplay(x, y, Place_addr)
        } else {
          console.log('flower.');
        }

      }
  })
  pubnubDemo.subscribe({
      channels: ['esri_geocode_input']
  });

  var address = window.location.pathname.split('/')[2]

  if (address == undefined) {
    address = "299 South St, New York, NY 10002";
  }  else {
    address.replace(/%20/g, ' ');
    }
   pubnubDemo.publish({

      message: {
           "text": address,
           "uniqueid":UniqueID
      },
      channel: 'esri_geocode_input'
  });
// if my userid = uuid

function mapFunctionDisplay(x, y, add) {
// body...
require([
"esri/Map",
"esri/views/MapView",
"esri/widgets/Search",
"esri/layers/FeatureLayer",
"esri/Graphic",
"esri/layers/GraphicsLayer",
"esri/geometry/Point",
"esri/symbols/SimpleMarkerSymbol",
"dojo/domReady!"
], function(Map, MapView, Search, FeatureLayer, Graphic, GraphicsLayer, Point, SimpleMarkerSymbol) {

var map = new Map({
  basemap: "dark-gray-vector"
});

// Add the layer to the map
var trailsLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
});

//map.add(trailsLayer); // Optionally add layer to map

var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [x, y],
  zoom: 9
});

// Search

var search = new Search({
  view: view
});
search.defaultSource.withinViewEnabled = true; // Limit search to visible map area only
view.ui.add(search, "top-right"); // Add to the map
// Add the trailheads as a search source
search.sources.push({
  featureLayer: trailsLayer,
  searchFields: ["TRL_NAME"],
  displayField: "TRL_NAME",
  exactMatch: false,
  outFields: ["TRL_NAME", "PARK_NAME"],
  resultGraphicEnabled: true,
  name: "Trailheads",
  placeholder: "Santa",
});

// Find address

function showPopup(address, pt) {
  view.popup.open({
    title: "Find Address Result",
    content: address + "<br><br> Lat: " + Math.round(pt.latitude * 100000)/100000 + " Lon: " + Math.round(pt.longitude * 100000)/100000,
    location: pt
  });
}

view.on("click", function(evt){
  search.clear();
  view.popup.clear();
  var locatorSource = search.defaultSource;
  locatorSource.locator.locationToAddress(evt.mapPoint)
    .then(function(response) {
      var address = response.address.Match_addr;
      // Show the address found
      showPopup(address, evt.mapPoint);
    }, function(err) {
      // Show no address found
      showPopup("No address found for this location.", evt.mapPoint);
    });
});
var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      /*************************
       * Add a 3D point graphic
       *************************/

      // London
      var point = new Point({
          x: x,
          y: y
        }),

        markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],

          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        });

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      graphicsLayer.add(pointGraphic);
})
}
