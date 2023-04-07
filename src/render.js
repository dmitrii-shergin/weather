import { getFavoriteCities } from "./storage.js"
import { fetchCity, fetchForecast } from "./api.js"

const LIKE = document.querySelector('.now__city-img')
const NOW_TEMPERATURE = document.querySelector('.now__temp')
const NOW_WEATHER = document.querySelector('.now__weather')
const NOW_CITY = document.querySelector('.now__city-name')
const DETAILS_CITY = document.querySelector('.details__title')
const DETAILS_TEMPERATURE = document.querySelector('.details__temp')
const DETAILS_FEELS = document.querySelector('.details__feels')
const DETAILS_WEATHER = document.querySelector('.details__weather')
const DETAILS_SUNRISE = document.querySelector('.details__sunrise')
const DETAILS_SUNSET = document.querySelector('.details__sunset')
const FORECAST_TITLE = document.querySelector('.forecast__title')
const FORECAST_LIST = document.querySelector('.forecast__list')
const CITY_LIST = document.querySelector('.city__list')

async function renderCity(name) {
    const city = await fetchCity(name)
    const forecast = await fetchForecast(name)
    renderCityNow(city)
    renderCityDetails(city)
    renderCityForecast(forecast, name)
}

function renderCityNow(city) {
    NOW_TEMPERATURE.textContent = city.temperature + '\u00B0'
    NOW_WEATHER.src = city.weatherSrc
    NOW_CITY.textContent = city.name
    const isCityInList = getFavoriteCities().find(el => el.name === city.name)
    LIKE.src = isCityInList ? city.likeSrc : city.disLikeSrc
}

function renderCityDetails(city) {
    DETAILS_CITY.textContent = city.name
    DETAILS_TEMPERATURE.textContent = `Temperature : ${city.temperature}`
    DETAILS_FEELS.textContent = `Feels like : ${city.feelsLike}`
    DETAILS_WEATHER.textContent = `Weather : ${city.weather}`
    DETAILS_SUNRISE.textContent = `Sunrise : ${city.sunrise}`
    DETAILS_SUNSET.textContent = `Sunset : ${city.sunset}`
}

function renderCityForecast(forecast, name) {
    FORECAST_LIST.textContent = ''
    FORECAST_TITLE.textContent = `${name} - 24'h forecast`
    forecast.forEach(elem => {
        const time = createElement('span', { class: 'forecast__time' }, [`${elem.date} - ${elem.time}`])
        const weatherImg = createElement('img', { class: 'forecast__weather-img', src: elem.weatherSrc }, [])
        const weather = createElement('div', { class: 'forecast__weather' }, [elem.weather, weatherImg])
        const temperature = createElement('div', { class: 'forecast__temperature' }, [`Temperature: ${elem.temperature}`])
        const feelsLike = createElement('div', { class: 'forecast__feels' }, [`Feels like: ${elem.feelsLike}`])
        const timeWeather = createElement('div', { class: 'forecast__row' }, [time, weather])
        const tempFeels = createElement('div', { class: 'forecast__row' }, [temperature, feelsLike])
        const item = createElement('li', { class: 'forecast__item' }, [timeWeather, tempFeels])
        FORECAST_LIST.append(item)
    })
}

function renderList() {
    CITY_LIST.innerHTML = ''
    for (let city of getFavoriteCities()) {
        const cityItem = createElement('li', { class: 'city__item' }, [city.name])
        CITY_LIST.append(cityItem)
    }
}

function createElement(tagName, attributes = {}, children = []) {
    const element = document.createElement(tagName)
    for (const [attr, value] of Object.entries(attributes)) {
        element.setAttribute(attr, value)
    }
    for (const child of children) {
        const node = child instanceof HTMLElement ? child : document.createTextNode(child)
        element.append(node)
    }
    return element
}

export { renderCity, renderList }