var url;
async function getdata() {
    try {

        let city = document.getElementById('city').value;
        url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=502df7b997e27e1e511693282e40f2f4';
        let response = await fetch(url);
        console.log(response);

        let result = await response.json();
        console.log(result)

        let lati = result[0].lat;
        let long = result[0].lon
        console.log(lati, long)

        url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lati + '&lon=' + long + '&units=metric&appid=502df7b997e27e1e511693282e40f2f4';
        response = await fetch(url);
        let report = await response.json();
        console.log(report);
        display(report);

    }
    catch (error) {
        alert("Please Enter correct city name");
    }


}

function display(report) {
    document.getElementById('weather').innerHTML = "";


    var head = document.createElement('h3');
    head.innerText = "Current weather";

    var div1 = document.createElement('div');
    div1.setAttribute('class', 'div1');
    var img = document.createElement('img')
    if (report.weather[0].description == "clear sky") {
        img.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    }
    else {
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaGMABdWmoWMoV_ny-keV8Bc0BJcgJKD1a9g&usqp=CAU"
    }

    var temp = document.createElement("h3");
    temp.innerText = "Temp : " + report.main.temp + " °C";

    var description = document.createElement("p");
    description.innerText = "Weather description : " + report.weather[0].description;

    div1.append(img, temp, description);

    var div2 = document.createElement('div');
    div2.setAttribute('class', 'div2');


    var pressure = document.createElement("p");
    pressure.innerText = "Pressure : " + report.main.pressure + " hPa";

    var humidity = document.createElement("p");
    humidity.innerText = "Humidity : " + report.main.humidity + " %";

    var wind = document.createElement("p");
    wind.innerText = "Wind speed : " + report.wind.speed + " m/s";

    var sunrise = document.createElement("p");
    sunrise.innerText = "Sunrise : " + report.sys.sunrise + " UTC";

    var sunset = document.createElement("p");
    sunset.innerText = "Sunset : " + report.sys.sunset + " UTC";

    div2.append(pressure, humidity, wind, sunrise, sunset);

    document.getElementById('weather').append(div1, div2);
}