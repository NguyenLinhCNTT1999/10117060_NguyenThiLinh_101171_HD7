// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var $: any;
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44382/'
};

//dialogType:confirm, alert.
export const showDialog = (title, message, dialogType, behavior) => {
  $('#DialdogModal').modal('toggle');
  localStorage.setItem("dialog", JSON.stringify({
    title: title,
    message: message,
    dialogType: dialogType,
    behavior: behavior
  }));
}
export const sumArray = (arr,attr) => {
  let sum=0;
  for (let i of arr) {
    sum+=parseFloat(i.attr);
  }

  return sum;
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
