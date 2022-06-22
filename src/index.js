let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    moscow: {
      temp: -5,
      humidity: 20
    }
  };
  let days = [
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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
  
  let degreeC = document.querySelector("#C");
  let degreeF = document.querySelector("#F");
  let currentDegree = document.querySelector("#curentDegree");
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
  
  function addCityTemp(event) {
    event.preventDefault();
    const userCity = form.elements.city.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  
    function showTemp(response) {
      currentDegree.innerHTML = Math.round(response.data.main.temp);
      city.innerHTML = userCity;
    }
  
    axios
      .get(apiUrl)
      .then(showTemp)
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
      function showTemp(response) {
        currentDegree.innerHTML = Math.round(response.data.main.temp);
        city.innerHTML = response.data.name;
        // console.log(response.data);
      }
      axios
        .get(apiUrl)
        .then(showTemp)
        .catch(function (error) {
          alert("Ops...");
        });
    }
    navigator.geolocation.getCurrentPosition(addCurrentCity);
  }
  
  form.addEventListener("submit", addCityTemp);
  currentCityButton.addEventListener("click", showCurrentCity);
  