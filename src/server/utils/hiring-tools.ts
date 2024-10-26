// Example dummy function hard coded to return the same weather
// In production, this could be your backend API or an external API
export function getCurrentWeather(location: string, unit = "fahrenheit") {
  console.log('getCurrentWeather executed');

  if (location.toLowerCase().includes("tokyo")) {
    return JSON.stringify({location: "Tokyo", temperature: "10", unit: "celsius"});
  } else if (location.toLowerCase().includes("san francisco")) {
    return JSON.stringify({location: "San Francisco", temperature: "72", unit: "fahrenheit"});
  } else if (location.toLowerCase().includes("paris")) {
    return JSON.stringify({location: "Paris", temperature: "22", unit: "fahrenheit"});
  } else {
    return JSON.stringify({location, temperature: "unknown"});
  }
}

// use location services and google map API, and transport API to get the distance
export function getDistance(source: string, destination: string) {
  console.log('getDistance executed');
  return JSON.stringify({source, destination, distance: "100 miles"});

}
