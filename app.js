let inputField = document.getElementById("input");
let btn = document.getElementById("btn");
let date = document.getElementById("date");
let mainContainer = document.getElementById("mainContainer");
let loading = document.getElementById("loading");
let icon = document.getElementById("icon");

const apiKey = "628985bb9ae78bc3ac2a1bb714d4e7d7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Set the current date
let todayDate = new Date();
let month = todayDate.getMonth() + 1;
let currentDate = todayDate.getDate();
let year = todayDate.getFullYear();
date.innerText = `${currentDate} - ${month} - ${year}`;

const getData = (cityName, cb) => {
  loading.style.display = "block"; // Show loading indicator
  fetch(`${apiUrl}?q=${cityName}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((res) => cb(res))
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("city").innerHTML = "Error fetching data. Please try again.";
    })
    .finally(() => {
      loading.style.display = "none"; // Hide loading indicator
    });
};

btn.addEventListener("click", () => {
  const cityName = inputField.value;
  if (cityName) {
    getData(cityName, (data) => {
      // Clear previous data
      document.getElementById("weather").innerHTML = "";
      document.getElementById("city").innerHTML = "";
      document.getElementById("temperature").innerHTML = "";
      document.getElementById("humidity").innerHTML = "";
      document.getElementById("feels-like").innerHTML = "";
      document.getElementById("wind").innerHTML = "";
      icon.src = "";

      if (data && data.name) {
        document.getElementById("weather").innerHTML = data.weather[0].main;
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
        document.getElementById("feels-like").innerHTML = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById("wind").innerHTML = `${Math.round(data.wind.speed)} km/h`;

        let weatherCondition = data.weather[0].main.toLowerCase();
        switch (weatherCondition) {
          case "clear":
            icon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear sky icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1350&q=80')"; // Clear sky background
            break;
          case "clouds":
            icon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Cloudy icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1486663845017-cfd6f2a8c815?fit=crop&w=1350&q=80')"; // Cloudy background
            break;
          case "rain":
            icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Rain icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1603964971438-d8d0b030d1a7?fit=crop&w=1350&q=80')"; // Rainy background
            break;
          case "snow":
            icon.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1606205318256-77493f1d04b2?fit=crop&w=1350&q=80')"; // Snowy background
            break;
          case "haze":
            icon.src = "https://cdn-icons-png.flaticon.com/512/1810/1810442.png"; // Haze icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1478796557975-4c902f7d85fc?fit=crop&w=1350&q=80')"; // Hazy background
            break;
          default:
            icon.src = "https://cdn-icons-png.flaticon.com/512/3026/3026384.png"; // Default icon
            mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1511193311911-7dc5b4afbd4c?fit=crop&w=1350&q=80')"; // Default background
            break;
        }
      } else {
        document.getElementById("city").innerHTML = "City Not Found";
        icon.src = "";
        mainContainer.style.backgroundImage = "url('https://images.unsplash.com/photo-1511193311911-7dc5b4afbd4c?fit=crop&w=1350&q=80')";
      }
    });
    inputField.value = ""; // Clear input field
  }
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")

    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

function randomNotification() {
  const options = {
    body: "This is a test notification",
    icon: 'weatherIcon.jpeg',
  };
  if (Notification.permission === "granted") {
    try {
      new Notification(" Notification", options);
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  } else {
    console.warn("Notification permission not granted");
  }
  setTimeout(randomNotification, 5000);
}
