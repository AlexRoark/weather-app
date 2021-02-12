function app() {
    // Geo API
    let location_city = document.querySelector(".location_city");
    let location_country = document.querySelector(".location_country");
    let location_flag = document.getElementById("flag");
    let locationapi_url = "https://api.sypexgeo.net/json";
    let json_location_obj = JSON.parse(GetJSON(locationapi_url));

    //Weather API
    let weather_ico = document.getElementById("weather_ico");
    let weather_title = document.querySelector(".title");
    let weather_discription = document.querySelector('.description');
    let weather_degree = document.querySelector(".degree");
    let api_key = "b0019735d472e8d3e7572f2bfedba9a0"; // Change it to your own api key
    let lang = json_location_obj.country.iso === "RU" ? "ru" : "en";
    let weaterapi_url = `http://api.openweathermap.org/data/2.5/weather?q=${json_location_obj.city.name_en}&appid=${api_key}&units=imperial&lang=${lang}`;
    let json_weather_obj = JSON.parse(GetJSON(weaterapi_url));


    function GetJSON(url) {
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", url, false);
        Httpreq.onload = function (e) {
            if (Httpreq.readyState == 4 && Httpreq.status == 200) {
                console.log(Httpreq.status);
            } else {
                console.log(Httpreq.status);
            }
        };
        Httpreq.send(null);
        return Httpreq.responseText;
    };

    function getlocation() {
        let lang = json_location_obj.country;
        location_flag.classList.add("flag-" + json_location_obj.country.iso);
        if (json_location_obj.country.iso === "RU") {
            location_city.textContent = json_location_obj.city.name_ru;
            location_country.textContent = json_location_obj.country.name_ru;
        } else {
            location_city.textContent = json_location_obj.city.name_en;
            location_country.textContent = json_location_obj.country.name_en;
        }
    };

    function getWeather() {
        let celsium_degree = (json_weather_obj.main.temp - 32) * 5 / 9;
        weather_ico.src = `./src/icons/${json_weather_obj.weather[0].icon}.png`;
        weather_title.textContent = json_weather_obj.weather[0].main;
        weather_discription.textContent = json_weather_obj.weather[0].description;
        if (json_location_obj.country.iso === "RU") {
            weather_degree.textContent = Math.floor(celsium_degree) + "° C";
        } else {
            weather_degree.textContent = Math.floor(json_weather_obj.main.temp) + "° F";
        }

    }

    let timeHourse = new Date().getHours();
    if (7 <= timeHourse && timeHourse < 20) {
        document.querySelector('.background_blur').classList.add('day');
    } else {
        document.querySelector('.background_blur').classList.add('night');
        document.querySelector('.logotype').style.color = 'white';
    }
    
    getlocation();
    getWeather();
    
}

app();