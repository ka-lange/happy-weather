let locationName = document.getElementById('locationName')
let getLocationButton = document.querySelector('button')
let currentTemperature = document.getElementById('currentTemperature')
let uvIndex = document.getElementById('uvIndex')
let rainChance = document.getElementById('rainChance')
let currentWeatherIcon = document.getElementById('currentWeatherIcon')

getLocationButton.addEventListener('click', getWeather)


function getWeather(){
    const location = document.querySelector('input').value
    const url = `http://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
    
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          currentTemperature.innerText = Math.floor(data.current.temp_f)
          currentWeatherIcon.src = data.current.condition.icon
          locationName.innerText = data.location.name
          
          
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }




