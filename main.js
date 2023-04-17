let locationName = document.getElementById('locationName')
let getLocationButton = document.getElementById('searchButton')
let currentTemperature = document.getElementById('currentTemperature')
let uvIndex = document.getElementById('uvIndex')
let humidity = document.getElementById('humidity')
let currentWeatherIcon = document.getElementById('currentWeatherIcon')
let searchSection = document.querySelector('.searchLocation')
let currentWeatherSection = document.querySelector('.currentWeather')
let weatherData = document.querySelector('.weatherData')
let hourlyWeatherSection = document.querySelector('.moreWeatherData')



let upArrow = document.getElementById('upArrow')


getLocationButton.addEventListener('click', getWeather)
getLocationButton.addEventListener('click', removeSearchBar)
getLocationButton.addEventListener('click', chooseIcon)
getLocationButton.addEventListener('click', getHourlyWeather)


locationName.addEventListener('click', chooseNewLocation)





function removeSearchBar(){
    searchSection.style.display = 'none';
    weatherData.style.display = 'flex';
}
function chooseNewLocation(){
  weatherData.style.display = 'none';
  searchSection.style.display = 'flex';
}

upArrow.addEventListener('click', () => hourlyWeatherSection.scrollIntoView({
  behavior: 'smooth',
}));
//upArrow.addEventListener('click', () => upArrow.style.transform = 'rotate(180deg)')


function getWeather(){
    const location = document.querySelector('input').value
    const url = `https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
    
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          currentTemperature.innerText = Math.floor(data.current.temp_f) + '\xB0'
          //currentWeatherIcon.src = data.current.condition.icon
          let cityName = data.location.name
          let stateName = data.location.region
          locationName.innerText = `${cityName}, ${stateName}`
          document.getElementById('currentWeatherCondition').innerText = data.current.condition.text

          uvIndex.innerText = data.current.uv
          humidity.innerText = data.current.humidity
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }

function chooseIcon(){
  const location = document.querySelector('input').value
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`)
       .then(res => res.json()) // parse response as JSON
       .then(data => {
          console.log(data)
          let weatherCondition = data.current.condition.code;
          console.log(weatherCondition)
          if (weatherCondition === 1000){
            currentWeatherIcon.src = 'images/icons/sunny.png'
          } else if (weatherCondition === 1063 
            || weatherCondition === 1150 
            || weatherCondition === 1153
            || weatherCondition === 1180 
            || weatherCondition === 1183
            ){
            currentWeatherIcon.src = 'images/icons/sunrain.png'
          } else if (weatherCondition === 1087 
            || weatherCondition === 1273 
            || weatherCondition === 1276
            || weatherCondition === 1279 
            || weatherCondition === 1282
            ){
            currentWeatherIcon.src = 'images/icons/stormy.png'
        } else if (weatherCondition === 1186 
          || weatherCondition === 1189 
          || weatherCondition === 1192
          || weatherCondition === 1195 
          || weatherCondition === 1240
          || weatherCondition === 1243 
          || weatherCondition === 1246
          ){
          currentWeatherIcon.src = 'images/icons/rainy.png'
          } else if (weatherCondition === 1030 
            ){
            currentWeatherIcon.src = 'images/icons/cloudy.png'
            } else if (weatherCondition === 1003 
              || weatherCondition === 1009 
              ){
              currentWeatherIcon.src = 'images/icons/partCloudy.png'
              }
        })
       .catch(err => {
           console.log(`error ${err}`)
       });
      }
var today = new Date();
var time = today.getHours();
console.log(time)
//if (time > 12){time = time - 12}



function getHourlyWeather(){
  const location = document.querySelector('input').value
  const url = `https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById('hour1icon').src = data.forecast.forecastday[0].hour[7].condition.icon
        document.getElementById('hour2icon').src = data.forecast.forecastday[0].hour[8].condition.icon
        document.getElementById('hour3icon').src = data.forecast.forecastday[0].hour[9].condition.icon
        document.getElementById('hour4icon').src = data.forecast.forecastday[0].hour[10].condition.icon
        document.getElementById('hour5icon').src = data.forecast.forecastday[0].hour[11].condition.icon
        document.getElementById('hour6icon').src = data.forecast.forecastday[0].hour[12].condition.icon
        document.getElementById('hour7icon').src = data.forecast.forecastday[0].hour[13].condition.icon
        document.getElementById('hour8icon').src = data.forecast.forecastday[0].hour[14].condition.icon
        document.getElementById('hour9icon').src = data.forecast.forecastday[0].hour[15].condition.icon
        document.getElementById('hour10icon').src = data.forecast.forecastday[0].hour[16].condition.icon
        document.getElementById('hour11icon').src = data.forecast.forecastday[0].hour[17].condition.icon
        document.getElementById('hour12icon').src = data.forecast.forecastday[0].hour[18].condition.icon

        document.getElementById('hour1temp').innerText = Math.round(data.forecast.forecastday[0].hour[7].temp_f) + '\xB0'
        document.getElementById('hour2temp').innerText = Math.round(data.forecast.forecastday[0].hour[8].temp_f)+ '\xB0'
        document.getElementById('hour3temp').innerText = Math.round(data.forecast.forecastday[0].hour[9].temp_f)+ '\xB0'
        document.getElementById('hour4temp').innerText = Math.round(data.forecast.forecastday[0].hour[10].temp_f)+ '\xB0'
        document.getElementById('hour5temp').innerText = Math.round(data.forecast.forecastday[0].hour[11].temp_f)+ '\xB0'
        document.getElementById('hour6temp').innerText = Math.round(data.forecast.forecastday[0].hour[12].temp_f)+ '\xB0'
        document.getElementById('hour7temp').innerText = Math.round(data.forecast.forecastday[0].hour[13].temp_f) + '\xB0'
        document.getElementById('hour8temp').innerText = Math.round(data.forecast.forecastday[0].hour[14].temp_f)+ '\xB0'
        document.getElementById('hour9temp').innerText = Math.round(data.forecast.forecastday[0].hour[15].temp_f)+ '\xB0'
        document.getElementById('hour10temp').innerText = Math.round(data.forecast.forecastday[0].hour[16].temp_f)+ '\xB0'
        document.getElementById('hour11temp').innerText = Math.round(data.forecast.forecastday[0].hour[17].temp_f)+ '\xB0'
        document.getElementById('hour12temp').innerText = Math.round(data.forecast.forecastday[0].hour[18].temp_f)+ '\xB0'

      // if(time>12){time = time-12}
      //   document.getElementById('hour1hour').innerText = 'now'
      //   document.getElementById('hour2hour').innerText = time + 1
      //   document.getElementById('hour3hour').innerText = time + 2
      //   document.getElementById('hour4hour').innerText = time + 3
      //   document.getElementById('hour5hour').innerText = time + 4
      //   document.getElementById('hour6hour').innerText = time + 5

        document.getElementById('hour1rain').innerText = data.forecast.forecastday[0].hour[7].chance_of_rain + '%'
        document.getElementById('hour2rain').innerText = data.forecast.forecastday[0].hour[8].chance_of_rain + '%'
        document.getElementById('hour3rain').innerText = data.forecast.forecastday[0].hour[9].chance_of_rain + '%'
        document.getElementById('hour4rain').innerText = data.forecast.forecastday[0].hour[10].chance_of_rain + '%'
        document.getElementById('hour5rain').innerText = data.forecast.forecastday[0].hour[11].chance_of_rain + '%'
        document.getElementById('hour6rain').innerText = data.forecast.forecastday[0].hour[12].chance_of_rain + '%'
        document.getElementById('hour7rain').innerText = data.forecast.forecastday[0].hour[13].chance_of_rain + '%'
        document.getElementById('hour8rain').innerText = data.forecast.forecastday[0].hour[14].chance_of_rain + '%'
        document.getElementById('hour9rain').innerText = data.forecast.forecastday[0].hour[15].chance_of_rain + '%'
        document.getElementById('hour10rain').innerText = data.forecast.forecastday[0].hour[16].chance_of_rain + '%'
        document.getElementById('hour11rain').innerText = data.forecast.forecastday[0].hour[17].chance_of_rain + '%'
        document.getElementById('hour12rain').innerText = data.forecast.forecastday[0].hour[18].chance_of_rain + '%'
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}




//background color: if current temperature is certain range, background color is that


