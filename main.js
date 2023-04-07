import { renderCity, renderList } from './src/render.js'
import { addRemoveCity, getCurrentCity, saveCurrentCity } from './src/storage.js'

const CITY_BUTTON = document.querySelector('.now__city-btn')
const FORM = document.querySelector('.form')
const TAB_BUTTON = document.querySelector('.button')
const BUTTONS = document.querySelectorAll('.buttons')
const TABS = document.querySelectorAll('.info__tab')
const CITY_LIST = document.querySelector('.city__list')

renderList()

document.addEventListener("DOMContentLoaded", documentLoadHandler)
FORM.addEventListener('submit', formHandler)
CITY_BUTTON.addEventListener('click', cityButtonHandler)
TAB_BUTTON.addEventListener('click', tabHandler)
CITY_LIST.addEventListener('click', cityListHandler)

function documentLoadHandler() {
    const currentCity = getCurrentCity()
    if (currentCity) {
        renderCity(currentCity.name)
    }
}

function formHandler(event) {
    event.preventDefault()
    renderCity(this.input.value)
    this.input.value = ''
}

function cityButtonHandler() {
    const cityName = this.parentNode.querySelector('.now__city-name').textContent
    addRemoveCity(cityName)
    renderCity(cityName)
}

function tabHandler(event) {
    let currentBtn = event.target
    let tabId = `#${currentBtn.id}__tab`
    let currentTab = document.querySelector(tabId);
    BUTTONS.forEach(btn => btn.classList.remove('active'))
    TABS.forEach(tab => tab.classList.remove('active'))
    currentBtn.classList.add('active')
    currentTab.classList.add('active')
}

function cityListHandler(event) {
    const cityItem = event.target
    const name = cityItem.textContent
    renderCity(name)
    saveCurrentCity(name)
}
