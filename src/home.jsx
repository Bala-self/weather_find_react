import cities from "./cities.json";
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function Home() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const uniqueCities = Array.isArray(cities) ? [...new Set(cities)] : [];

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 1) {
      setFiltered([]);
      return;
    }

    const results = uniqueCities
      .filter((city) => city.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, 10);

    setFiltered(results);
  }

  async function getWeather() {
    if (!query.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY || "dfbb4cc93665f3216cc414fd988d07fb"}`
      );

      setWeather(data);
      setFiltered([]);
    } catch (error) {
      console.error(error);
      alert("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }

  return (
    <main className="container">
      <header className="hero">
        <h1 className="hero-title">Weather App</h1>
        <p className="hero-sub">Search city to get full weather details</p>
      </header>

      <section className="search-box">
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            placeholder="Search City"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Search city"
          />
          <button className="btn btn-primary" onClick={getWeather} aria-label="Get weather">
            Get Weather
          </button>
        </div>

        {filtered.length > 0 && (
          <ul className="dropdown" role="listbox">
            {filtered.map((city, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => {
                  setQuery(city);
                  setFiltered([]);
                }}
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuery(city);
                    setFiltered([]);
                  }
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </section>

      {loading && <p className="loading">Loading...</p>}

      {weather && (
        <section className="weather">
          <h2 className="weather-title">Full Weather Data</h2>
          <article className="weather-card">
            <p><strong>City:</strong> {weather.name}</p>
            <p><strong>Country:</strong> {weather.sys.country}</p>
            <p><strong>Coordinates:</strong> {weather.coord.lat}, {weather.coord.lon}</p>
            <p><strong>Main Weather:</strong> {weather.weather[0].main}</p>
            <p><strong>Description:</strong> {weather.weather[0].description}</p>
            <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)} °C</p>
            <p><strong>Feels Like:</strong> {(weather.main.feels_like - 273.15).toFixed(2)} °C</p>
            <p><strong>Min Temp:</strong> {(weather.main.temp_min - 273.15).toFixed(2)} °C</p>
            <p><strong>Max Temp:</strong> {(weather.main.temp_max - 273.15).toFixed(2)} °C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Wind Direction:</strong> {weather.wind.deg}°</p>
            <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
            <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </article>
        </section>
      )}
    </main>
  );
}

export default Home;