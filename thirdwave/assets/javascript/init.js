function getAllRoasters() {
  const url = 'https://twcoffee.herokuapp.com/api/v1/roasters/top'
  fetch(url).then((response) => {
    response.json().then((results) => {
      console.log("results", results)
      const roasterEl = document.getElementById('roasters')
      results.forEach((roaster) => {
        const newEl = document.createElement('div')
        newEl.innerText = JSON.stringify(roaster)
        newEl.addEventListener('click', () => console.log(roaster))
        roasterEl.appendChild(newEl)
      })

    })
  })

}

getAllRoasters()
