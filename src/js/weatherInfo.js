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

  checkPlural(string) {
    if (string.at(-1) === "s") {
      return <span>are {string}</span>;
    } else {
      return <span>is {string}</span>;
    }
  }

  miniNav() {
    return (
      <nav className="miniNav">
        <a href="#top">Back to Top</a>
        <a href="#what">What are {this.state.weatherType}?</a>
        <a href="#how">How are they formed?</a>
        <a href="#facts">Facts</a>
        <a href="#resources">Resources</a>
      </nav>
    );
  }

  createTiles() {
    return Object.keys(weatherJSON.weatherSummaries).map((wType, i) => {
      let usableJSON = weatherJSON.weatherSummaries[wType];
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
      <div className="summaryDiv" key={"summary"}>
        <aside>
          <h3>Navigation</h3>
          <h4 className="all">
            <a href="/weather">All Weather Types</a>
          </h4>
          {Object.keys(weatherJSON.weatherSummaries).map((wType, i) => {
            return (
              <>
                <h4 key={wType + i}>
                  {/* FIX ME! */}
                  <button
                    onClick={() => {
                      this.tileClicked(wType);
                    }}
                  >
                    {this.toTitleCase(wType)}
                  </button>
                  {wType === this.state.weatherType && this.miniNav()}
                </h4>
              </>
            );
          })}
        </aside>
        <div className="deets">
          <h2 id="top">{this.toTitleCase(this.state.weatherType)}</h2>
          <h3>Overview</h3>
          <p
            dangerouslySetInnerHTML={{
              __html:
                weatherJSON.weatherSummaries[this.state.weatherType].overview,
            }}
          ></p>
          <h3 id="what">What {this.checkPlural(this.state.weatherType)}?</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: weatherJSON.weatherSummaries[this.state.weatherType].what,
            }}
          ></p>
          <div className="imgDiv">
            <img
              src={weatherJSON.weatherSummaries[this.state.weatherType].img1}
              alt={weatherJSON.weatherSummaries[this.state.weatherType]}
              width={100}
              height={100}
            />
          </div>
          <h3 id="how">
            How {this.checkPlural(this.state.weatherType)} formed?
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: weatherJSON.weatherSummaries[this.state.weatherType].how,
            }}
          ></p>
          <div className="imgDiv">
            <img
              src={weatherJSON.weatherSummaries[this.state.weatherType].img2}
              alt={weatherJSON.weatherSummaries[this.state.weatherType]}
              width={100}
              height={100}
            />
          </div>
          <h3 id="facts">Bonus facts about {this.state.weatherType}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html:
                weatherJSON.weatherSummaries[this.state.weatherType].facts,
            }}
          ></p>
          <h3 id="resources">Resources</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: weatherJSON.weatherSummaries[this.state.weatherType].srcs,
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
