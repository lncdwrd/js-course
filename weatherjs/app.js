// API
const apiKey = 'b0177d46b6ecc91017e9c519046f0858';
const checkFetch = (res) => {
  if (!res.ok) {
    throw Error(`${res.status}`);
  }
  return res;
};

async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
  const checkResponse = await checkFetch(response);
  const data = await checkResponse.json();

  return data;
}



// Local Storage
const useLocalStorage = {
  getItem(itemList) {
    if (localStorage.getItem(itemList) === null) {
      itemList = [];
    } else {
      itemList = JSON.parse(localStorage.getItem(itemList));
    }
    return itemList;
  },

  addItem(itemList, newItem) {
    const items = this.getItem(itemList);
    
    if (items.includes(newItem)) {
      items.push(items.splice(items.indexOf(newItem), 1).pop());
    } else {
      items.push(newItem);
    }
    
    localStorage.setItem(itemList, JSON.stringify(items));
  },

  removeItem(itemList, itemKeyName) {
    const items = this.getItem(itemList);

    items.forEach((item, index) => {
      if (item === itemKeyName) {
        items.splice(index, 1);
        localStorage.setItem(itemList, JSON.stringify(items));
      }
    });
  }
}



// Weather UI
var weatherModal = new bootstrap.Modal(document.getElementById('weatherResult'));
const saveBtn = document.querySelector('.js-save-changes');

function loadWeather(location = 'alabama') {
  const city = document.querySelector('.js-city');
  const weatherDesc = document.querySelector('.js-weather-desc');
  const icon = document.querySelector('.js-card-icon');
  const humidity = document.querySelector('.js-humidity');
  const pressure = document.querySelector('.js-pressure');
  const feelsLike = document.querySelector('.js-feels-like');
  const wind = document.querySelector('.js-wind');

  getWeather(location)
    .then(data => {
      city.innerText = data.name;
      weatherDesc.innerText = `${data.main.temp} F, ${data.weather[0].description}`;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      humidity.innerText = `Humidity: ${data.main.humidity}`;
      pressure.innerText = `Pressure: ${data.main.pressure}`;
      feelsLike.innerText = `Feels Like: ${data.main.feels_like}`;
      wind.innerText = `Wind Speed: ${data.wind.speed}`;
    })
    .catch(err => console.log(err));

  useLocalStorage.addItem('City', location.toLowerCase());
}

saveBtn.addEventListener('click', () => {
  const cityInput = document.querySelector('#cityInput').value;
  
  weatherModal.toggle();
  loadWeather(cityInput);
});

window.addEventListener('DOMContentLoaded', () => {
  const cityList = useLocalStorage.getItem('City');
  const currentCity = cityList.slice().pop();
  
  loadWeather(currentCity);
});



