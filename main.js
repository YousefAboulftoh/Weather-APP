let input = document.querySelector(`.city-name`);
let search = document.querySelector(`.search`);
let feelLike = document.querySelector(`.feel-like span`)
let img = document.querySelector(`.weather .img`)
let temp = document.querySelector(`.degree span`)
let city = document.querySelector(`.city`)
let Wstatus = document.querySelector(`.weather .status`)
let humd = document.querySelector(`.info .humd`)
let speed = document.querySelector(`.info .speed span`)
let vaild = document.querySelector(`.vaild`)
window.onload = _ => input.focus();

if (localStorage.getItem(`last-city`)) {
    getDataFromApiaWith(localStorage.getItem(`last-city`))
}

search.onclick = () => {
    if (input.value !== "") {
        getDataFromApiaWith(input.value)
        input.value = ""
        input.focus()
    }
}
document.addEventListener(`keydown`, e => {
    if (e.key === "Enter") {
        if (input.value !== "") {
            getDataFromApiaWith(input.value)
            input.value = ""
        }
    }
})
function getDataFromApiaWith(cityName) {
    let request = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=673c8018cb934543048ae99f17db08c7`);
    request.then((res) => res.json()).then(data => {
        // Convert From Kelvin To C
        feelLike.innerHTML = `RealFeel ${Math.floor((data.main.feels_like) - 273.15)}`
        temp.textContent = Math.floor((data.main.temp) - 273.15);
        city.textContent = data.name
        humd.innerHTML = `${data.main.humidity}%`
        speed.innerHTML = `${Math.trunc((data.wind.speed) * 18 / 5)}`
        if (data.weather[0].main === "Clouds") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            if (data.weather[0].id === 801 && data.weather[0].icon === "02n") {
                img.src = "https://openweathermap.org/img/wn/02n@2x.png";
            } else if (data.weather[0].id === 801 && data.weather[0].icon === "02d") {
                img.src = "https://openweathermap.org/img/wn/02d@2x.png";
            }
            else if (data.weather[0].id === 802) {
                img.src = "https://openweathermap.org/img/wn/03d@2x.png";
            } else if (data.weather[0].id === 803 || data.weather[0].id === 804) {
                img.src = "https://openweathermap.org/img/wn/04d@2x.png";
            }
        } else if (data.weather[0].main === "Clear") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            if (data.weather[0].id === 800 && data.weather[0].icon === "01n") {
                img.src = "https://openweathermap.org/img/wn/01n@2x.png";
            } else if (data.weather[0].id === 800 && data.weather[0].icon === "01d") {
                img.src = "https://openweathermap.org/img/wn/01d@2x.png";
            }
        } else if (data.weather[0].main === "Mist") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            img.src = "https://openweathermap.org/img/wn/50d@2x.png";
        }
        else if (data.weather[0].main === "Snow") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            img.src = "https://openweathermap.org/img/wn/13d@2x.png";
        }
        else if (data.weather[0].main === "Rain") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            if (data.weather[0].id === 500
                || data.weather[0].id === 501
                || data.weather[0].id === 502
                || data.weather[0].id === 503
                || data.weather[0].id === 504) {
                img.src = "https://openweathermap.org/img/wn/10d@2x.png";
            } else if (data.weather[0].id === 520
                || data.weather[0].id === 521
                || data.weather[0].id === 522
                || data.weather[0].id === 531) {
                img.src = "https://openweathermap.org/img/wn/13d@2x.png";
            } else if (data.weather[0].id === 511 || data.weather[0].main === "Drizzle") {
                Wstatus.innerHTML = `Status ${data.weather[0].main}`;
                img.src = "https://openweathermap.org/img/wn/09d@2x.png";
            }
        } else if (data.weather[0].main === "Thunderstorm") {
            Wstatus.innerHTML = `Status ${data.weather[0].main}`;
            img.src = "https://openweathermap.org/img/wn/011d@2x.png";
        }
    })
    addToLocalStorage(cityName)
}
function addToLocalStorage(value) {
    localStorage.setItem(`last-city`, value)
}