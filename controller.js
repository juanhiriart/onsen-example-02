window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

var watchID;
var geo;    // for the geolocation object
var map;    // for the google map object
var mapMarker;  // the google map marker object

// position options
var MAXIMUM_AGE = 200; // miliseconds
var TIMEOUT = 300000;
var HIGHACCURACY = true;

function getLocation()
{
  if((geo = getGeoLocation())) {
      startWatching();
  } else {
      alert('Geolocation not supported.')
  }
}

function getGeoLocation() {
    try {
        if( !! navigator.geolocation ) return navigator.geolocation;
        else return undefined;
    } catch(e) {
        return undefined;
    }
}

function show_map(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, lon);

    console.log("map = " + map);

    if(map) {
        map.panTo(latlng);
        mapMarker.setPosition(latlng);
    } else {
        var myOptions = {
            zoom: 18,
            center: latlng,

            // mapTypeID --
            // ROADMAP displays the default road map view
            // SATELLITE displays Google Earth satellite images
            // HYBRID displays a mixture of normal and satellite views
            // TERRAIN displays a physical map based on terrain information.
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.setTilt(0); // turns off the annoying default 45-deg view

        mapMarker = new google.maps.Marker({
            position: latlng,
            title:"You are here."
        });
        mapMarker.setMap(map);
    }
}

function geo_error(error) {
    stopWatching();
    switch(error.code) {
        case error.TIMEOUT:
            alert('Geolocation Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Geolocation Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            alert('Geolocation Permission denied');
            break;
        default:
            alert('Geolocation returned an unknown error code: ' + error.code);
    }
}

function stopWatching() {
    if(watchID) geo.clearWatch(watchID);
    watchID = null;
    map = undefined;
}

function startWatching() {
    watchID = geo.watchPosition(show_map, geo_error, {
        enableHighAccuracy: HIGHACCURACY,
        maximumAge: MAXIMUM_AGE,
        timeout: TIMEOUT
    });
}

/*
function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      showMap(lat, lon);
    });
  }
  else
  {
    document.write('Your browser does not support Geolocation');
  }
}
*/

/*
function showMap(lat, lon)
{
  var myLatLng = new google.maps.LatLng(lat, lon);

  var mapOptions = {
  zoom: 15,
  center: myLatLng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Found you!'
  });

  showPointOfInterest(map);

};
*/

var locations = [
  {name: "Juan's flat",
  lat: 53.30058397483567,
  lng: -2.1007242278630938,
  description: "This is were Dr Juan lives."},
  {name: "Bollington rec",
  lat: 53.299155,
  lng: -2.103137,
  description: "This is were Dr Juan plays."},
  {name: "Somewhere in the canal",
  lat: 53.301264,
  lng: -2.103073,
  description: "This is were Dr Juan walks."}
]

function tellPlaceStory()
{
  var closest = 0;
  document.getElementById('placeName').innerHTML = locations[closest].name;
  document.getElementById('disToPlace').innerHTML = 0000;
  document.getElementById('placeDescription').innerHTML = locations[closest].description;
}

function showPointOfInterest(map)
{
  var pointsOfInterest = [
    { position: new google.maps.LatLng(53.30058397483567, -2.1007242278630938),
      type: 'info'},
    { position: new google.maps.LatLng(53.299155, -2.103137),
      type: 'info'},
    { position: new google.maps.LatLng(53.301264, -2.103073),
      type: 'info'}
  ];

  for (var i = 0; i < pointsOfInterest.length; i++)
  {
    var marker = new google.maps.Marker({
    position: pointsOfInterest[i].position,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
    map: map
    });
  };
};

//https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function distance(lat1, lon1, lat2, lon2, unit)
{
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist;
}




//https://developers.google.com/maps/documentation/javascript/custom-markers

  /*
  var pos = {lat: 53.30058397483567, lng: -2.1007242278630938};
  infoWindow = new google.maps.InfoWindow;
  infoWindow.setPosition(pos);
  infoWindow.setContent('Point 1');
  infoWindow.open(map);
  */









/*
document.addEventListener('init', function(event) {
  console.log(event.target);
  if (event.target.matches('#map.html')) {
    ons.notification.alert('Map page is initiated.');
    console.log("map initiated");
    // Set up content...
  }
}, false);
*/
