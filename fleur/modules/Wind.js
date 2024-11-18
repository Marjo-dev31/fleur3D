class Wind {
   constructor(props) {
      const { lat, long } = props;
      this.lat = lat;
      this.long = long;
      this.url = "";
      this.init();
   }

   init() {
      this.buildUrl();
      this.getWindData();
   }

   buildUrl() {
      const base = "https://api.open-meteo.com/v1/forecast";
      const requiredLatitude = "latitude=" + this.lat;
      const requiredLongitude = "longitude=" + this.long;

      const params = ["wind_speed_10m", "wind_direction_10m"];
      const paramsStringList = params.join(",");

      this.url = `${base}?${requiredLatitude}&${requiredLongitude}&current=${paramsStringList}`;
   }
   getWindData() {
      fetch(this.url)
         .then((response) => response.json())
         .then((data) => {
            window.app.windDirection = data.current.wind_direction_10m;
            window.app.windSpeed = data.current.wind_speed_10m;
            console.log(window.app, 'data')
         });
   }
}

export { Wind };
