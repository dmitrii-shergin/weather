import { renderCity } from "./renderCity.js"
import { getFavoriteCities, saveCurrentCity, deleteList } from "./storage.js"

const CITY_LIST = document.querySelector('.city__names-list')

function renderList() {
    CITY_LIST.innerHTML = ''
    for (let city of getFavoriteCities()) {
        const cityLink = renderListName(city)
        const cityDelete = renderListDelete()
        const cityItem = renderListItem(cityLink, cityDelete)
        CITY_LIST.append(cityItem)

        cityLink.addEventListener('click', function () {
            renderCity(event, this.textContent)
            saveCurrentCity(this.textContent, null)
        })
        cityDelete.addEventListener('click', deleteList)
    }
}

function renderListItem(cityLink, cityDelete) {
    const cityItem = document.createElement('li')
    cityItem.classList.add('city__names-item')
    cityItem.append(cityLink, cityDelete)
    return cityItem
}

function renderListName(city) {
    const cityLink = document.createElement('a')
    cityLink.href = '#!'
    cityLink.classList.add('city__names-link')
    cityLink.textContent = city.name
    return cityLink
}

function renderListDelete() {
    const cityDelete = document.createElement('button')
    cityDelete.textContent = 'X'
    cityDelete.classList.add('delete_city')
    return cityDelete
}

export { renderList }