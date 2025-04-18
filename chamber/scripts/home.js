// variables for weather elements
const temp = document.queryselector("#tempe");
const caption = document.queryselector("figcaption");
const icon = document.queryselector("#weather-icon");
const wind = document.queryselector("#wind");
const humidity = document.queryselector("#humidity");
const higher = document.queryselector("#higher");
const lower = document.queryselector("#lower");

// variables for forecast days\const day1 = document.queryselector("#day1");
const day2 = document.queryselector("#day2");
const day3 = document.queryselector("#day3");

// api details
const apikey = "4d58ab707da67410e7e026e5699ab1e3"; // replace with your actual key
const lat = 35.6895;
const lon = 139.6917;

// api urls for current weather and forecast\const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

/**
 * fetch data from an api and execute a callback function.
 * @param {string} url - the api endpoint.
 * @param {function} callback - the function to process the retrieved data.
 */
async function apifetch(url, callback) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      callback(data);
    } else {
      throw new error(await response.text());
    }
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

/**
 * display current weather information.
 * @param {object} data - weather data from api.
 */
function displayresults(data) {
  temp.innerhtml = `<span>${math.round(data.main.temp)}°c</span>`;
  humidity.innerhtml = `<span>humidity: ${data.main.humidity}%</span>`;
  higher.innerhtml = `<span>higher: ${math.round(data.main.temp_max)}°c </span>`;
  lower.innerhtml = `<span>lower: ${math.round(data.main.temp_min)}°c </span>`;

  const iconurl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let condition = data.weather[0].description;

  icon.setattribute("src", iconurl);
  icon.setattribute("alt", condition);
  caption.innerhtml = `<span>${condition}</span>`;
  wind.innerhtml = `<span>${data.wind.speed} km/h</span>`;
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
    forecastDays[index].innerHTML =
      `<span>${displayDay}: ${item.temp}°C</span>`;
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
  var x = document.querySelector(".navigation nav");
  x.style.display = x.style.display === "block" ? "none" : "block";
}

// Adjust navigation display on window resize
window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation nav");
  x.style.display = window.innerWidth > 600 ? "flex" : "none";
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
    if (
      (business.membership_level === 2 || business.membership_level === 3) &&
      displayedCards < numberOfDisplay
    ) {
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
