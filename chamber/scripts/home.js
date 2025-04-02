// Variables for weather elements
const temp = document.querySelector("#tempe");
const caption = document.querySelector("figcaption");
const icon = document.querySelector("#weather-icon");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const higher = document.querySelector("#higher");
const lower = document.querySelector("#lower");

// Variables for forecast days\const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");

// API details
const apiKey = "4d58ab707da67410e7e026e5699ab1e3"; // Replace with your actual key
const lat = 35.6895;
const lon = 139.6917;

// API URLs for current weather and forecast\const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

/**
 * Fetch data from an API and execute a callback function.
 * @param {string} url - The API endpoint.
 * @param {Function} callback - The function to process the retrieved data.
 */
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

/**
 * Display current weather information.
 * @param {Object} data - Weather data from API.
 */
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

/**
 * Display the 3-day weather forecast.
 * @param {Object} data - Forecast data from API.
 */
function displayForecast(data) {
  const forecastDays = [day1, day2, day3];
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

  forecastList.slice(0, 3).forEach((item, index) => {
    let displayDay = index === 0 ? "Today" : item.dayName;
    forecastDays[index].innerHTML = `<span>${displayDay}: ${item.temp}°C</span>`;
  });
}

// Fetch and display weather data
apiFetch(url, displayResults);
apiFetch(url2, displayForecast);

// Footer script to display current year
const year = document.querySelector("#currentYear");
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

// Display last modification date
const lastModified = document.querySelector("#lastModification");
lastModified.textContent = `${new Date(document.lastModified)}`;

// Hamburger menu script for responsive navigation
function myFunction() {
  var x = document.querySelector(".navigation");
  x.style.display = x.style.display === "block" ? "none" : "block";
}

// Adjust navigation display on window resize
window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation");
  x.style.display = window.innerWidth > 400 ? "flex" : "none";
});

// Business cards script
const fileJson = "data/members.json";
const businessCard = document.querySelector(".cards");
const numberOfDisplay = 3;

/**
 * Fetch business data from JSON file and display cards.
 * @param {string} file - The JSON file containing business data.
 */
async function getBusinessData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();
    displayCards(data.Cards, numberOfDisplay);
    console.log(data);
  } catch (error) {
    console.error("Found an error:", error);
  }
}

/**
 * Display business cards for selected membership levels.
 * @param {Object} Cards - Business data object.
 * @param {number} numberOfDisplay - Number of cards to display.
 */
const displayCards = (Cards, numberOfDisplay) => {
  let displayedCards = 0;
  const businessesArray = Object.values(Cards);
  businessesArray.sort(() => Math.random() - 0.5);

  businessesArray.forEach((business) => {
    if ((business.membership_level === 2 || business.membership_level === 3) && displayedCards < numberOfDisplay) {
      const card = document.createElement("section");
      const portrait = document.createElement("img");
      const textContainer = document.createElement("div");
      const companyName = document.createElement("h2");
      const address = document.createElement("p");
      const phone = document.createElement("p");
      const url = document.createElement("a");

      portrait.setAttribute("src", business.image || "default-image.jpg");
      portrait.setAttribute("alt", business.name || "Business Image");
      portrait.setAttribute("loading", "lazy");

      companyName.textContent = business.additional_info?.company || "No Name";
      address.textContent = business.address || "No Address Available";
      phone.textContent = business.phone || "No Contact Info";

      url.setAttribute("href", business.website || "#");
      url.setAttribute("target", "_blank");
      url.textContent = "Visit Website";

      textContainer.appendChild(address);
      textContainer.appendChild(phone);
      textContainer.appendChild(url);
      card.appendChild(companyName);
      card.appendChild(portrait);
      card.appendChild(textContainer);
      businessCard.appendChild(card);
      displayedCards++;
    }
  });
};

// Load business data
getBusinessData(fileJson);