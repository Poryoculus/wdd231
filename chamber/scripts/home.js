// Variables
const temp = document.querySelector("#tempe");
const caption = document.querySelector("figcaption");
const icon = document.querySelector("#weather-icon");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const higher = document.querySelector("#higher");
const lower = document.querySelector("#lower");

// Forecast variables
const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");

const apiKey = "4d58ab707da67410e7e026e5699ab1e3"; // Reemplaza con tu clave real
const lat = 35.6895;
const lon = 139.6917;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Fetch datos de clima actual
async function apiFetch(url, callback) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      callback(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Mostrar datos del clima actual
function displayResults(data) {
  temp.innerHTML = `<span>${Math.round(data.main.temp)}°C</span>`;
  humidity.innerHTML = `<span>Humidity: ${data.main.humidity}%</span>`;
  higher.innerHTML = `<span>Higher: ${Math.round(data.main.temp_max)}°C </span>`;
  lower.innerHTML = `<span>Lower: ${Math.round(data.main.temp_min)}°C </span>`;

  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let condition = data.weather[0].description;

  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", condition);
  caption.innerHTML = `<span>${condition}</span>`;
  wind.innerHTML = `<span>${data.wind.speed} km/h</span>`;
}

// Mostrar pronóstico del clima
function displayForecast(data) {
  const forecastDays = [day1, day2, day3];

  // Get unique days from the forecast
  let processedDays = new Set();
  let forecastList = [];

  data.list.forEach((item) => {
    let date = new Date(item.dt_txt);
    let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    if (!processedDays.has(dayName)) {
      processedDays.add(dayName);
      forecastList.push({ dayName, temp: Math.round(item.main.temp) });
    }
  });

  // Display the first three valid days
  forecastList.slice(0, 3).forEach((item, index) => {
    let displayDay = index === 0 ? "Today" : item.dayName;
    forecastDays[index].innerHTML =
      `<span>${displayDay}: ${item.temp}°C</span>`;
  });
}

// Llamadas a la API
apiFetch(url, displayResults);
apiFetch(url2, displayForecast);
//footer script
const year = document.querySelector("#currentYear");

const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let lastModified = document.querySelector("#lastModification");
let lastModification = new Date(document.lastModified);
lastModified.textContent = `${lastModification}`;
// Hamburguer menu script
function myFunction() {
  var x = document.querySelector(".navigation"); // Use querySelector for classes
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation");

  if (window.innerWidth > 400) {
    x.style.display = "flex";
  } else if (!x.style.display || x.style.display === "flex") {
    x.style.display = "none";
  }
});

//cards script

const fileJson = "data/members.json";
const bussinessCard = document.querySelector(".cards");
const numberofdisplay = 3;

async function getBussinessData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();

    displayCards(data.Cards, numberofdisplay);

    console.log(data);
  } catch (error) {
    console.error("Found an error:", error);
  }
}

const displayCards = (Cards, numberofdisplay) => {
  let displayedCards = 0; // Counter for displayed cards

  Object.values(Cards).forEach((business) => {
    if (
      (business.membership_level === 2 || business.membership_level === 3) &&
      displayedCards < numberofdisplay
    ) {
      const card = document.createElement("section");
      const portrait = document.createElement("img");
      const textcontainer = document.createElement("div");
      const companyName = document.createElement("h2");
      const address = document.createElement("p");
      const phone = document.createElement("p"); // Renamed from "number" to avoid conflicts
      const url = document.createElement("a");

      // Set image attributes (with fallback)
      portrait.setAttribute("src", business.image || "default-image.jpg");
      portrait.setAttribute("alt", business.name || "Business Image");
      portrait.setAttribute("loading", "lazy"); // Performance optimization

      // Set text content with fallbacks
      companyName.textContent = business.additional_info?.company || "No Name";
      address.textContent = business.address || "No Address Available";
      phone.textContent = business.phone || "No Contact Info";

      // Set URL attributes
      url.setAttribute("href", business.website || "#");
      url.setAttribute("target", "_blank");
      url.textContent = "Visit Website";

      textcontainer.appendChild(address);
      textcontainer.appendChild(phone);
      textcontainer.appendChild(url);

      // Append elements to card

      card.appendChild(companyName);
      card.appendChild(portrait);
      card.appendChild(textcontainer);
      // Append card to container
      bussinessCard.appendChild(card);

      displayedCards++; // Increment displayed count
    }
  });
};

// Call function to load data
getBussinessData(fileJson);
