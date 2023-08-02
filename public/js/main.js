const logoButton = document.getElementById('logoButton');
const searchButton = document.getElementById('searchButton');
const hourlyTempSection = document.getElementById('hourlyTemp');
const searchBar = document.getElementById('searchBar')
const frontPage = document.getElementById('frontPage')
const secondPage = document.getElementById('secondPage')
const downArrow = document.getElementById('downArrow')
const startPage = document.getElementById('startPage')
const searchLocation = document.getElementById('searchLocation')

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


logoButton.addEventListener('click', (e)=>{
    window.location.reload();
})

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    startPage.classList.add('hidden')
    searchBar.classList.add('hidden')
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

// function hourlyWeather(data){
//     var today = new Date();
//     var time = today.getHours()
    

//     console.log(time)
//     for(let i=0; i<24; i++){
//         var divElement = document.createElement("div");
//         divElement.classList.add('flex', 'flex-col', 'items-center', 'min-w-max', 'border-r')

//        //get the hourly time
        
//         var hourTime = document.createElement("p");
//         var hour = parseInt((data.forecast.forecastday[0].hour[i].time).slice(11))
        
//         if (hour>12){
//             var time = document.createTextNode((hour-12) + 'pm' );
//         } else{
//             var time = document.createTextNode((hour) + 'am' );
//         }
//         hourTime.appendChild(time)
        

//         //get the hourly icon
//         var hourIcon = document.createElement("img");
//         hourIcon.classList.add('w-20')
//         hourIcon.src = data.forecast.forecastday[0].hour[i].condition.icon

//         //get the hourly temp
//         var hourTemp = document.createElement("p");
//         var temp =document.createTextNode(data.forecast.forecastday[0].hour[i].temp_f + '\xB0') 
//         hourTemp.appendChild(temp)

//         divElement.append(hourTime, hourIcon, hourTemp)
//         // divElement.appendChild(hourIcon)
//         // divElement.appendChild(hourTemp)
//         hourlyTemp.appendChild(divElement)
//     }
// }

function hourlyWeather(data){
    let hourCount = 0;
    var today = new Date();
    var time = today.getHours()
    //console.log(24-time)

    for(let i=0; i<(24-time); i++){
        // console.log(data.forecast.forecastday[0].hour[(time+i)].time)
        var divElement = document.createElement("div");
        divElement.classList.add('flex', 'flex-col', 'items-center', 'min-w-max', 'border-r', 'p-5')

        var hourTime = document.createElement("p");
        var hour = parseInt((data.forecast.forecastday[0].hour[time+i].time).slice(11))

        if (hour>12){
            var timeNode = document.createTextNode((hour-12) + 'pm' );
        } else{
            var timeNode = document.createTextNode((hour) + 'am' );
        }
        hourTime.appendChild(timeNode)

        var hourIcon = document.createElement("img");
        hourIcon.classList.add('w-10', 'md:w-20')
        hourIcon.src = data.forecast.forecastday[0].hour[time+i].condition.icon

        //get the hourly temp
        var hourTemp = document.createElement("p");
        var temp = document.createTextNode(data.forecast.forecastday[0].hour[time+i].temp_f + '\xB0') 
        hourTemp.appendChild(temp)

        divElement.append(hourTime, hourIcon, hourTemp)
        hourlyTemp.appendChild(divElement)
    }
    for (let i=0; i<(time); i++){
        //console.log(data.forecast.forecastday[1].hour[i].time)
        var divElement = document.createElement("div");
        divElement.classList.add('flex', 'flex-col', 'items-center', 'min-w-max', 'border-r', 'p-5')

        var hourTime = document.createElement("p");
        var hour = parseInt((data.forecast.forecastday[1].hour[i].time).slice(11))

        if (hour>12){
            var timeNode = document.createTextNode((hour-12) + 'pm' );
        } else{
            var timeNode = document.createTextNode((hour) + 'am' );
        }
        hourTime.appendChild(timeNode)

        var hourIcon = document.createElement("img");
        hourIcon.classList.add('w-10', 'md:w-20')
        hourIcon.src = data.forecast.forecastday[1].hour[i].condition.icon

        //get the hourly temp
        var hourTemp = document.createElement("p");
        var temp = document.createTextNode(data.forecast.forecastday[1].hour[i].temp_f + '\xB0') 
        hourTemp.appendChild(temp)

        divElement.append(hourTime, hourIcon, hourTemp)
        hourlyTemp.appendChild(divElement)
    }
}


function forecast(data){
    for(let i=0; i<3; i++){
        var divElement = document.createElement("div");
        divElement.classList.add( 'p-1', 'md:pb-8', 'flex', 'items-center', 'justify-evenly', 'border-b')
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
        forecastIcon.classList.add('w-10', 'md:w-20')
        forecastIcon.src = data.forecast.forecastday[i].day.condition.icon

        // var forecastCondition = document.createElement("p");
        // var condition = document.createTextNode((data.forecast.forecastday[i].day.condition.text));
        // forecastCondition.appendChild(condition)
        
        var forecastHighLowTemp = document.createElement("span");
        var highLowTemps = document.createTextNode(
            (data.forecast.forecastday[i].day.mintemp_f)+ '\xB0' +
            ' - ' +(data.forecast.forecastday[i].day.maxtemp_f)+ '\xB0'
            );
        
        forecastHighLowTemp.appendChild(highLowTemps)

        conditionDiv.append(forecastHighLowTemp)
        conditionDiv.classList.add( 'text-center')
        divElement.append(day, forecastIcon, conditionDiv)
        threeDayForecast.append(divElement)

    }
}

function moreWeather(data){
    var uv = document.createTextNode(data.current.uv);
    var fl = document.createTextNode((data.current.feelslike_f) + '\xB0');
    var precip = document.createTextNode((data.forecast.forecastday[0].day.daily_chance_of_rain) + '%');
    var hum = document.createTextNode(data.current.humidity);
    moreOne.appendChild(fl)
    moreTwo.appendChild(uv)
    moreThree.appendChild(precip)
    moreFour.appendChild(hum)
}


