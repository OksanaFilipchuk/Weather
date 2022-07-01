  
  // let tempC = Math.round(weather[userCity].temp);
  // let tempF = Math.round(weather[userCity].temp * 1.8 + 32);
  
  // let userCity = prompt("Enter city");
  // if (userCity === null || userCity.trim().length === 0) {
  //   alert("You didn't enter a city");
  // } else if (weather.hasOwnProperty(userCity)) {
  //   let tempC = Math.round(weather[userCity].temp);
  //   let tempF = Math.round(weather[userCity].temp * 1.8 + 32);
  //   let humidity = weather[userCity].humidity;
  //   alert(
  //     `It is currently ${tempC}°C (${tempF}°F) in Paris with a humidity of ${humidity}%`
  //   );
  // } else {
  //   alert(
  //     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}`
  //   );
  // }
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
  
  
    
  let currentCityButton = document.querySelector(".current");

  

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
  
  // if (weather.hasOwnProperty(city.innerHTML.toLowerCase())) {
  //   degreeC.addEventListener("click", changeToCelsius);
  //   degreeF.addEventListener("click", changeToFarengate);
  // }
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
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    
    let degreeC = document.querySelector("#C");
    let degreeF = document.querySelector("#F");
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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(showWeather)
      .catch(function (error) {
        alert("Enter city one more time");
      });
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
          alert("Ops...");
        });
    }
    navigator.geolocation.getCurrentPosition(addCurrentCity);
  }


  
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`)
        .then(showWeather)
        .catch(function (error) {
          alert("Ops...");
        })

  form.addEventListener("submit", displayUserCityWeather);  
  currentCityButton.addEventListener("click", showCurrentCity);
  displayDate();
