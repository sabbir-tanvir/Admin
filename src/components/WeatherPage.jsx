
import React from 'react';
import '../styles/pages/WeatherPage.css';

const WeatherPage = ({ weatherData, loading, error }) => {
  return (
    <div className="weather-display">
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city}, {weatherData.country}</h2>
          <div className="temperature">
            <span className="temp-value">{weatherData.temperature}°C</span>
          </div>
          <p className="description">{weatherData.description}</p>
          
          <div className="weather-details">
            <div className="weather-item">
              <span className="weather-icon">💧</span>
              <div className="weather-content">
                <span className="weather-label">Humidity</span>
                <span className="weather-value">{weatherData.humidity}%</span>
              </div>
            </div>
            
            <div className="weather-item">
              <span className="weather-icon">💨</span>
              <div className="weather-content">
                <span className="weather-label">Wind Speed</span>
                <span className="weather-value">{weatherData.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
