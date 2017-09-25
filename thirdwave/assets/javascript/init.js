const updateForms = {}

function toggleUpdateForm(el) {
  if (el.style.display === 'none') {
    el.style.display = 'block'
  } else {
    el.style.display = 'none'
  }
}

function createNewFormEl(roasterId) {
  const formEl = document.createElement('form')
  const nameEl = document.createElement('input')
  const thumbnailEl = document.createElement('input')
  const locationEl = document.createElement('input')
  const descriptionEl = document.createElement('input')
  formEl.appendChild(nameEl)
  formEl.appendChild(thumbnailEl)
  formEl.appendChild(locationEl)
  formEl.appendChild(descriptionEl)
  formEl.addEventListener('click' (e) => {e.stopPropagation()})
  return formEl
}

function getAllRoasters() {
  const url = 'https://twcoffee.herokuapp.com/api/v1/roasters/top'
  fetch(url).then((response) => {
    response.json().then((results) => {
      console.log("results", results)
      const roasterEl = document.getElementById('roasters')
      results.forEach((roaster) => {
        const newEl = document.createElement('div')
        newEl.innerText = `${roaster.id} --- ${roaster.name} --- ${roaster.location}`
        const updateFormEl = createNewFormEl(roaster.id)
        newEl.addEventListener('click', () => toggleUpdateForm(updateFormEl))
        newEl.appendChild(updateFormEl)
        roasterEl.appendChild(newEl)
      })

    })
  })

}

getAllRoasters()
