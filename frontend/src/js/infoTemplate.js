import React from "react";
import weatherJSON from "../json/weather.json";
import { toTitleCase, checkPlural } from "./functions";
import Header from "./header";
import Footer from "./footer";

function InfoTemplate() {
  function miniNav() {
    return (
      <nav className="miniNav">
        <a href="#top">Back to Top</a>
        <a href="#what">What {checkPlural(stateWeatherType)}?</a>
        <a href="#how">How are they formed?</a>
        <a href="#facts">Facts</a>
        <a href="#resources">Resources</a>
      </nav>
    );
  }

  let stateWeatherType = new URLSearchParams(window.location.search).get(
    "weatherType"
  );
  let usableJSON = weatherJSON.weatherSummaries[stateWeatherType];
  // let img1 = require(`${usableJSON.img1}`);
  let img1 = usableJSON.img1;

  let img2 = usableJSON.img2;
  

  let img3;
  if (usableJSON.img3) {
    img3 = (
      <div>
        <img
          src={usableJSON.img3}
          alt={stateWeatherType}
          width={100}
          height={100}
        />
      </div>
    );
  } else {
    img3 = <></>;
  }

  return (
    <>
      <Header />
      <main className="weather">
        <div className="summaryDiv" key={stateWeatherType}>
          <aside>
            <h2>Navigation</h2>
            <h3 className="all">
              <a href="/weather">All Weather Types</a>
            </h3>
            {Object.keys(weatherJSON.weatherSummaries).map((wType, i) => {
              return (
                  <h3 key={wType + i}>
                    <a href={`/weather/summary?weatherType=${wType}`}>
                      {toTitleCase(wType)}
                    </a>
                    {wType === stateWeatherType && miniNav()}
                  </h3>
              );
            })}
          </aside>
          <div className="deets">
            <h2 id="top">{toTitleCase(stateWeatherType)}</h2>
            <h3>Overview</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: weatherJSON.weatherSummaries[stateWeatherType].overview,
              }}
            ></p>
            <h3 id="what">What {checkPlural(stateWeatherType)}?</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: weatherJSON.weatherSummaries[stateWeatherType].what,
              }}
            ></p>
            <div className="imgDiv">
              <img src={img1} alt={stateWeatherType} width={100} height={100} />
            </div>
            <h3 id="how">How {checkPlural(stateWeatherType)} formed?</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: weatherJSON.weatherSummaries[stateWeatherType].how,
              }}
            ></p>
            <div className="imgDiv">
              <img src={img2} alt={stateWeatherType} width={100} height={100} />
            </div>
            {img3}
            <h3 id="facts">Bonus facts about {stateWeatherType}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: weatherJSON.weatherSummaries[stateWeatherType].facts,
              }}
            ></p>
            <h3 id="resources">Resources</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: weatherJSON.weatherSummaries[stateWeatherType].srcs,
              }}
            ></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default InfoTemplate;
