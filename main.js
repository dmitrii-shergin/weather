import { renderList } from './src/renderList.js'
import { renderCity } from './src/renderCity.js'
import { getCurrentCity } from './src/storage.js'

const FORM = document.forms.form

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