let locationName = document.getElementById('locationName')
let getLocationButton = document.getElementById('searchButton')
let currentTemperature = document.getElementById('currentTemperature')
let uvIndex = document.getElementById('uvIndex')
let rainChance = document.getElementById('rainChance')
let currentWeatherIcon = document.getElementById('currentWeatherIcon')
let searchSection = document.querySelector('.searchLocation')
let currentWeatherSection = document.querySelector('.currentWeather')
let weatherData = document.querySelector('.weatherData')
let hourlyWeatherSection = document.querySelector('.hourlyWeather')

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


function getWeather(){
    const location = document.querySelector('input').value
    const url = `http://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
    
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          currentTemperature.innerText = Math.floor(data.current.temp_f)
          //currentWeatherIcon.src = data.current.condition.icon
          let cityName = data.location.name
          let stateName = data.location.region
          locationName.innerText = `${cityName}, ${stateName}`
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }

function chooseIcon(){
  const location = document.querySelector('input').value
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`)
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

function getHourlyWeather(){
  const location = document.querySelector('input').value
  const url = `http://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById('hour1icon').src = data.forecast.forecastday[0].hour[6].condition.icon
        document.getElementById('hour2icon').src = data.forecast.forecastday[0].hour[7].condition.icon
        document.getElementById('hour3icon').src = data.forecast.forecastday[0].hour[8].condition.icon
        document.getElementById('hour4icon').src = data.forecast.forecastday[0].hour[9].condition.icon
        document.getElementById('hour5icon').src = data.forecast.forecastday[0].hour[10].condition.icon

        document.getElementById('hour1temp').innerText = data.forecast.forecastday[0].hour[6].temp_f
        document.getElementById('hour2temp').innerText = data.forecast.forecastday[0].hour[7].temp_f
        document.getElementById('hour3temp').innerText = data.forecast.forecastday[0].hour[8].temp_f
        document.getElementById('hour4temp').innerText = data.forecast.forecastday[0].hour[9].temp_f
        document.getElementById('hour5temp').innerText = data.forecast.forecastday[0].hour[10].temp_f
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


 //hourlyWeather icons
          // document.getElementById('hour0600img').src = data.forecast.forecastday[0].hour[6].condition.icon
          // document.getElementById('hour0900img').src = data.forecast.forecastday[0].hour[9].condition.icon
          // document.getElementById('hour1200img').src = data.forecast.forecastday[0].hour[12].condition.icon
          // document.getElementById('hour1500img').src = data.forecast.forecastday[0].hour[15].condition.icon
          // document.getElementById('hour1800img').src = data.forecast.forecastday[0].hour[18].condition.icon

          // //hourlyWeather Conditions
          // document.getElementById('hour0600condition').innerText = Math.floor(data.forecast.forecastday[0].hour[6].temp_f)
          // document.getElementById('hour0900condition').innerText = Math.floor(data.forecast.forecastday[0].hour[9].temp_f)
          // document.getElementById('hour1200condition').innerText = Math.floor(data.forecast.forecastday[0].hour[12].temp_f)
          // document.getElementById('hour1500condition').innerText = Math.floor(data.forecast.forecastday[0].hour[3].temp_f)
          // document.getElementById('hour1800condition').innerText = Math.floor(data.forecast.forecastday[0].hour[6].temp_f)
// function drawCards(){
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data)
//       player1card.src = data.cards[0].image
//       player2card.src = data.cards[1].image

//       let player1value = strToValue(data.cards[0].value);
//       let player2value = strToValue(data.cards[1].value);
//       if(player1value > player2value){winner.innerText = 'Player 1 Wins'
//       } else if(player1value < player2value){winner.innerText = 'Player 2 Wins'
//       } else {winner.innerText = 'TIE'}
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });
// }



//background color: if current temperature is certain range, background color is that

