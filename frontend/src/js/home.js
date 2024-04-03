import "../css/master.css";
import tipJson from "../json/tips.json";
import lJson from "../json/lstorms.json";
import Header from "../js/header";
import Footer from "../js/footer";
import React from "react";
import axios from "axios";
import { getUrl, toTitleCase } from "./functions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: {},
      // host: getUrl()
    };
  }

  componentDidMount() {
    axios.get("http://localhost:2024/weatherAPI").then((jsObject) => {
      this.setState({ weatherData: jsObject.data });
    });
  }

  randomTip() {
    // random tips
    const randTipIdx = Math.floor(Math.random() * tipJson.tips.length);
    const randValue = tipJson.tips[randTipIdx];
    // console.log(randValue);
    return (
      <div className="tipTop">
        <h4>{randValue.subject}</h4>
        <p>{randValue.tip}</p>
      </div>
    );
  }

  legend() {
    const json = Object.keys(lJson.lstorms);
    const randTypeIdx = Math.floor(Math.random() * json.length); //storm type indexes
    const stormTypes = json[randTypeIdx]; //storm type names

    const randStormIdx = Math.floor(
      Math.random() * Object.keys(lJson.lstorms[stormTypes]).length
    ); //name index
    const stormNames = Object.keys(lJson.lstorms[stormTypes])[randStormIdx];

    const allFacts = lJson.lstorms[stormTypes][stormNames].facts;
    const matches = [...allFacts.matchAll(/>[a-zA-Z \d.?,\(\)!]+</g)];
    const randFactIdx = Math.floor(Math.random() * matches.length);
    let randFact = matches[randFactIdx];

    if (randFact) {
      randFact = randFact[0].slice(1, -1);
      return (
        <>
          <h4 className="stormName">{stormNames}</h4>
          <p className="fact">{randFact}</p>
        </>
      );
      // return [randFact, stormNames];
    }
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
    let tip = this.randomTip();
    // console.log(this.legend()[1])

    // build html for page
    return (
      <div className="App">
        <Header />
        <main className="home">
          <h2>Home</h2>
          <div className="content">
            <div className="tips">
              <h3>Weather Tip</h3>
              {this.randomTip()}
            </div>
            <div className="highlightedStorm">
              <div className="cloudLayer">
                <h3>Legendary Storm Spotlight</h3>
                {this.legend()}
                <p className="linkP">
                  <a href="legendarystorms">Visit Storm!</a>
                </p>
              </div>
            </div>
            <div className="report">
              <h3>See any interesting weather happening around you?</h3>
              <p>
                <a href="stormwatch">Report a Storm!</a>
              </p>
            </div>
          </div>
          <div className="prints">
            <h3>🧩 Looking for weather puzzles?</h3>
            <p>
              <a href="printables">Check out the Printables page!</a>
            </p>
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
          <div className="forecast">
            <h3>Forecast</h3>
            <div className="weatherTile">
              <div className="bigNsmall">
                <div className="imgDiv">
                  <img
                    src={
                      cForecast[4] !== ""
                        ? `../imgs/icons/${toTitleCase(cForecast[4])}.png`
                        : ""
                    }
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
                    src={
                      dForecast[4] !== ""
                        ? `../imgs/icons/${toTitleCase(dForecast[4])}.png`
                        : ""
                    }
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
                    src={
                      dForecast2[4] !== ""
                        ? `../imgs/icons/${toTitleCase(dForecast2[4])}.png`
                        : ""
                    }
                    alt="current weather image"
                    width={100}
                    height={100}
                  />
                </div>
                <p>{dForecast2[2]}&deg;F</p>
              </div>
              <div className="weatherData">
                <p>{dForecast2[0]}</p>
                <p>Windspeed: {dForecast2[3]}mph</p>
                <p>Humidity: {dForecast2[1]}%</p>
              </div>
            </div>
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
