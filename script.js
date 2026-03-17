
const apiKey = "e6d45b110e24f3c70ba7ecaa2f0c5c14";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const cityElement = document.getElementById("current-city");
const tempElement = document.getElementById("current-temperature");
const detailsElement = document.querySelector(".current-details");

//  tis function handles the search and API call, and updates the UI with loading state and error handling
async function getWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    cityElement.innerHTML = "Loading...";
    
    const response = await fetch(apiUrl);
    
    // Check if the city exists
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);

  } catch (error) {
    cityElement.innerHTML = "Error";
    tempElement.innerHTML = "--";
    detailsElement.innerHTML = `Sorry, we couldn't find "${city}".`;
    console.error(error);
  }
}

// ths function takes the API response and updates the HTML elements with the weather data
function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const city = data.name;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  cityElement.innerHTML = city;
  tempElement.innerHTML = temp;


  detailsElement.innerHTML = `
    ${description} <br />
    Humidity: <strong>${humidity}%</strong>, 
    Wind: <strong>${windSpeed} km/h</strong>
  `;
}

// to hundle search form submisson
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = input.value.trim();
  getWeather(city);
});

// this is initial search so the page isn't empty on load
getWeather("Paris");