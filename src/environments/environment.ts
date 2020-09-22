// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://felchenapp.tomasi-developing.ch/api', // 'https://localhost:44321/api'
  WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather?',
  WEATHER_ICON_URL: 'https://openweathermap.org/img/wn/',
  WEATHER_KEY: '8aded496dcf459cae4c1f3e7b537151d',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
