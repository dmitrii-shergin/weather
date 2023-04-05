import { renderCity, renderList } from './src/render.js'
import { getCurrentCity } from './src/storage.js'

const FORM = document.querySelector('.form')
const BUTTON = document.querySelector('.buttons')
const BUTTONS = document.querySelectorAll('.buttons__mode')
const TABS = document.querySelectorAll('.info__tab')

renderList()

window.addEventListener('load', function () {
    const currentCity = getCurrentCity()
    if (currentCity) {
        renderCity(event, currentCity.name)
    }
})

FORM.addEventListener('submit', function () {
    renderCity(event, this.input.value)
    this.input.value = ''
})

BUTTON.addEventListener('click', showActiveTab)

function showActiveTab(event) {
    let currentBtn = event.target
    let tabId = `#${currentBtn.id}__tab`
    let currentTab = document.querySelector(tabId);
    BUTTONS.forEach(btn => btn.classList.remove('active'))
    TABS.forEach(tab => tab.classList.remove('active'))
    currentBtn.classList.add('active')
    currentTab.classList.add('active')
}
