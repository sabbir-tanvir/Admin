// Model: Handles data and API calls

class WeatherModel {
  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    this.baseUrl = import.meta.env.VITE_WEATHER_BASE_URL;
    this.units = import.meta.env.VITE_WEATHER_UNITS;
    
    // Validate environment variables
    if (!this.apiKey || !this.baseUrl) {
      throw new Error('Missing environment variables. Please check your .env file.');
    }
  }

  // Fetch weather data from API
  async getWeatherData(city) {
    try {
      const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=${this.units}`;
      console.log('Fetching weather from:', url.replace(this.apiKey, '[API_KEY]')); // Log URL without exposing API key
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        } else if (response.status === 401) {
          throw new Error('Invalid API key');
        } else {
          throw new Error(`Weather service error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      return this.formatWeatherData(data);
    } catch (error) {
      // Check if it's a JSON parsing error (which indicates HTML was returned)
      if (error.message.includes('Unexpected token')) {
        throw new Error('Weather service is unavailable. Please try again later.');
      }
      throw new Error(error.message);
    }
  }

  // Format the raw API data into a clean structure
  formatWeatherData(rawData) {
    return {
      city: rawData.name,
      country: rawData.sys.country,
      temperature: Math.round(rawData.main.temp),
      description: rawData.weather[0].description,
      humidity: rawData.main.humidity,
      windSpeed: rawData.wind.speed,
      icon: rawData.weather[0].icon
    };
  }
}

export default WeatherModel;


// Checking the branch 