const renderer = new Renderer();
//const apiManager = new APIManager();
let recipiences = [];


async function fetchGrantees() {
  return $.get("/grantees");
}

async function onPageLoad() {
  const grantees = await fetchGrantees();
  console.log(grantees);
  renderer.renderGrantees(grantees);
}

onPageLoad();

$(".grantees").on("click", ".grantee", function () {
  const id = $(this).data().id;
  window.location.href = `/grantees/grantee-page.html?id=${id}`;
  /*
    const id = $(this).parent().data().id
    const cityWeatherIndex = cities.findIndex(cityWeather => cityWeather.id === id)
    const cityWeather = cities[cityWeatherIndex]
    cityWeather.isSaved = true
    renderer.renderCities(cities)
    apiManager.saveCityWeather(cityWeather)
    */
});

$("form.recipience-form").on("submit", function (event) {
  event.preventDefault();
  const recipienceLink = $(this)[0][0].value;
  const recipienceTitle = $(this)[0][2].value;
  const recipienceAbout = $(this)[0][3].value;

  /*
    apiManager.fetchCityWeatherByCityName(cityName).then(fetchedCityWeather => {
        cities.push(getCityWeatherInstance(fetchedCityWeather, false))
        renderer.renderCities(cities)
    }).catch(err => alert("City not found"))
    */

  $(this)[0][0].value = "";
  $(this)[0][2].value = "";
  $(this)[0][3].value = "";
});

/*
function onPageLoad(){
    apiManager.fetchAllWeathers().then(fetchedCitiesWeather => {
        fetchedCitiesWeather.forEach(fetchedCityWeather => cities.push(getCityWeatherInstance(fetchedCityWeather, true)))
        renderer.renderCities(cities)
    })
}

onPageLoad()


$("form.city-form").on("submit", function(event){
    event.preventDefault()
    const cityName = $(this)[0][0].value

    apiManager.fetchCityWeatherByCityName(cityName).then(fetchedCityWeather => {
        cities.push(getCityWeatherInstance(fetchedCityWeather, false))
        renderer.renderCities(cities)
    }).catch(err => alert("City not found"))

    $(this)[0][0].value = ''
})

$(".cities").on("click", "button.save-btn", function(){
    const id = $(this).parent().data().id
    const cityWeatherIndex = cities.findIndex(cityWeather => cityWeather.id === id)
    const cityWeather = cities[cityWeatherIndex]
    cityWeather.isSaved = true
    renderer.renderCities(cities)
    apiManager.saveCityWeather(cityWeather)
})

$(".cities").on("click", "button.delete-btn", function(){
    const id = $(this).parent().data().id
    const cityWeatherIndex = cities.findIndex(cityWeather => cityWeather.id === id)
    const cityWeather = cities[cityWeatherIndex]
    cityWeather.isSaved = false
    renderer.renderCities(cities)
    apiManager.deleteCityWeather(id)
})



const getCityWeatherInstance = (fetchedCityWeather, isSaved) => {
    return new CityWeather(
        fetchedCityWeather._id, 
        fetchedCityWeather.name,
        fetchedCityWeather.temperature,
        fetchedCityWeather.condition,
        fetchedCityWeather.conditionPic,
        fetchedCityWeather.humidity,
        fetchedCityWeather.windSpeed,
        isSaved
    )
}
*/
