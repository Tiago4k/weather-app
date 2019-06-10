import React, { useState } from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "66fd694ea82e6bac4285a6d23a370ba8";

function App() {
  const [tempInfo, setTempInfo] = useState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  });

  const getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    var api_call;
    var data;

    if (city && country) {
      api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      data = await api_call.json();
    } else if (city && !country) {
      api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      data = await api_call.json();
    }

    if (city) {
      setTempInfo({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      setTempInfo({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city"
      });
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-3 title-container">
                <Titles />
              </div>
              <div className="col-xs-8 form-container">
                <Form getWeather={getWeather} />
                <Weather
                  temperature={tempInfo.temperature}
                  city={tempInfo.city}
                  country={tempInfo.country}
                  humidity={tempInfo.humidity}
                  description={tempInfo.description}
                  error={tempInfo.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
