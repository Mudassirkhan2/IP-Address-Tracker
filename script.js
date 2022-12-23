const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const ipaddressValue = document.getElementById("ip-address");
const locationValue = document.getElementById("location");
const timezoneValue = document.getElementById("timezone");
const ISPValue = document.getElementById("ISP");

// intializing map view
let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; ",
}).addTo(map);
// marker position
L.marker([51.5, -0.09]).addTo(map).bindPopup("Brooklyn").openPopup();

// to show the ip address of users when he load the page
window.addEventListener("load", (event) => {
  let promise = fetch(`https://ipapi.co/json/`);

  promise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // ipaddressValue.innerText = `${data.ip}`;
      locationValue.innerHTML = `${data.city},<br>${data.region},<br>${data.country}`;
      ISPValue.innerText = `${data.org}`;
      timezoneValue.innerText = `${data.timezone}`;

      // map api location marker icon
      L.marker([`${data.latitude}`, `${data.longitude}`])
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        attribution: "&copy; ",
      }).addTo(map);

      // setting  LatLng ( latitude and longitude) to display output on map
      let popup = L.popup()
        .setLatLng([`${data.latitude}`, `${data.longitude}`])
        .setContent(`${data.city}`)
        .openOn(map);

      // function if a user clicks anywhere on the map to show LatLng
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on("click", onMapClick);
    })

    // error message if user enters wrong input
    .catch((error) => {
      console.log(error);
      alert("'Input correct IPv4 or IPv6 address.'");
    });
});

// search icon EventListener
searchBtn.addEventListener("click", () => {
  // storing input value
  let ipAddressGiven = searchInput.value.trim();
  if (ipAddressGiven) {
    let promise = fetch(`https://ipapi.co/${ipAddressGiven}/json/`);

    promise
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        ipaddressValue.innerText = `${data.ip}`;
        locationValue.innerHTML = `${data.city},<br>${data.region},<br>${data.country}`;
        ISPValue.innerText = `${data.org}`;
        timezoneValue.innerText = `${data.timezone}`;

        // map api location marker icon
        L.marker([`${data.latitude}`, `${data.longitude}`])
          .addTo(map)
          .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
          .openPopup();

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 15,
          attribution: "&copy; ",
        }).addTo(map);

        // setting  LatLng ( latitude and longitude) to display output on map
        let popup = L.popup()
          .setLatLng([`${data.latitude}`, `${data.longitude}`])
          .setContent(`${data.city}`)
          .openOn(map);

        // function if a user clicks anywhere on the map to show LatLng
        function onMapClick(e) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
        }

        map.on("click", onMapClick);
      })

      // error message if user enters wrong input
      .catch((error) => {
        console.log(error);
        alert("'Input correct IPv4 or IPv6 address.'");
      });
  }
});
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});
