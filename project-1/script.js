

function getWeather() {
  const myAPIKey = '4db4b08a4a1bdf2d10b046fed6570f47'
  const myCity = document.getElementById('city').value

  if (!myCity) {
    alert('Please enter a city')
    return
  }

  const myWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${myAPIKey}`
  const myForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${myCity}&appid=${myAPIKey}`              


  fetch(myWeatherURL)
      .then(r => r.json())
      .then(d => {
        displayWeather(d)
      })
      .catch(e => {
        console.error('Error fetching weather', e)
        alert('Error fetching weather. Try Again?')
      })

  fetch(myForecastURL)
      .then(r => r.json())
      .then(d => {
        displayHourlyForecast(d.list)
      })
      .catch(e => {
        console.error('Error fetching hourly forecast', e)
        alert('Error fetching hourly forecast. Try Again?')
      })

}


function displayWeather(d) {

  const tempInfo = document.getElementById('temp-info')
  const weatherInfo = document.getElementById('weather-info')
  const weatherIcon = document.getElementById('weather-icon')
  const hourlyForecast = document.getElementById('hourly-forecast')

  tempInfo.innerHTML = ''
  weatherInfo.innerHTML = ''
  weatherIcon.innerHTML = ''
  hourlyForecast.innerHTML = ''

  if (d.cod === '404') {
    weatherInfo.innerHTML = `<p>${d.message}<p>`

  } else {
    const cityName = d.name
    const cityTemp = Math.round(d.main.temp - 273.15 )
    const cityDesc = d.weather[0].description
    const iconCode = d.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

    const tempHTML = `<p>${cityTemp} c</p>`
    const weatherHTML = `<p>${cityName}</p>
                         <p>${cityDesc}</p>`

    tempInfo.innerHTML = tempHTML
    weatherInfo.innerHTML = weatherHTML
    weatherIcon.src = iconURL
    weatherIcon.alt = cityDesc

    showImage()

  }

}

function displayHourlyForecast() {

}

function showImage() {

  const weatherIcon = document.getElementById('weather-icon')
  weatherIcon.style.display = 'block'

}

