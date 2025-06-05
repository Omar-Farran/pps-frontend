// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'https://pss-backend-9.onrender.com/api',
 // API: 'https://localhost:7154/api',
  token: 'acessToken',
  mapbox:
  {
    accessToken: 'pk.eyJ1IjoibG9ycnkyMDI0IiwiYSI6ImNsd2oyeDA4dDBzZnUyanJ5d3RiczlxcXYifQ.TSAp7_ShcMtYcFsMAy_1Bg'
  },
  attachmentUrl: 'https://pss-backend-9.onrender.com/uploads/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
