class APIManager {
  constructor() {
    this.grantees = [];
  }

    async getGrantees() {
      const grantees = await $.get('/grantees');
      this.grantees = [];
      this.grantees.push(...grantees);
      return this.grantees;
    }

  // fetchCityWeatherByCityName(cityName) {
  //     return $.getJSON("/weather/city/" + cityName)
  // }

  // fetchAllWeathers() {
  //     return $.getJSON("/weather/cities")
  // }

  // saveCityWeather(cityWeather) {
  //     return $.post("/weather/city", cityWeather)
  // }

  // deleteCityWeather(cityId) {
  //     //return $.delete("/weather/city/" + cityId)
  //     const url = "/weather/city/" + cityId
  //     return $.ajax({
  //         url: url,
  //         type: 'DELETE',

  //     })
  // }
}
