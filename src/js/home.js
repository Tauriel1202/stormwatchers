import "../css/master.css";
import tipJson from "../json/tips.json";
import lJson from "../json/lstorms.json";
import Header from "../js/header";
import Footer from "../js/footer";

//test import
import Tornado from "../imgs/icons/tornadoIcon.jpeg";

function App() {
  // random tips
  const randTipIdx = Math.floor(Math.random() * tipJson.tips.length);
  const randValue = tipJson.tips[randTipIdx];

  console.log("💩", randValue.img);

  // random Legend
  let storms = [];

  for (let storm in lJson.lstorms) {
    for (let i = 0; i < Object.keys(lJson.lstorms[storm]).length; i++) {
      console.log(Object.keys(lJson.lstorms[storm])[i]);
      storms.push(Object.keys(lJson.lstorms[storm])[i]);
    }
  }

  const randLegendIdx = Math.floor(Math.random() * storms.length);
  const randLegendValue = storms[randLegendIdx];
  const randImg = randValue.img;

  // build html for page
  return (
    <div className="App">
      <Header />
      <main className="home">
        <h2>Home</h2>
        <div className="content">
          <div className="tips">
            <h3>Weather Tip</h3>
            {/* <div className="tipTop"> */}
              {/* <div className="imgDiv">
                <img
                  src={require(randValue.img)}
                  alt={randValue.subject}
                  width={25}
                  height={25}
                />
              </div> */}
              <h4>{randValue.subject}</h4>
            {/* </div> */}
            <p>{randValue.tip}</p>
          </div>
          <div className="highlightedStorm">
            <div className="cloudLayer">
              <h3>Legendary Storm Spotlight</h3>
              <h4> ~ {randLegendValue} ~ </h4>
              <p className="fact">
                Did you know that Katrina was one of the costliest storms? It
                flooded New Orleans and other SOuthern states!
              </p>
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
          <div className="weatherTile">
            <div className="imgDiv">
              <img
                src={Tornado}
                alt="current weather image"
                width={100}
                height={100}
              />
            </div>
            <div className="weatherData">
              <p>WEATHER TYPE HERE</p>
              <p>Windspeed: {}</p>
              <p>Chance of Rain: {}</p>
            </div>
          </div>
          <div className="weatherTile">
            <div className="imgDiv">
              <img
                src={Tornado}
                alt="tomorrow's weather image"
                width={100}
                height={100}
              />
            </div>
            <div className="weatherData">
              <p>WEATHER TYPE HERE</p>
              <p>Windspeed: {}</p>
              <p>Chance of Rain: {}</p>
            </div>
          </div>
          <div className="weatherTile">
            <div className="imgDiv">
              <img
                src={Tornado}
                alt="two days forward weather image"
                width={100}
                height={100}
              />
            </div>
            <div className="weatherData">
              <p>WEATHER TYPE HERE</p>
              <p>Windspeed: {}</p>
              <p>Chance of Rain: {}</p>
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

export default App;
