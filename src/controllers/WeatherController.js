
import WeatherModel from '../models/WeatherModel.js';

class WeatherController {
  constructor() {
    this.model = new WeatherModel();
    this.weatherData = null;
    this.loading = false;
    this.error = null;
  }

  // Handle form submission
  async handleCitySubmit(city, updateView) {
    if (!city.trim()) {
      this.error = 'Please enter a city name';
      updateView(this.getState());
      return;
    }

    this.loading = true;
    this.error = null;
    updateView(this.getState());

    try {
      this.weatherData = await this.model.getWeatherData(city);
      this.loading = false;
      updateView(this.getState());
    } catch (error) {
      this.error = error.message;
      this.loading = false;
      this.weatherData = null;
      updateView(this.getState());
    }
  }

  // Get current state
  getState() {
    return {
      weatherData: this.weatherData,
      loading: this.loading,
      error: this.error
    };
  }
}

export default WeatherController;
