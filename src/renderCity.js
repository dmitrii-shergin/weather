import { addList } from "./storage.js"
import { fetchCity } from "./api.js"

const ADD_LIST = document.querySelector('.info__city-link')
const NOW_TEMPERATURE = document.querySelector('.info__num-span')
const NOW_WEATHER = document.querySelector('.info__cloud-img')
const NOW_CITY = document.querySelector('.info__city-span')
const DETAILS_TEMPERATURE = document.querySelector('.temperature-value')
const DETAILS_FEELS = document.querySelector('.feels-value')
const DETAILS_WEATHER = document.querySelector('.weather-value')
const DETAILS_SUNRISE = document.querySelector('.sunrise-value')
const DETAILS_SUNSET = document.querySelector('.sunset-value')
const DETAILS_CITY = document.querySelector('.info__title-details')

ADD_LIST.addEventListener('click', function () {
    addList(event, this.parentNode.querySelector('.info__city-span').textContent)
})

async function renderCity(event, name) {
    event.preventDefault()
    const city = await fetchCity(name)
    renderCityNow(city)
    renderCityDetails(city)
}

function renderCityNow(city) {
    NOW_TEMPERATURE.textContent = city.temperature + '\u00B0'
    NOW_WEATHER.src = city.weatherSrc
    NOW_CITY.textContent = city.name
}

function renderCityDetails(city) {
    DETAILS_CITY.textContent = city.name
    DETAILS_TEMPERATURE.textContent = city.temperature
    DETAILS_FEELS.textContent = city.feelsLike
    DETAILS_WEATHER.textContent = city.weather
    DETAILS_SUNRISE.textContent = city.sunrise
    DETAILS_SUNSET.textContent = city.sunset
}

export { renderCity }