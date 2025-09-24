const mainnav = document.querySelector("nav");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("show");
  hambutton.classList.toggle("open");
});

const year = document.querySelector("#year");
const lastModified = document.querySelector("#lastModified");

year.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

const spotlightContainer = document.querySelector(".spotlight-container");

async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to load members.json");
    const members = await response.json();

    const spotlightMembers = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    const selected = [];
    while (selected.length < 3 && spotlightMembers.length > 0) {
      const randIndex = Math.floor(Math.random() * spotlightMembers.length);
      const member = spotlightMembers.splice(randIndex, 1)[0];
      selected.push(member);
    }

    spotlightContainer.innerHTML = "";
    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="images/members/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>☎ ${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Spotlight load failed:", error);
  }
}
if (spotlightContainer) {
  fetchSpotlights();
}

const currentTemp = document.getElementById("current-temp");
const forecastDiv = document.getElementById("forecast");

const lat = -19.45;
const lon = 29.82;
const apiKey = "e799f8ab4b0ed36fd8c94178976de41b";
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error("API fetch failed");

    const data = await response.json();

    currentTemp.textContent = `🌡️ ${data.list[0].main.temp.toFixed(1)} °C, ${data.list[0].weather[0].description}`;

    forecastDiv.innerHTML = "";
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
      const div = document.createElement("div");
      const date = new Date(day.dt_txt);

      div.innerHTML = `
        <strong>${date.toLocaleDateString("en-ZW", { weekday: "short" })}</strong>
        <p>${day.main.temp.toFixed(1)} °C</p>
        <p>${day.weather[0].description}</p>
      `;

      forecastDiv.appendChild(div);
    });

  } catch (error) {
    console.error("Weather error:", error);
    currentTemp.textContent = "⚠️ Weather data unavailable";
  }
}

fetchWeather();
