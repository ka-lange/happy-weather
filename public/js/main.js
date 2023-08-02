
const searchButton = document.getElementById('searchButton');
const hourlyTempSection = document.getElementById('hourlyTemp');
const searchBar = document.getElementById('searchBar')
const frontPage = document.getElementById('frontPage')
const secondPage = document.getElementById('secondPage')
const downArrow = document.getElementById('downArrow')
const startPage = document.getElementById('startPage')
const recentLocations = document.getElementById('recentLocations')

const locationName = document.getElementById('locationName')
const currentTemperature = document.getElementById('currentTemperature')
const currentWeatherCondition = document.getElementById('currentWeatherCondition')
const currentWeatherIcon = document.getElementById('currentWeatherIcon')

//sections
const hourlyTemp = document.getElementById('hourlyTemp')
const threeDayForecast = document.getElementById('threeDayForecast')

const moreOne = document.getElementById('moreOne')
const moreTwo = document.getElementById('moreTwo')
const moreThree = document.getElementById('moreThree')
const moreFour = document.getElementById('moreFour')

// var uvIndex = document.getElementById('uvIndex')
// var humidity = document.getElementById('humidity')

// var searchSection = document.querySelector('.searchLocation')
// var currentWeatherSection = document.querySelector('.currentWeather')
// var weatherData = document.querySelector('.weatherData')
// var hourlyWeatherSection = document.querySelector('.moreWeatherData')


searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    startPage.classList.add('hidden')
    frontPage.classList.remove('hidden')
    secondPage.classList.remove('hidden')
    getWeather()
})
downArrow.addEventListener('click', () => secondPage.scrollIntoView({
      behavior: 'smooth',
    }));

async function getWeather(){
    const location = document.getElementById('searchLocation').value;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=3&aqi=no&alerts=no`

    await fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            searchBar.style.visibility = 'hidden'
            locationName.innerText = data.location.name + ", " + data.location.region
            currentTemperature.innerText = Math.floor(data.current.temp_f) + '\xB0'
            currentWeatherCondition.innerText = data.current.condition.text
            
            let weatherCondition = data.current.condition.code;
            chooseIcon(weatherCondition)

            hourlyWeather(data)

            forecast(data)

            moreWeather(data)
            
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
        
}


function chooseIcon(WC){
    console.log(WC)
          if (WC === 1000){
            currentWeatherIcon.src = 'public/images/icons/sunny.png'
          } else if (WC === 1063 
            || WC === 1150 
            || WC === 1153
            || WC === 1180 
            || WC === 1183
            ){
            currentWeatherIcon.src = 'public/images/icons/sunrain.png'
          } else if (WC === 1087 
            || WC === 1273 
            || WC === 1276
            || WC === 1279 
            || WC === 1282
            ){
            currentWeatherIcon.src = 'public/images/icons/stormy.png'
        } else if (WC === 1186 
          || WC === 1189 
          || WC === 1192
          || WC === 1195 
          || WC === 1240
          || WC === 1243 
          || WC === 1246
          ){
          currentWeatherIcon.src = 'public/images/icons/rainy.png'
          } else if (WC === 1030 
            ){
            currentWeatherIcon.src = 'public/images/icons/cloudy.png'
            } else if (WC === 1003 
              || WC === 1009 
              ){
              currentWeatherIcon.src = 'public/images/icons/partCloudy.png'
              }
    }

function hourlyWeather(data){
    var today = new Date();
    var time = today.getHours()
    

    console.log(time)
    for(let i=time; i<24; i++){
        var divElement = document.createElement("div");
        divElement.classList.add('flex', 'flex-col', 'items-center', 'min-w-max', 'border-r')

       //get the hourly time
        
        var hourTime = document.createElement("p");
        var hour = parseInt((data.forecast.forecastday[0].hour[i].time).slice(11))
        
        if (hour>12){
            var time = document.createTextNode((hour-12) + 'pm' );
        } else{
            var time = document.createTextNode((hour) + 'am' );
        }
        hourTime.appendChild(time)
        

        //get the hourly icon
        var hourIcon = document.createElement("img");
        hourIcon.classList.add('w-20')
        hourIcon.src = data.forecast.forecastday[0].hour[i].condition.icon

        //get the hourly temp
        var hourTemp = document.createElement("p");
        var temp =document.createTextNode(data.forecast.forecastday[0].hour[i].temp_f + '\xB0') 
        hourTemp.appendChild(temp)

        divElement.append(hourTime, hourIcon, hourTemp)
        // divElement.appendChild(hourIcon)
        // divElement.appendChild(hourTemp)
        hourlyTemp.appendChild(divElement)
    }
}

function forecast(data){
    for(let i=0; i<3; i++){
        var divElement = document.createElement("div");
        divElement.classList.add( 'p-2', 'flex', 'items-center', 'border-b')
        // var dayDiv = document.createElement("div");
        // dayDiv.classList.add('flex', 'justify-between', 'p-2')
        var conditionDiv = document.createElement("div");

        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const d = new Date(); //today's date
        let weekday = ''
        if(i==0){
            weekday = 'Today';
        } else {
            weekday = weekdays[d.getDay() + i];
        }
        
        var day = document.createElement("p");
        var forecastDay = document.createTextNode(weekday);
        day.appendChild(forecastDay)
        

        var forecastIcon = document.createElement("img");
        forecastIcon.src = data.forecast.forecastday[i].day.condition.icon

        var forecastCondition = document.createElement("p");
        var condition = document.createTextNode((data.forecast.forecastday[i].day.condition.text));
        forecastCondition.appendChild(condition)
        
        var forecastHighLowTemp = document.createElement("span");
        var highLowTemps = document.createTextNode(
            'L: ' + (data.forecast.forecastday[i].day.mintemp_f)+ '\xB0' + '  ' +
            'H: ' +(data.forecast.forecastday[i].day.maxtemp_f)+ '\xB0'
            );
        
        forecastHighLowTemp.appendChild(highLowTemps)

        conditionDiv.append(forecastCondition, forecastHighLowTemp)
        conditionDiv.classList.add( 'text-center')
        divElement.append(day, forecastIcon, conditionDiv)
        threeDayForecast.append(divElement)

    }
}

function moreWeather(data){
    var uv = document.createTextNode(data.current.uv);
    var fl = document.createTextNode(data.current.feelslike_f);
    var precip = document.createTextNode(data.current.precip_in);
    var hum = document.createTextNode(data.current.humidity);
    moreOne.appendChild(fl)
    moreTwo.appendChild(uv)
    moreThree.appendChild(precip)
    moreFour.appendChild(hum)
}
// let upArrow = document.getElementById('upArrow')


// getLocationButton.addEventListener('click', getWeather)
// getLocationButton.addEventListener('click', removeSearchBar)
// getLocationButton.addEventListener('click', chooseIcon)
// getLocationButton.addEventListener('click', getHourlyWeather)


// locationName.addEventListener('click', chooseNewLocation)





// function removeSearchBar(){
//     searchSection.style.display = 'none';
//     weatherData.style.display = 'flex';
// }
// function chooseNewLocation(){
//   weatherData.style.display = 'none';
//   searchSection.style.display = 'flex';
// }

// upArrow.addEventListener('click', () => hourlyWeatherSection.scrollIntoView({
//   behavior: 'smooth',
// }));
// //upArrow.addEventListener('click', () => upArrow.style.transform = 'rotate(180deg)')


// function getWeather(){
//     const location = document.querySelector('input').value
//     const url = `https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
    
//     fetch(url)
//         .then(res => res.json()) // parse response as JSON
//         .then(data => {
//           console.log(data)
//           currentTemperature.innerText = Math.floor(data.current.temp_f) + '\xB0'
//           //currentWeatherIcon.src = data.current.condition.icon
//           let cityName = data.location.name
//           let stateName = data.location.region
//           locationName.innerText = `${cityName}, ${stateName}`
//           document.getElementById('currentWeatherCondition').innerText = data.current.condition.text

//           uvIndex.innerText = data.current.uv
//           humidity.innerText = data.current.humidity
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         });
//   }


      
// var today = new Date();
// var time = today.getHours();
// console.log(time)
//if (time > 12){time = time - 12}



// function getHourlyWeather(){
//   const location = document.querySelector('input').value
//   const url = `https://api.weatherapi.com/v1/forecast.json?key=b51c2171358f4124ad7174555233003&q=${location}&days=1&aqi=no&alerts=no`
  
//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.getElementById('hour1icon').src = data.forecast.forecastday[0].hour[7].condition.icon
//         document.getElementById('hour2icon').src = data.forecast.forecastday[0].hour[8].condition.icon
//         document.getElementById('hour3icon').src = data.forecast.forecastday[0].hour[9].condition.icon
//         document.getElementById('hour4icon').src = data.forecast.forecastday[0].hour[10].condition.icon
//         document.getElementById('hour5icon').src = data.forecast.forecastday[0].hour[11].condition.icon
//         document.getElementById('hour6icon').src = data.forecast.forecastday[0].hour[12].condition.icon
//         document.getElementById('hour7icon').src = data.forecast.forecastday[0].hour[13].condition.icon
//         document.getElementById('hour8icon').src = data.forecast.forecastday[0].hour[14].condition.icon
//         document.getElementById('hour9icon').src = data.forecast.forecastday[0].hour[15].condition.icon
//         document.getElementById('hour10icon').src = data.forecast.forecastday[0].hour[16].condition.icon
//         document.getElementById('hour11icon').src = data.forecast.forecastday[0].hour[17].condition.icon
//         document.getElementById('hour12icon').src = data.forecast.forecastday[0].hour[18].condition.icon

//         document.getElementById('hour1temp').innerText = Math.round(data.forecast.forecastday[0].hour[7].temp_f) + '\xB0'
//         document.getElementById('hour2temp').innerText = Math.round(data.forecast.forecastday[0].hour[8].temp_f)+ '\xB0'
//         document.getElementById('hour3temp').innerText = Math.round(data.forecast.forecastday[0].hour[9].temp_f)+ '\xB0'
//         document.getElementById('hour4temp').innerText = Math.round(data.forecast.forecastday[0].hour[10].temp_f)+ '\xB0'
//         document.getElementById('hour5temp').innerText = Math.round(data.forecast.forecastday[0].hour[11].temp_f)+ '\xB0'
//         document.getElementById('hour6temp').innerText = Math.round(data.forecast.forecastday[0].hour[12].temp_f)+ '\xB0'
//         document.getElementById('hour7temp').innerText = Math.round(data.forecast.forecastday[0].hour[13].temp_f) + '\xB0'
//         document.getElementById('hour8temp').innerText = Math.round(data.forecast.forecastday[0].hour[14].temp_f)+ '\xB0'
//         document.getElementById('hour9temp').innerText = Math.round(data.forecast.forecastday[0].hour[15].temp_f)+ '\xB0'
//         document.getElementById('hour10temp').innerText = Math.round(data.forecast.forecastday[0].hour[16].temp_f)+ '\xB0'
//         document.getElementById('hour11temp').innerText = Math.round(data.forecast.forecastday[0].hour[17].temp_f)+ '\xB0'
//         document.getElementById('hour12temp').innerText = Math.round(data.forecast.forecastday[0].hour[18].temp_f)+ '\xB0'

//       // if(time>12){time = time-12}
//       //   document.getElementById('hour1hour').innerText = 'now'
//       //   document.getElementById('hour2hour').innerText = time + 1
//       //   document.getElementById('hour3hour').innerText = time + 2
//       //   document.getElementById('hour4hour').innerText = time + 3
//       //   document.getElementById('hour5hour').innerText = time + 4
//       //   document.getElementById('hour6hour').innerText = time + 5

//         document.getElementById('hour1rain').innerText = data.forecast.forecastday[0].hour[7].chance_of_rain + '%'
//         document.getElementById('hour2rain').innerText = data.forecast.forecastday[0].hour[8].chance_of_rain + '%'
//         document.getElementById('hour3rain').innerText = data.forecast.forecastday[0].hour[9].chance_of_rain + '%'
//         document.getElementById('hour4rain').innerText = data.forecast.forecastday[0].hour[10].chance_of_rain + '%'
//         document.getElementById('hour5rain').innerText = data.forecast.forecastday[0].hour[11].chance_of_rain + '%'
//         document.getElementById('hour6rain').innerText = data.forecast.forecastday[0].hour[12].chance_of_rain + '%'
//         document.getElementById('hour7rain').innerText = data.forecast.forecastday[0].hour[13].chance_of_rain + '%'
//         document.getElementById('hour8rain').innerText = data.forecast.forecastday[0].hour[14].chance_of_rain + '%'
//         document.getElementById('hour9rain').innerText = data.forecast.forecastday[0].hour[15].chance_of_rain + '%'
//         document.getElementById('hour10rain').innerText = data.forecast.forecastday[0].hour[16].chance_of_rain + '%'
//         document.getElementById('hour11rain').innerText = data.forecast.forecastday[0].hour[17].chance_of_rain + '%'
//         document.getElementById('hour12rain').innerText = data.forecast.forecastday[0].hour[18].chance_of_rain + '%'
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }




// //background color: if current temperature is certain range, background color is that


