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

var closestLocation;

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

    // console.log("map = " + map);

    if(map) {
        map.panTo(latlng);
        mapMarker.setPosition(latlng);
    } else {
        var myOptions = {
            zoom: 18,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.setTilt(0); // turns off the annoying default 45-deg view

        mapMarker = new google.maps.Marker({
            position: latlng,
            title:"You are here."
        });
        mapMarker.setMap(map);

        showPointOfInterest(map);

        closestLocation = getClosest(lat, lon, locations);
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
    //this is necessary for the map to be displayed again when changing pages
    map = undefined;
}

function startWatching() {
    watchID = geo.watchPosition(show_map, geo_error, {
        enableHighAccuracy: HIGHACCURACY,
        maximumAge: MAXIMUM_AGE,
        timeout: TIMEOUT
    });
}

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
  description: "This is were Dr Juan walks."},
  {name: "MADCC Canoe Club",
  lat: 53.293020,
  lng: -2.106697,
  description: "This is were Dr Juan trains to be the next world champion."}
]

function tellPlaceStory()
{
  var closest = 0;
  document.getElementById('placeName').innerHTML = closestLocation.name;
  document.getElementById('disToPlace').innerHTML = 0000;
  document.getElementById('placeDescription').innerHTML = closestLocation.description;
};


//var closestDist;
function getClosest(lat, lng, locations)
{
  closest = locations[0];
  var d = distance(lat, lng, closest.lat, closest.lng);
  for(var i = 0 ; i < locations.length ; i++)
  {
    var dd = distance(lat, lng, locations[i].lat, locations[i].lng);
    if(dd < d)
    {
      closest = locations[i];
      d = dd;
    }

    var roundDist = Math.round(d*1000)/1000;
    document.getElementById('dist-debug').innerHTML = "Distance: " + roundDist;

    if(roundDist < 0.01)
    {
      ons.notification.alert('You just reached ' + closest.name);
    }
  }
  return closest;
}


function showPointOfInterest(map)
{
  for (var i = 0; i < locations.length; i++)
  {
    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
    map: map
    });
  };

  /*
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
  */
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

function showSettingsPage()
{
  var range = document.getElementById('dist-range');
  console.log(range.value);
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
