const temp = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const caption = document.getElementsByTagName("figcaption");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75094216906828&lon=6.630480956713235&appid=4d58ab707da67410e7e026e5699ab1e3";

async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  temp.textContent = data.temp;
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let description = data.weather[0].description;
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", description);
  caption[0].textContent = description;
}

apiFetch();
