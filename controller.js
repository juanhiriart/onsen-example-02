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

window.onload = function()
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
}







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
