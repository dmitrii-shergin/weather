import { renderList } from "./renderList.js"
import { fetchCity } from "./api.js"

function saveCurrentCity(name, city) {
    let currentCityString
    if (name) {
        const currentCity = Array.from(getFavoriteCities()).find(city => city.name === name)
        currentCityString = currentCity ? JSON.stringify(currentCity) : null
    } else if (city) {
        currentCityString = city ? JSON.stringify(city) : null
    }
    localStorage.setItem('currentCity', currentCityString)
}

function getCurrentCity() {
    const favoriteCities = Array.from(getFavoriteCities())
    if (favoriteCities.length) {
        const currentCityString = localStorage.getItem('currentCity')
        const currentCity = currentCityString ? JSON.parse(currentCityString) : null
        if (favoriteCities.find(city => city.name === currentCity.name)) {
            return currentCity
        } else return favoriteCities[favoriteCities.length - 1]
    } else {
        saveCurrentCity('', '')
        return null
    }
}

function saveFavoriteCities(list) {
    const storageList = JSON.stringify(list)
    localStorage.setItem('storageList', storageList)
}

function getFavoriteCities() {
    const storageString = localStorage.getItem('storageList')
    const storageArray = JSON.parse(storageString) || []
    const storageSet = storageArray.length ? new Set(storageArray) : new Set()
    return storageSet
}

function deleteList() {
    const list = Array.from(getFavoriteCities())
    const name = this.parentNode.querySelector('.city__names-link').textContent
    const cityIndex = list.findIndex(city => city.name === name)
    if (cityIndex != -1) {
        list.splice(cityIndex, 1)
    }
    saveFavoriteCities(list)
    renderList()
}

async function addList(event, name) {
    event.preventDefault()
    const list = Array.from(getFavoriteCities())
    const city = await fetchCity(name)
    if (city && !list.find(city => city.name === name)) {
        list.push(city);
    }
    saveCurrentCity(null, city)
    saveFavoriteCities(list)
    renderList()
}

export { saveCurrentCity, getCurrentCity, getFavoriteCities, deleteList, addList }