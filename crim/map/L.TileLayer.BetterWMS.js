L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        console.log(data);
        if (data.features[0].id.indexOf("sales") >= 0)
          showResults(
            err, evt.latlng,
            '<h3>Sale / Appraisal</h3><hr></p><strong>Sale Price:</strong> $ '
            + data.features[0].properties.saleprice.toFixed(2).replace(/./g, function(c, i, a) {
                  return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
              })
            + '</p>'
            + '</p><strong>Date Sold:</strong> '
            + data.features[0].properties.datesold + '</p>'
            + '</p><strong>App Value:</strong> $ '
            + data.features[0].properties.appvalue.toFixed(2).replace(/./g, function(c, i, a) {
                  return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
              })
            + '</p>'
          );
        else if (data.features[0].id.indexOf("epa_facilities") >= 0) {
          showResults(
            err, evt.latlng,
            '<h3>EPA Facility</h3><hr></p><strong>Primary Name:</strong> '
            + data.features[0].properties.PRIMARY_NAME + '</p>'
            + '</p><strong>Interest Type:</strong> '
            + data.features[0].properties.INTEREST_TYPE + '</p>'
            + '</p><strong>Registry ID:</strong> '
            + data.features[0].properties.REGISTRY_ID
            + '</p><hr>'
            + '</p><a href="'
            + data.features[0].properties.FAC_URL
            + '" target="_blank">'
            + 'Show full record</a></p>'
          );
        }
        else if (data.features[0].id.indexOf("Lien") >= 0) {
          /*
          Pin: pin
          Value: totalsum
          recount: recount
          Nombre: nombre
          phyaddr: phyaddr
          */
          showResults(
            err, evt.latlng,
            '<h3>Lien</h3><hr>'
            + '</p><strong>Pin:</strong> '
            + data.features[0].properties.pin + '</p>'
            + '</p><strong>Value:</strong> $ '
            + data.features[0].properties.totalsum.toFixed(2).replace(/./g, function(c, i, a) {
                  return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
              })
            + '</p>'
            + '</p><strong>Recount:</strong> '
            + data.features[0].properties.recount
            + '</p><strong>Nombre:</strong> '
            + data.features[0].properties.nombre
            + '</p><strong>Address:</strong> '
            + data.features[0].properties.phyaddr
          );
        }
      },
      error: function (xhr, status, error) {
        showResults(error);
      }
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),

        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'application/json'
        };

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    // if (err) { console.log(err); return; } // do nothing if there's an error

    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);
};

// Lien totalsum
