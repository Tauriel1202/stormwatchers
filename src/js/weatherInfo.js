import React from "react";
import weatherJSON from "../json/weather.json";
import Header from "../js/header";
import Footer from "./footer";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherType: "",
    };
  }

  tileClicked = (wType) => {
    console.log(wType);
    this.setState({ weatherType: wType });
  };

  toTitleCase(string) {
    return string.slice(0, 1)[0].toUpperCase() + string.slice(1, string.length);
  }

  createTiles() {
    return Object.keys(weatherJSON.weatherSummaries).map((wType, i) => {
      let usableJSON = weatherJSON.weatherSummaries[wType];
      console.log(usableJSON.imgTile);
      var a = usableJSON.imgTile;
      return (
        <div key={wType} className="tile">
          <button
            onClick={() => {
              this.tileClicked(wType);
            }}
          >
            <div className="imgDiv">
              <img src={a} alt={wType} width={100} height={100} />
            </div>
            <h4>{this.toTitleCase(wType)}</h4>
          </button>
        </div>
      );
    });
  }

  summary() {
    return (
      <div className="summaryDiv">
        <aside>
          {Object.keys(weatherJSON.weatherSummaries).map((wType) => {
            return <h4 key={wType}>{this.toTitleCase(wType)}</h4>;
          })}
        </aside>
        <div className="deets">
          <h2>{this.toTitleCase(this.state.weatherType)}</h2>
          <h3>Overview</h3>
          <p>{weatherJSON.weatherSummaries[this.state.weatherType].overview}</p>
          <h3>What are {this.toTitleCase(this.state.weatherType)}?</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: weatherJSON.weatherSummaries[this.state.weatherType].what,
            }}
          ></p>
        </div>
      </div>
    );
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
          {this.state.weatherType !== "" && this.summary()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Weather;
