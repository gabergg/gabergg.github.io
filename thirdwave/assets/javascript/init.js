function getAllRoasters() {
  const url = 'https://twcoffee.herokuapp.com/api/v1/roasters/top'
  fetch(url).then((response) => {
    console.log("response", response)
  })
  const roasterEl = document.getElementById('roasters')

}

getAllRoasters()
