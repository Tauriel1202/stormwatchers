import React from "react";
import weatherJSON from "../json/weather.json";
import Header from "../js/header";
import Footer from "./footer";

function Weather() {
  let tiles =  Object.keys(weatherJSON.weatherSummaries).map((wType,i) => {
    let usableJSON = weatherJSON.weatherSummaries[wType]
    var a = '../imgs/clouds.jpg'
    return <div key={wType}>
      <div className="imgDiv">
        {/* {console.log(i, w.imgTile)} */}
        <img src={require(a)} 
        alt={wType}
        width={100}
        height={100}
        />
      </div>
      <h4>{wType}</h4>
    </div>
  })
  //   const tileData = document.createElement('div');
    

  //   const tileH4 = document.createElement('h4');
  //   tileH4.innerHTML = weatherType;
  
  //   const imgDiv =  document.createElement('div');
  //   const img = document.createElement('img');
  //   img.src = weatherType.imgTile;
  //   img.alt = weatherType

  //   imgDiv.append(img);
  //   tileData.append(tileH4, imgDiv);

  //   console.log(tileData)
  //   tiles.append(tileData);
  // }

  console.log()

  return (
    <>
      <Header />
      <main>
        <h2>Types of Weather</h2>
        <h3>Choose a weather type to learn more!</h3>
        <div className="tiles">
          {tiles}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Weather;
