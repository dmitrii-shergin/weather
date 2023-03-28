const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '3195dd8884775bb3d55093edb09d19bf'

const BOX = document.querySelector('.box')
const FORECAST_TITLE = document.querySelector('.info__title-forecast')

async function fetchCity(name) {
    const url = `${WEATHER_URL}?q=${name}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        return getCity(data)
    } else {
        alert(response.statusText)
    }
}

function getCity(data) {
    const name = data.name
    const temperature = Math.round(data.main.temp)
    const weatherSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    const feelsLike = Math.round(data.main.feels_like)
    const weather = data.weather[0].main
    const sunriseDate = getActualDate(data.sys.sunrise, data.timezone)
    const sunsetDate = getActualDate(data.sys.sunset, data.timezone)
    const sunrise = `${sunriseDate.getHours()} : ${sunriseDate.getMinutes()}`
    const sunset = `${sunsetDate.getHours()} : ${sunsetDate.getMinutes()}`
    return { temperature, weatherSrc, name, feelsLike, weather, sunrise, sunset }
}

export async function fetchForecast(name) {
    const url = `${FORECAST_URL}?q=${name}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        getForecast(data)
    } else {
        alert(response.statusText)
    }
}

function getForecast(data) {

    BOX.textContent = ''
    const list = data.list.slice(1, 10).filter((_item, index) => index % 2 === 0)
    FORECAST_TITLE.textContent = `${data.city.name} - 24'h forecast`
    console.log(list)
    list.forEach(elem => {
        const dataDate = new Date(elem.dt_txt)
        const date = dataDate.toLocaleDateString()                          // 25.03.2023
        const time = `${dataDate.getHours()} : ${dataDate.getMinutes()}0`   // 9 : 00
        const temperature = Math.round(elem.main.temp)
        const weather = elem.weather[0].main
        const weatherSrc = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`
        const feelsLike = Math.round(elem.main.feels_like)

        const item = document.createElement('div')
        item.classList.add('box__item')
        const row1 = document.createElement('div')
        row1.classList.add('box__row')
        const row2 = document.createElement('div')
        row2.classList.add('box__row')

        const row1Time = document.createElement('span')
        row1Time.classList.add('box__row-time')
        const row1Weather = document.createElement('div')
        row1Weather.classList.add('box__row-weather')
        const weatherDesc = document.createElement('span')
        weatherDesc.classList.add('weather__desc')
        const weatherImg = document.createElement('img')
        weatherImg.classList.add('weather__img')

        row1Time.textContent = `${date} - ${time}`
        weatherDesc.textContent = weather
        weatherImg.src = weatherSrc

        const row2Temp = document.createElement('div')
        row2Temp.classList.add('box__row-temperature')
        const tempKey = document.createElement('span')
        tempKey.classList.add('temperature-key')
        tempKey.textContent = 'Temperature: '
        const tempValue = document.createElement('span')
        tempValue.classList.add('temperature-value')

        tempValue.textContent = temperature

        const row2Feels = document.createElement('div')
        row2Feels.classList.add('box__row-feels')
        const feelsKey = document.createElement('span')
        feelsKey.classList.add('feels-key')
        feelsKey.textContent = 'Feels like: '
        const feelsValue = document.createElement('span')
        tempValue.classList.add('feels-value')

        feelsValue.textContent = feelsLike

        row2Feels.append(feelsKey, feelsValue)
        row2Temp.append(tempKey, tempValue)
        row1Weather.append(weatherDesc, weatherImg)
        row2.append(row2Temp, row2Feels)
        row1.append(row1Time, row1Weather)
        item.append(row1, row2)

        BOX.append(item)
    })


    // console.log(temperature)
    // console.log(weatherSrc)
    // console.log(feelsLike)
    // console.log(date)
    // console.log(time)
    // console.log(item)
    console.log(list)
}

function getActualDate(cityTime, cityOffset) {
    const cityDate = new Date(cityTime * 1000)
    const myDate = new Date()
    const cityTimeMs = cityDate.getTime()
    const cityOffsetMs = cityOffset * 1000
    const myOffsetMs = myDate.getTimezoneOffset() * 60 * 1000
    const actualTimeMs = cityTimeMs + cityOffsetMs + myOffsetMs
    const actualDate = new Date(actualTimeMs)
    return actualDate
}

export { fetchCity }





















/*
clouds :  {all: 100}
cod : 200
coord : {lon: -71.0598, lat: 42.3584}
dt : 1678795915
id : 4930956
main : {temp: 4.36, feels_like: -1.47, temp_min: 1.08, temp_max: 6.4, pressure: 1000, …}
name : "Boston"
rain : {1h: 7.49}
sys : {type: 2, id: 2013408, country: 'US', sunrise: 1679368565, sunset: 1679412327}
timezone : -14400
visibility : 4828
weather : {id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '10d'}
        : {id: 701, main: 'Mist', description: 'mist', icon: '50d'}
wind : {speed: 10.8, deg: 50, gust: 13.38}
*/





/*
list
0 : {temperature: -5.24, sky: '01d', weatherSrc: 'https://openweathermap.org/img/wn/01d@2x.png', cityName: 'Oslo'}
1 : {temperature: 1.26, sky: '02n', weatherSrc: 'https://openweathermap.org/img/wn/02n@2x.png', cityName: 'Boston'}
2 : {temperature: 9.44, sky: '04d', weatherSrc: 'https://openweathermap.org/img/wn/04d@2x.png', cityName: 'London'}
*/


// 0 :{temperature: -1.69, sky: '03d', weatherSrc: 'https://openweathermap.org/img/wn/03d@2x.png', cityName: 'Oslo'}

//const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

// const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast'