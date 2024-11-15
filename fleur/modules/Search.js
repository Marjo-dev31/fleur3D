import { Wind } from './Wind.js'

class Search {
   constructor() {
      // definir les variables
      this.input = document.querySelector(".js-search-input");
      this.form = document.querySelector(".js-search-form");
      this.cities = [];
      // lancer les methodes
      this.init();
   }

   init() {
      this.getCities();
      this.watchUserInput();
   }

   watchUserInput() {
      this.form.addEventListener("submit", (event) => {
         event.preventDefault();
         this.getLagLong();
      });
   }

   getLagLong() {
      const name = this.input.value;
      const cityData = this.getCityData(name);
      if(cityData) {
        const lat = cityData.lat
        const long = cityData.lng
        console.log(lat,long)
        new Wind({lat, long})
      } else {
        alert('La ville renseignée n\'existe pas!')
      }

   }

   getCities() {
      fetch("../fleur/data/french-cities.json")
         .then((response) => response.json())
         .then((data) => {
            this.cities = data;
         });
   }

   getCityData(cityName) {
      const cityNameLower = cityName.toLowerCase();
      const cityData = this.cities.find(
         (cityObject) =>
            cityObject.city.toLowerCase() === cityNameLower
      );
      return cityData;
   }
}

export { Search };
