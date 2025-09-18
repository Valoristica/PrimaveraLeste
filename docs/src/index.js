// Add AJAX request for data

var propriedade = $.ajax({
  url:"https://raw.githubusercontent.com/Valoristica/PrimaveraLeste/refs/heads/main/docs/Propriedade.geojson",
  dataType: "json",
  success: console.log("Propriedade data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var quadras = $.ajax({
  url:"https://raw.githubusercontent.com/Valoristica/PrimaveraLeste/refs/heads/main/docs/Quadras.geojson",
  dataType: "json",
  success: console.log("Quadras data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var areasverdes = $.ajax({
  url:"https://raw.githubusercontent.com/Valoristica/PrimaveraLeste/refs/heads/main/docs/AreasVerdes.geojson",
  dataType: "json",
  success: console.log("Areas Verdes data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});

var arruamentos = $.ajax({
  url:"https://raw.githubusercontent.com/Valoristica/PrimaveraLeste/refs/heads/main/docs/Arruamentos.geojson",
  dataType: "json",
  success: console.log("Arruamentos data successfully loaded."),
  error: function (xhr) {
    alert(xhr.statusText);
  }
});


  /* when().done() SECTION*/
  // Add the variable for each of your AJAX requests to $.when()
  $.when(propriedade, quadras, areasverdes, arruamentos).done(function() {

  var mappos = L.Permalink.getMapLocation(zoom = 13, center = [-15.545756, -54.236441]);

  var map = L.map('map', {
    center: mappos.center,
    zoom: mappos.zoom,
    attributionControl: false,
    zoomControl: false,
    preferCanvas: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topright'
    }
  });

  L.Permalink.setup(map);

  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(map);

  // create the sidebar instance and add it to the map
  var sidebar = L.control.sidebar({
      autopan: false,       // whether to maintain the centered map point when opening the sidebar
      closeButton: true,    // whether t add a close button to the panes
      container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
      position: 'left',     // left or right
  }).addTo(map);
  //.open('home');


  // Adds SIRGAS2000 definition
  proj4.defs('EPSG:31981', '+proj=utm +zone=21 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ');

  // Basemaps

  var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
  });

  var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
  });

  var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
  });

  /*
  var PROPRIEDADE = L.geoJSON(propriedade.responseJSON, {
    style: {
      color: 'white',
      weight: 3
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Id: </b>" + feature.properties.fid
      );
    }
  });
  */
  
  var PROPRIEDADE = L.Proj.geoJson(propriedade.responseJSON, {
    style: {
      color: 'yellow',
      weight: 2
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Id: </b>" + feature.properties.fid + "<br>" +
        "<b>Proprietário: </b>" + feature.properties.Propriedade + "<br>"
      )
    }
  });
  
  var AREASVERDES = L.Proj.geoJson(areasverdes.responseJSON, {
    style: {
      color: 'green',
      weight: 2
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Id: </b>" + feature.properties.fid + "<br>" +
        "<b>Área (m2): </b>" + feature.properties.Area.toLocaleString('de-DE', { maximumFractionDigits: 2 }) 
      )
    }
  }).addTo(map);
  
  var QUADRAS = L.Proj.geoJson(quadras.responseJSON, {
    style: {
      color: 'blue',
      weight: 2
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Id: </b>" + feature.properties.fid + "<br>" +
        "<b>Área (m2): </b>" + feature.properties.Area.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + "<br>" +
        "<b>Área (ha): </b>" + feature.properties.Areaha.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + "<br>" +
        "<b>PU (R$/m2): </b>" + feature.properties.PU.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + "<br>" +
        "<b>VGV (R$): </b>" + feature.properties.PT.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + "<br>" +
        "<b>Fase: </b>" + feature.properties.Fase + "<br>" +
        "<b>Defronte à Rodovia?: </b>" + feature.properties.Defronte
      )
    }
  }).addTo(map);
  
  var ARRUAMENTOS = L.Proj.geoJson(arruamentos.responseJSON, {
    style: {
      color: 'black',
      weight: 2
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(
        "<b>Id: </b>" + feature.properties.fid + "<br>" +
        "<b>Comprimento (m): </b>" + feature.properties.Comprimento.toLocaleString('de-DE', { maximumFractionDigits: 2 })
      )
    }
  }).addTo(map);
  

  var miniMap = new L.Control.MiniMap(Esri_NatGeoWorldMap, {
      position: 'topleft',
      toggleDisplay: true,
      zoomLevelOffset: -6
    }
  ).addTo(map);

  // Adds basemaps choices

  /*
  var basemaps = [
          Esri_WorldImagery, Esri_NatGeoWorldMap, OrtofotosSDS,
          OpenTopoMap, Stamen_Watercolor, Stamen_Terrain
          ];

  map.addControl(L.control.basemaps({
    basemaps: basemaps,
    tileX: 0,  // tile X coordinate
    tileY: 0,  // tile Y coordinate
    tileZ: 1   // tile zoom level
    })
  );
  */

  var baseLayers = {
		"OpenTopoMap": OpenTopoMap,
		"Esri Satélite": Esri_WorldImagery,
		"Aquarela (Stamen)": Stamen_Watercolor,
		"Rótulos (Stamen)": Stamen_Terrain
	};

	L.control.mousePosition({
    position: 'bottomleft'
  }).addTo(map);

  var overlays = {
		"Propriedade": PROPRIEDADE,
		"Áreas Verdes": AREASVERDES,
		"Quadras": QUADRAS,
		"Arruamentos": ARRUAMENTOS
	};

	L.control.layers(baseLayers, overlays).addTo(map);

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);

	map.locate({setView: true, maxZoom: 16});

	function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
      alert(e.message);
  }

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

});
