import React, { useState } from "react";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [cityData, setCityData] = useState(null);
  const [err, setErr] = useState("");

  const API_KEY = "34698b3c215d1c604524cd17c13360e6";

  const fetchWeather = async () => {
    if (!search.trim()) {
      setErr("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setCityData(data);
      setErr("");
    } catch (error) {
      setErr(error.message);
      setCityData(null);
    }
  };

  const getWeatherImage = (weatherMain) => {
    switch (weatherMain) {
      case "Rain":
        return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Rainy sky
      case "Clear":
        return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"; // Sunny summer sky
      case "Clouds":
        return "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=800&q=80"; // Cloudy sky
      case "Snow":
        return "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"; // Winter snowy sky
      case "Thunderstorm":
        return "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=800&q=80"; // Thunderstorm sky
      case "Mist":
      case "Haze":
      case "Fog":
        return "https://images.unsplash.com/photo-1498924970651-9d95f0b52f77?auto=format&fit=crop&w=800&q=80"; // Foggy misty sky
      default:
        return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"; // Default clear sky
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-blue-100 px-4">
      <h2 className="text-3xl font-bold -tracking-tight">🌤️ Weather App</h2>

      <div className="flex gap-5 mt-4 flex-wrap justify-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Enter City name"
          className="px-4 py-1 border border-gray-300 rounded-lg"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {err && <p className="text-red-400 mt-3">{err}</p>}

      {cityData && (
        <div
          className="w-full max-w-sm shadow-md p-6 text-center rounded-lg mt-6 text-white"
          style={{
            backgroundImage: `url(${getWeatherImage(
              cityData.weather?.[0]?.main
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{cityData.name}</h2>
            <p>🌡️ Temp: {cityData.main?.temp}°C</p>
            <p>💧 Humidity: {cityData.main?.humidity}%</p>
            <p>🌬️ Wind: {cityData.wind?.speed} m/s</p>
            <p>🌥️ Condition: {cityData.weather?.[0]?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
