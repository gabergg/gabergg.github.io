const updateForms = {}

function toggleUpdateForm(el) {
  if (el.style.display === 'none') {
    el.style.display = 'block'
  } else {
    el.style.display = 'none'
  }
}

const formHTML = `
  <label for="name">name</label>
  <input type="text" name="gender" id="name"><br>
  <label for="location">location</label>
  <input type="text" name="gender" id="location"><br>
  <label for="description">description</label>
  <input type="text" name="gender" id="description"><br>
  <label for="thumbnail">thumbnail</label>
  <input type="text" name="gender" id="thumbnail"><br>
  <input type="submit" value="Submit">
`

function createNewFormEl(roasterId) {
  const formEl = document.createElement('form')
  // const nameEl = document.createElement('input')
  // const thumbnailEl = document.createElement('input')
  // const locationEl = document.createElement('input')
  // const descriptionEl = document.createElement('input')
  // const nameLabelEl = document.createElement('label')
  // const thumbnailLabelEl = document.createElement('label')
  // const locationLabelEl = document.createElement('label')
  // const descriptionLabelEl = document.createElement('label')
  // formEl.appendChild(nameEl)
  // formEl.appendChild(thumbnailEl)
  // formEl.appendChild(locationEl)
  // formEl.appendChild(descriptionEl)
  formEl.addEventListener('click', (e) => {e.stopPropagation()})
  formEl.style.display = 'none'
  // formEl.onsubmit = 'updateRoaster()'
  formEl.innerHTML = formHTML
  return formEl
}

function updateRoaster() {

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
