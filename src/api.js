const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '3195dd8884775bb3d55093edb09d19bf'

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

async function fetchForecast(name) {
    const url = `${FORECAST_URL}?q=${name}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        return getForecast(data)
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
    const sunriseDate = getFormatDate(getActualDate(data.sys.sunrise * 1000, data.timezone))
    const sunsetDate = getFormatDate(getActualDate(data.sys.sunset * 1000, data.timezone))
    const sunrise = `${sunriseDate.hour} : ${sunriseDate.minute}`
    const sunset = `${sunsetDate.hour} : ${sunsetDate.minute}`
    const likeSrc = 'img/likeY.png'
    const disLikeSrc = 'img/likeN.png'
    return { temperature, weatherSrc, name, feelsLike, weather, sunrise, sunset, likeSrc, disLikeSrc }
}

function getForecast(data) {
    const list = data.list.slice(1, 10).filter((_item, index) => index % 2 === 0)
    const forecast = []
    list.forEach(elem => {
        const dataDate = getActualDate(new Date(elem.dt_txt).getTime(), data.city.timezone)
        const formatDataDate = getFormatDate(dataDate)
        const date = `${formatDataDate.day}.${formatDataDate.month}`
        const time = `${formatDataDate.hour}:${formatDataDate.minute}`
        const temperature = Math.round(elem.main.temp)
        const weather = elem.weather[0].main
        const weatherSrc = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`
        const feelsLike = Math.round(elem.main.feels_like)
        forecast.push({ date, time, temperature, weather, weatherSrc, feelsLike })
    })
    return forecast
}

function getFormatDate(dataDate) {
    const day = dataDate.getDate().toString().padStart(2, '0')
    const month = (dataDate.getMonth() + 1).toString().padStart(2, '0')
    const hour = dataDate.getHours().toString().padStart(2, '0')
    const minute = dataDate.getMinutes().toString().padStart(2, '0')
    return { day, month, hour, minute }
}

function getActualDate(cityTime, cityOffset) {
    const cityDate = new Date(cityTime)
    const myDate = new Date()
    const cityTimeMs = cityDate.getTime()
    const cityOffsetMs = cityOffset * 1000
    const myOffsetMs = myDate.getTimezoneOffset() * 60 * 1000
    const actualTimeMs = cityTimeMs + cityOffsetMs + myOffsetMs
    const actualDate = new Date(actualTimeMs)
    return actualDate
}

export { fetchCity, fetchForecast }





















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