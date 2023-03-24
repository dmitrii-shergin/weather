import { renderList } from "./renderList.js"
import { fetchCity } from "./api.js"

function saveCurrentCity(name) {
    const currentCity = JSON.stringify(getFavoriteCities().find(city => city.name === name))
    localStorage.setItem('currentCity', currentCity)
}

function getCurrentCity() {
    const favoriteCities = getFavoriteCities()
    if (favoriteCities.length) {
        let currentCity = JSON.parse(localStorage.getItem('currentCity'))
        return currentCity
    } else return null
}

function saveFavoriteCities(list) {
    const storageList = JSON.stringify(list)
    localStorage.setItem('storageList', storageList)
}

function getFavoriteCities() {
    const storageList = localStorage.getItem('storageList')
    if (storageList) {
        return JSON.parse(storageList)
    } else return []
}

function deleteList() {
    const list = getFavoriteCities()
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
    const list = getFavoriteCities()
    const city = await fetchCity(name)
    if (city && !list.find(city => city.name === name)) {
        list.push(city)
    }
    saveFavoriteCities(list)
    renderList()
}

export { saveCurrentCity, getCurrentCity, getFavoriteCities, deleteList, addList }