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

  for (var i = 0; i < pointsOfInterest.length; i++) {
    var marker = new google.maps.Marker({
    position: pointsOfInterest[i].position,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
    map: map
    });
  };
};

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
