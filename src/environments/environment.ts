// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCxQH_dHLKMzMyRPxHACd1vs6cuYt3XEnU',
    authDomain: 'vrds-test-database.firebaseapp.com',
    databaseURL: 'https://vrds-test-database.firebaseio.com',
    projectId: 'vrds-test-database',
    storageBucket: 'vrds-test-database.appspot.com',
    messagingSenderId: '15157809336'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
