import React from "react";
import weatherJSON from "../json/weather.json";
import Header from "../js/header";
import Footer from "./footer";

function Weather() {
  for (let i = 0; i < Object.keys(weatherJSON.weatherSummaries).length; i++) {
    console.log(Object.keys(weatherJSON.weatherSummaries)[i]);
  }

  console.log(Object.keys(weatherJSON.weatherSummaries).length)

  return (
    <>
      <Header />
      <main>
        <h2>Types of Weather</h2>
      </main>
      <Footer />
    </>
  );
}

export default Weather;
