import { addList, getFavoriteCities, saveCurrentCity, deleteList } from "./storage.js"
import { fetchCity, fetchForecast } from "./api.js"

const ADD_LIST = document.querySelector('.info__city-link')
const LIKE = document.querySelector('.info__city-like')
const NOW_TEMPERATURE = document.querySelector('.info__num-span')
const NOW_WEATHER = document.querySelector('.info__cloud-img')
const NOW_CITY = document.querySelector('.info__city-span')
const DETAILS_TEMPERATURE = document.querySelector('.temperature-value')
const DETAILS_FEELS = document.querySelector('.feels-value')
const DETAILS_WEATHER = document.querySelector('.weather-value')
const DETAILS_SUNRISE = document.querySelector('.sunrise-value')
const DETAILS_SUNSET = document.querySelector('.sunset-value')
const DETAILS_CITY = document.querySelector('.info__title-details')
const FORECAST_TITLE = document.querySelector('.info__title-forecast')
const FORECAST_BOX = document.querySelector('.box')
const CITY_LIST = document.querySelector('.city__names-list')

ADD_LIST.addEventListener('click', function () {
    const cityName = this.parentNode.querySelector('.info__city-span').textContent
    addList(event, cityName)
    renderCity(event, cityName)
})

async function renderCity(event, name) {
    event.preventDefault()
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
    DETAILS_TEMPERATURE.textContent = city.temperature
    DETAILS_FEELS.textContent = city.feelsLike
    DETAILS_WEATHER.textContent = city.weather
    DETAILS_SUNRISE.textContent = city.sunrise
    DETAILS_SUNSET.textContent = city.sunset
}

function renderCityForecast(forecast, name) {
    FORECAST_BOX.textContent = ''
    FORECAST_TITLE.textContent = `${name} - 24'h forecast`
    forecast.forEach(elem => {
        const time = createElement('span', { class: 'box__row-time' }, [`${elem.date} - ${elem.time}`])
        const weatherImg = createElement('img', { class: 'weather__img', src: elem.weatherSrc }, [])
        const weather = createElement('div', { class: 'box__row-weather' }, [elem.weather, weatherImg])
        const temperature = createElement('div', { class: 'box__row-temperature' }, [`Temperature: ${elem.temperature}`])
        const feelsLike = createElement('div', { class: 'box__row-feels' }, [`Feels like: ${elem.feelsLike}`])
        const timeWeather = createElement('div', { class: 'box__row' }, [time, weather])
        const tempFeels = createElement('div', { class: 'box__row' }, [temperature, feelsLike])
        const item = createElement('div', { class: 'box__item' }, [timeWeather, tempFeels])
        FORECAST_BOX.append(item)
    })
}

function renderList() {
    CITY_LIST.innerHTML = ''
    for (let city of getFavoriteCities()) {
        const cityLink = createElement('a', { href: '#!', class: 'city__names-link' }, [city.name])
        const cityDelete = createElement('button', { class: 'delete_city' }, ['X'])
        const cityItem = createElement('li', { class: 'city__names-item' }, [cityLink, cityDelete])
        CITY_LIST.append(cityItem)

        cityLink.addEventListener('click', function () {
            const name = this.textContent
            renderCity(event, name)
            saveCurrentCity(name, null)
        })
        cityDelete.addEventListener('click', function () {
            const name = this.parentNode.querySelector('.city__names-link').textContent
            deleteList(name)
            renderCity(event, name)
        })
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

export { renderCity, createElement, renderList }