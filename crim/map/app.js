var map = L.map('map').setView([18.1543, -66.4192], 10);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWZyYW11bm96IiwiYSI6IlhIeHFDQ3cifQ.oegyxy9ChebWfj8WsbClqg',
  {
    attribution: ''
  }
).addTo(map);

// layers
var parcelLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    minZoom: 18,
    layers: 'PuertoRico:parcel',
    format: "image/png",
    transparent: true
});

var buildingLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    minZoom: 17,
    layers: 'PuertoRico:building',
    format: "image/png",
    transparent: true
});

var sectorLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    minZoom: 17,
    layers: 'PuertoRico:sector',
    format: "image/png",
    transparent: true
});

var sectorLabelsLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    minZoom: 18,
    layers: 'PuertoRico:sector_labels',
    format: "image/png",
    transparent: true
});

var orthoGrid20Layer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:orthogrid20cm',
    format: "image/png",
    transparent: true
});

var orthoGrid10Layer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:orthogrid10cm',
    format: "image/png",
    transparent: true
});


var controlGrid01k = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:grid01k',
    format: "image/png",
    transparent: true
});

var controlGrid10k = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:grid10k',
    format: "image/png",
    transparent: true
});

var puntosSurveyControl = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:puntos_survey_control',
    format: "image/png",
    transparent: true
});

var municipioLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:municipio',
    format: "image/png",
    transparent: true
});

var flightlineLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:flightline',
    format: "image/png",
    transparent: true
});

var flownLayer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:flown',
    format: "image/png",
    transparent: true
});

map.addLayer(sectorLayer);
map.addLayer(parcelLayer);
map.addLayer(sectorLabelsLayer);
map.addLayer(municipioLayer);
map.addLayer(flownLayer);
map.addLayer(flightlineLayer);

// Layer Control
var baseMaps = [];
var overlays = [
  {
    groupName : "Base Map Layers",
    expanded  : true,
    layers    : {
      "Buildings" : buildingLayer,
      "Parcel"    : parcelLayer,
      "Sector"    : sectorLayer,
      "Municipios" : municipioLayer
    }
  },
  {
    groupName : "Control",
    expanded  : true,
    layers    : {
      "Flown": flownLayer,
      "Flight Lines" : flightlineLayer,
      "Orthogrid 10cm"  : orthoGrid10Layer,
      "Orthogrid 20cm" : orthoGrid20Layer,
      "Original Grid 1k"  : controlGrid01k,
      "Original Grid 10k" : controlGrid10k,
      "Survey Control Points" : puntosSurveyControl
    }
  }
];


var options = {
    container_width     : "300px",
    container_maxHeight : "800px",
    group_maxHeight     : "260px",
    exclusive           : false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);
