function displayDate(){
let days = [
  "Sunday",
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let date = document.querySelector("#date");
let currentDate = new Date();
date.innerHTML =
  currentDate.getDate() +
  ".0" +
  (currentDate.getMonth() + 1) +
  "." +
  currentDate.getFullYear();    
let dayTime = document.querySelector("#day-time");

function getHour(hour) {
  if (hour < 10) {
    return "0" + hour;
  } else return hour;
}

dayTime.innerHTML =
  days[currentDate.getDay()] +
  " " +
  getHour(currentDate.getHours()) +
  ":" +
  getHour(currentDate.getMinutes());
}
  

function dayFormat(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay(date);
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
return days[day]
};

function showDailyForecast(response){
  const forecast = document.querySelector("#forecast");        
  forecast.innerHTML = "";
  console.log(response);
  response.data.daily.forEach((day,index) => { 

    if (index < 6){
      let div = document.createElement("div");
      forecast.append(div);
      div.classList.add("col-2");
      div.innerHTML = `<h5>${dayFormat(day.dt)}</h5>
      <img src = "http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png" class="icon-container"></img>
      <span class="min-degree">${Math.round(day.temp.min)}°</span>
      <span class="max-degree">${Math.round(day.temp.max)}°</span>`
    }

  })
  
}

function showForecast(response){
  const forecast = document.querySelector("#forecast");
  const lat = response.data.coord.lat;
  const lon = response.data.coord.lon;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios
      .get(url)
      .then(showDailyForecast)
      .catch(function (error) {
        alert("Enter your city one more time");
      });    
};

function changeToCelsius() {
  if (weather.hasOwnProperty(city.innerHTML.toLowerCase())) {
    let tempC = Math.round(weather[city.innerHTML.toLowerCase()].temp);
    document.querySelector("#curentDegree").innerHTML = tempC;
  } else return;
}

function changeToFarengate() {
  if (weather.hasOwnProperty(city.innerHTML.toLowerCase())) {
    let tempF = Math.round(
      weather[city.innerHTML.toLowerCase()].temp * 1.8 + 32
    );
    document.querySelector("#curentDegree").innerHTML = tempF;
  } else return;
}

const apiKey = "aff55d35f400e77ce588e940e4f2c0e3";
const form = document.querySelector("#form");
const city = document.querySelector("#city");
const proposedCities = document.querySelectorAll(".proposed-cities");
proposedCities.forEach(elem => {
  elem.addEventListener("click", function(){axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${elem.textContent}&appid=${apiKey}&units=metric`)
  .then(showWeather)
  .catch(function (error) {
    alert("Enter city one more time")
  })
  })
});


function showWeather(response) {
  let currentDegree = document.querySelector("#curentDegree");
  currentDegree.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  let description = document.querySelector('#description');
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector('#wind');
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  showForecast(response);
  

  
  let degreeC = document.querySelector("#C");
  let degreeF = document.querySelector("#F");
  degreeC.classList.add("active");
  degreeF.classList.remove("active");
  degreeC.addEventListener("click", function(){
    degreeF.classList.remove("active");
    degreeC.classList.add("active");
    currentDegree.innerHTML = Math.round(response.data.main.temp);
    
  })
  degreeF.addEventListener("click", function(){
    degreeC.classList.remove("active");
    degreeF.classList.add("active");
    currentDegree.innerHTML = Math.round((response.data.main.temp)* 1.8 + 32);
  })
  
}

function displayUserCityWeather(event) {
  event.preventDefault();
  const userCity = form.elements.city.value;
  searchCity(userCity);   
}

function showCurrentCity(event) {
  event.preventDefault();

  function addCurrentCity(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(showWeather)
      .catch(function (error) {
        alert("Enter your city one more time");
      });
  }
  navigator.geolocation.getCurrentPosition(addCurrentCity);
}


function searchCity(city) {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(showWeather)
      .catch(function (error) {
        alert("Enter your city one more time");
      })
} 

form.addEventListener("submit", displayUserCityWeather);  
let currentCityButton = document.querySelector(".current");
currentCityButton.addEventListener("click", showCurrentCity);
displayDate();
searchCity("Kyiv");
