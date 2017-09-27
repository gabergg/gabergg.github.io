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
  <input type="text" name="name" id="name"><br>
  <label for="location">location</label>
  <input type="text" name="location" id="location"><br>
  <label for="description">description</label>
  <input type="text" name="description" id="description"><br>
  <label for="thumbnail">thumbnail</label>
  <input type="text" name="thumbnail" id="thumbnail"><br>
  <input type="submit" value="Submit">
`

function createNewFormEl(roasterId) {
  const formEl = document.createElement('form')
  formEl.addEventListener('click', (e) => {e.stopPropagation()})
  formEl.style.display = 'none'
  formEl.addEventListener('submit', updateRoaster.bind(this, roasterId))
  formEl.innerHTML = formHTML
  return formEl
}

function updateRoaster(roasterId, e) {
  e.preventDefault()
  const url = `https://twcoffee.herokuapp.com/api/v1/roasters/roaster/${roasterId}`
  const payload = {}
  for (let i = 0; i < e.target.length - 1; i++) {
    const {name, value} = e.target[i]
    if (value) {
      payload[name] = value
    }
  }
  console.log("form data", new FormData(e.target))
  fetch(url, {
    method: 'PUT',
    body: payload,
  })
  console.log("submitted", roasterId);
}

function getAllRoasters() {
  console.log("WE ALL?")
  const url = 'https://twcoffee.herokuapp.com/api/v1/roasters/all'
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
