let locationName = document.getElementById('locationName')
let getLocationButton = document.getElementById('searchButton')
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
          let cityName = data.location.name
          let stateName = data.location.region
          locationName.innerText = `${cityName}, ${stateName}`
          
          //hourlyWeather icons
          document.getElementById('hour0600img').src = data.forecast.forecastday[0].hour[6].condition.icon
          document.getElementById('hour0900img').src = data.forecast.forecastday[0].hour[9].condition.icon
          document.getElementById('hour1200img').src = data.forecast.forecastday[0].hour[12].condition.icon
          document.getElementById('hour1500img').src = data.forecast.forecastday[0].hour[15].condition.icon
          document.getElementById('hour1800img').src = data.forecast.forecastday[0].hour[18].condition.icon

          //hourlyWeather Conditions
          document.getElementById('hour0600condition').innerText = Math.floor(data.forecast.forecastday[0].hour[6].temp_f)
          document.getElementById('hour0900condition').innerText = Math.floor(data.forecast.forecastday[0].hour[9].temp_f)
          document.getElementById('hour1200condition').innerText = Math.floor(data.forecast.forecastday[0].hour[12].temp_f)
          document.getElementById('hour1500condition').innerText = Math.floor(data.forecast.forecastday[0].hour[3].temp_f)
          document.getElementById('hour1800condition').innerText = Math.floor(data.forecast.forecastday[0].hour[6].temp_f)

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }




