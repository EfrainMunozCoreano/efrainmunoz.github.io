var map = L.map('map').setView([18.3436, -66.1274], 12);

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

var resArea10Layer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:res_area_10cm',
    format: "image/png",
    transparent: true
});

var resArea20Layer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:res_area_20cm',
    format: "image/png",
    transparent: true
});

var resArea30Layer = L.tileLayer.wms("http://54.149.205.51:8080/geoserver/PuertoRico/wms", {
    layers: 'PuertoRico:res_area_30cm',
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

map.addLayer(sectorLayer);
map.addLayer(buildingLayer);
map.addLayer(parcelLayer);
map.addLayer(sectorLabelsLayer);
map.addLayer(resArea10Layer);
map.addLayer(resArea20Layer);
map.addLayer(resArea30Layer);
map.addLayer(municipioLayer);
// map.addLayer(controlGrid01k);
// map.addLayer(controlGrid10k);
// map.addLayer(puntosSurveyControl);

// Layer Control
var baseMaps = [];
var overlays = [
  {
    groupName : "Flight Resolution Areas",
    expanded  : true,
    layers    : {
      "10cm"  : resArea10Layer,
      "20cm"  : resArea20Layer,
      "30cm"  : resArea30Layer
    }
  },
  {
    groupName : "Control",
    expanded  : true,
    layers    : {
      "10k Grid" : controlGrid10k,
      "1k Grid"  : controlGrid01k,
      "Survey Control Points" : puntosSurveyControl
    }
  },
  {
    groupName : "Base Map Layers",
    expanded  : true,
    layers    : {
      "Buildings" : buildingLayer,
      "Parcel"    : parcelLayer,
      "Sector"    : sectorLayer,
      "Municipios" : municipioLayer
    }
  }
];


var options = {
    container_width     : "300px",
    container_maxHeight : "350px",
    group_maxHeight     : "80px",
    exclusive           : false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);
