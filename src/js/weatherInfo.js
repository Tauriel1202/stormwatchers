import React from "react";
import weatherJSON from "../json/weather.json";
import Header from "../js/header";
import Footer from "./footer";
import { toTitleCase } from "./functions";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherType: "",
    };
  }

  createTiles() {
    return Object.keys(weatherJSON.weatherSummaries).map((wType, i) => {
      let usableJSON = weatherJSON.weatherSummaries[wType];
      var a = usableJSON.imgTile;
      return (
        <div key={wType} className="tile">
          <a href={`/weather/summary?weatherType=${wType}`}>
            <div className="imgDiv">
              <img src={a} alt={wType} width={100} height={100} />
            </div>
            <h4>{toTitleCase(wType)}</h4>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <Header />
        <main className="weather">
          <h2>Types of Weather</h2>
          {this.state.weatherType === "" && (
            <>
              <h3>Choose a weather type to learn more!</h3>
              <div className="tiles">{this.createTiles()}</div>
            </>
          )}
          {/* {this.state.weatherType !== "" &&  infoTemplate(this.state.weatherType, this.toTitleCase, this.checkPlural)} */}
        </main>
        <Footer />
      </>
    );
  }
}

export default Weather;
