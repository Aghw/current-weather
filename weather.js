// console.log("Inside weather.js");
const apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
const weatherAPIId = "d1d1639242e70d95bfcfa804bd279455";
const googleAPI = "AIzaSyD9HFIVhhN6NNCDR4-qyNhoLq2L84UxXmc";
const form = document.getElementById("apiOptions")
let currentWeather = null;
let latitude = null;
let longitude = null;



function clearList()
{
    var ul = document.querySelector("ul");
    var orderList = document.querySelectorAll("li");

    for(let li of orderList)
      ul.removeChild(li);

}


function queryBuilder(queryObj){
  let holder = [];

  // loop through queryObj key value pairs
  for(let key in queryObj){
    // turn each one into "key=value"
    let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`;

    // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
    holder.push(convert);
  }
  // concatenate the pairs together, with & between
  let longString = holder.join("&");
  // prepend a ? to concatenated string, return
  return `${apiUrl}?${longString}`;

}

//
// function weatherReading(weather){
//   // mainWeather = weather;
//   currentWeather = weather;
//   // let holder = [];
// //
//   // // loop through queryObj key value pairs
//   // for(let key in weather){
//   //   // turn each one into "key=value"
//   //   let weatherVal = `{${encodeURIComponent(key)}: ${encodeURIComponent(weather[key])}}`;
//   //
//   //   console.log(weatherVal);
//   //   // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
//   //   currentWeather.push(weatherVal);
//   // }
//
//   drawList();
//
// }


function processRequest(cityUrl) {
    // remove existing list
    clearList();

    let request = new XMLHttpRequest();

    // starts talk to API - 3 params
    // request method, url, (optional) async flag (default true)
    // open() - initializes the request; does the network stuff to make async
    // request possible
    request.open("GET", cityUrl, true);

    // first when the request is complete
    // long term - I want to update the dom
    // short term - just show me what I got
    // onload() - callback that fires when the async request completes.
    // Handles both success (server gave us data) and failure (server tried,
    // but something went wrong)
    request.onload = function () {
      let weatherDiv = document.getElementById('weatherInfo');
      let response = JSON.parse(request.response);

      currentWeather = response.main;
      currentWeather.name = response.name;
      currentWeather.country = response.sys.country;
      currentWeather.sunrise = new Date(response.sys.sunrise * 1000);
      currentWeather.sunset = new Date(response.sys.sunset * 1000);
      currentWeather["wind speed"] = response.wind.speed;
      currentWeather.cloudiness = response.clouds.all + " %";
      currentWeather.weather = response.weather[0].main + " ( " + response.weather[0].description + " )";
      drawList();
    }

    // fires if something goes wrong
    // error() - second place things can go wrong; this
    // is a callback for handling network errors
    request.onerror = function (errorObject) {
      console.log("broken : (" );
      console.log(errorObject);
    }

    // send the request
    // send() - send our formatted request to the remote server
    request.send();
}


function seattleWeather () {
  event.preventDefault(); //to prevent the form from submitting to server and refreshing the page
  latitude = 47.6762;
  longitude = -122.3182;

  let cityCord =  {appid: weatherAPIId, lat: latitude, lon: longitude, units: "imperial" };
  let formatted = queryBuilder(cityCord);

  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Weather and Forcast In Seattle";

  // var div1 = document.getElementById("list-container");
  var parent = document.querySelector("#weatherInfo");
  //clear out any existing staff
  parent.innerHTML = "<h3>Weather in Seattle, US: </h3>";

  processRequest(formatted);

}



function londonWeather () {
  event.preventDefault(); //to prevent the form from submitting to server and refreshing the page
  latitude = 51.5074;
  longitude = 0.1278;

  let cityCord =  {units: "metric", appid: weatherAPIId, lat: latitude, lon: longitude};
  let formatted = queryBuilder(cityCord);

  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Weather and Forcast In London";

  // var div1 = document.getElementById("list-container");
  var parent = document.querySelector("#weatherInfo");
  //clear out any existing staff
  parent.innerHTML = "<h3>Weather in London, UK: </h3>";

  processRequest(formatted);

}

// the following function is triggered when the "current Loc" button is clicked
function currentLocationWeather() {
    // get user's location from the browser
    navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
}

// callback for successfully getting location from user's browser
function geolocSuccess(position){
  const newPos = {lat: position.coords.latitude, lng: position.coords.longitude};
  getLocation(newPos);

  let h1 = document.querySelector("h1");
  h1.innerHTML = "Current Weather and Forcast In " + currentWeather.name;

  // update city name in main page
  let pageTitle = document.querySelector("#weatherInfo");
  let city = `<h3>Weather in ${currentWeather.name}, ${currentWeather.country}</h3>`
  pageTitle.innerHTML = city;
}

// callback for no success getting location from user's browser
function geolocError(){
  console.log("Error getting user's location :(");
}

// helper method to call API and convert longitude & latitude to a human friendly address
function getLocation(currLoc){
    latitude = Math.floor(currLoc.lat * 10000 + 0.5) / 10000;
    longitude = Math.floor(currLoc.lng * 10000 + 0.5) / 10000;

    let cityCord =  {appid: weatherAPIId, lat: latitude, lon: longitude, units: "imperial" };
    let formatted = queryBuilder(cityCord);

    processRequest(formatted);
}



function clearTable() {
  let table = document.getElementById("weatherTable");
  while (table.rows.length > 0)
    table.deleteRow(0);
}



function drawList() {
  let dateTime = document.getElementById("dateTime");
  let d = (new Date()).toTimeString().slice(0,8);

  // dateTime.innerHTML = "<p> Current time and date:  "
  //                    + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + "    "
  //                    + d.getDay() + ", " + d.getMonth() + " " + d.getDate() + "</p>"//date;
 dateTime.innerHTML = "<p> Current time:  " + d;
  //
  var length = currentWeather.length;
  let table = document.getElementById("weatherTable");
  let rowCounter = 0;

  table.add

  //clear list
  clearList()
  clearTable();

  // currentWeather.forEach( function(item)
  // {
  //   console.log(item);
    // for (let key in currentWeather) {
    //   // var x = item[key];
    //   console.log(key + ": " + currentWeather[key]);
    // }
  // });

  for (let key in currentWeather) {
    // let row = document.createElement("row")
    let withPercent = (key === "humidity") ? currentWeather[key] + " %":
                      ((key === "pressure") ? currentWeather[key] + " hpa": currentWeather[key]);

    let row = table.insertRow(rowCounter++);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML =  withPercent;

  }

  let row = table.insertRow(rowCounter++);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "Geo Coords";
  cell2.innerHTML =  "["+ latitude + ", " + longitude + "]";

  showGeoLocation();
}


function showGeoLocation() {
    let imgUrl = "https://maps.googleapis.com/maps/api/staticmap";

    let latlong = latitude + "," + longitude
    let zoom = "&zoom=14&size=400x300&sensor=false"
    let geoMapUrl = `${imgUrl}?center=${latlong}${zoom}&key=${googleAPI}`;

    let positionMap = document.getElementById("showGeoPosition");
    positionMap.innerHTML = "<img src='" + geoMapUrl + "'>";
}


document.addEventListener("DOMContentLoaded", function () {
  console.log('All resouces finished loading and are ready!');

  let seaWeather = document.querySelector('#seattleWeather');
  let lonWeather = document.querySelector('#londonWeather');
  seaWeather.addEventListener("click", seattleWeather);

  lonWeather.addEventListener("click", londonWeather);

  let currLocation = document.querySelector('#currentLocation');
  currLocation.addEventListener("click", currentLocationWeather);
})
