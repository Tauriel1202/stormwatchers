import "../css/master.css";
import tipJson from "../json/tips.json";
import lJson from "../json/lstorms.json";
import Header from "../js/header";
import Footer from "../js/footer";
import React from "react";
import axios from "axios";
import { toTitleCase } from "./functions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: {},
    };
  }

  componentDidMount() {
    axios.get("http://localhost:2024/weatherAPI").then((jsObject) => {
      this.setState({ weatherData: jsObject.data });
      console.log(jsObject.data);
    });
  }

  randomLegend() {
    // random tips
    const randTipIdx = Math.floor(Math.random() * tipJson.tips.length);
    const randValue = tipJson.tips[randTipIdx];
    // random Legend
    let storms = [];
    for (let storm in lJson.lstorms) {
      for (let i = 0; i < Object.keys(lJson.lstorms[storm]).length; i++) {
        // console.log(Object.keys(lJson.lstorms[storm])[i]);
        storms.push(Object.keys(lJson.lstorms[storm])[i]);
      }
    }
    const randLegendIdx = Math.floor(Math.random() * storms.length); //legend idx
    const randLegendValue = storms[randLegendIdx]; //legend name

    const randLegendTypeIdx = Math.floor(Math.random() * Object.keys(lJson.lstorms).length);
    const randLegendType = Object.keys(lJson.lstorms)[randLegendTypeIdx];

    return [randTipIdx, randValue, randLegendIdx, randLegendValue];
  }

  getForecast(day, dNumber) {
    let current = "Loading...";
    let currentWind = "Loading...";
    let currentTemp = "Loading...";
    let currentHumidity = "Loading...";
    let forecastImg = "";
    let re =
      /light |heavy |moderate |partly |mostly |broken | sky|overcast |few |scattered /g;

    if (day in this.state.weatherData) {
      if (day === "current") {
        forecastImg = this.state.weatherData[day].weather[0].description;
        forecastImg = forecastImg.replace(re, "");

        current = toTitleCase(
          this.state.weatherData[day].weather[0].description
        );
        currentTemp = Math.round(this.state.weatherData[day].feels_like);
        currentWind = Math.round(this.state.weatherData[day].wind_speed);
        currentHumidity = this.state.weatherData[day].humidity;
      } else {
        forecastImg =
          this.state.weatherData[day][dNumber].weather[0].description;
        forecastImg = forecastImg.replace(re, "");

        current = toTitleCase(
          this.state.weatherData[day][dNumber].weather[0].description
        );
        currentTemp = Math.round(
          this.state.weatherData[day][dNumber].feels_like.day
        );
        currentWind = Math.round(
          this.state.weatherData[day][dNumber].wind_speed
        );
        currentHumidity = this.state.weatherData[day][dNumber].humidity;
      }
    }

    return [current, currentHumidity, currentTemp, currentWind, forecastImg];
  }

  render() {
    let cForecast = this.getForecast("current");
    let dForecast = this.getForecast("daily", 1);
    let dForecast2 = this.getForecast("daily", 2);
    let randomLegend = this.randomLegend();
    // console.log(lJson.lstorms[randomLegend[4]][randomLegend[3]].facts);

    // build html for page
    return (
      <div className="App">
        <Header />
        <main className="home">
          <h2>Home</h2>
          <div className="content">
            <div className="tips">
              <h3>Weather Tip</h3>
              <div className="tipTop">
                {/* <div className="imgDiv">
                <img
                  // src={require(randomLegend[1].img)}
                  // alt={randomLegend[1].subject}
                  width={25}
                  height={25}
                />
              </div> */}
                <h4>{randomLegend[1].subject}</h4>
              </div>
              <p>{randomLegend[1].tip}</p>
            </div>
            <div className="highlightedStorm">
              <div className="cloudLayer">
                <h3>Legendary Storm Spotlight</h3>
                <h4> ~ {randomLegend[3]} ~ </h4>
                <p className="fact">{randomLegend[3].facts}</p>
                <p className="linkP">
                  <a>Visit Storm!</a>
                </p>
              </div>
            </div>
            <div className="report">
              <h3>See any interesting weather happening around you?</h3>
              <p>
                <a href="Watch">Report a Storm!</a>
              </p>
            </div>
            <div className="prints">
              <h3>🧩 Looking for weather puzzles?</h3>
              <p>
                <a href="Printables">Check out the Printables page!</a>
              </p>
            </div>
          </div>
          <div className="forecast">
            <h3>Forecast</h3>
            <div className="weatherTile">
              <div className="bigNsmall">
                <div className="imgDiv">
                  <img
                    src={`./imgs/icons/${cForecast[4]}.png`}
                    alt="current weather image"
                    width={100}
                    height={100}
                  />
                </div>
                <p>{cForecast[2]}&deg;F</p>
              </div>
              <div className="weatherData">
                <p>{cForecast[0]}</p>
                <p>Windspeed: {cForecast[3]}mph</p>
                <p>Humidity: {cForecast[1]}%</p>
              </div>
            </div>
            <div className="weatherTile">
              <div className="bigNsmall">
                <div className="imgDiv">
                  <img
                    src={`./imgs/icons/${dForecast[4]}.png`}
                    alt="current weather image"
                    width={100}
                    height={100}
                  />
                </div>
                <p>{dForecast[2]}&deg;F</p>
              </div>
              <div className="weatherData">
                <p>{dForecast[0]}</p>
                <p>Windspeed: {dForecast[3]}mph</p>
                <p>Humidity: {dForecast[1]}%</p>
              </div>
            </div>
            <div className="weatherTile">
              <div className="bigNsmall">
                <div className="imgDiv">
                  <img
                    src={`./imgs/icons/${dForecast2[4]}.png`}
                    alt="current weather image"
                    width={100}
                    height={100}
                  />
                </div>
                <p>{cForecast[2]}&deg;F</p>
              </div>
              <div className="weatherData">
                <p>{dForecast2[0]}</p>
                <p>Windspeed: {dForecast2[3]}mph</p>
                <p>Humidity: {dForecast2[1]}%</p>
              </div>
            </div>
          </div>
          <div className="formula">
            <h3>🔢➡ Weather Conversions ➡🔢</h3>
            <p>Fahrenheit = (Celsius * 1.8) + 32</p>
            <p>Celsius = (Fahrenheit - 32) / 1.8</p>
            <p>
              Wind chill = 35.74 + 0.6215(Temperature) – 35.75(Windspeed
              <sup>0.16</sup>) + 0.4275(Temperature)(Windspeed<sup>0.16</sup>)
            </p>
          </div>
          <div className="sats">
            <p>
              <a href="https://zoom.earth/">🌎 Zoom Earth Satellite</a>
            </p>
            <p>
              <a href="https://www.star.nesdis.noaa.gov/goes/index.php">
                🌎 GOES Satellite
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
