import { renderCity, renderList } from "./render.js"
import { fetchCity } from "./api.js"

function saveCurrentCity(name) {
    const currentCity = getFavoriteCities().find(city => city.name === name)
    let currentCityString = currentCity ? JSON.stringify(currentCity) : null
    localStorage.setItem('currentCity', currentCityString)
}

function getCurrentCity() {
    const favoriteCities = getFavoriteCities()
    if (favoriteCities.length) {
        console.log(localStorage)
        const currentCityString = localStorage.getItem('currentCity')
        const currentCity = currentCityString ? JSON.parse(currentCityString) : null
        if (currentCity && favoriteCities.find(city => city.name === currentCity.name)) {
            return currentCity
        } else {
            const lastCity = favoriteCities[favoriteCities.length - 1]
            saveCurrentCity(lastCity.name)
            return lastCity
        }
    } else {
        saveCurrentCity(null)
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
    return storageArray
}

async function addRemoveCity(name) {
    const list = getFavoriteCities()
    const cityIndex = list.findIndex(city => city.name === name)
    if (cityIndex === -1) {
        const city = await fetchCity(name)
        list.push(city)
        saveCurrentCity(name)
    } else {
        list.splice(cityIndex, 1)
        if (list.length) {
            saveCurrentCity(list[list.length - 1].name)
            renderCity(list[list.length - 1].name)
        }
    }

    saveFavoriteCities(list)
    renderList()
}

export { saveCurrentCity, getCurrentCity, getFavoriteCities, addRemoveCity }