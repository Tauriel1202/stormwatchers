import React from "react";
import Plot from "react-plotly.js";
import Past from "../json/bostonPast.json";

class TempGraph extends React.Component {
  // temps(year, type) {
  //   let temps = [];

  //   // minT for 2023
  //   for (
  //     let i = 0;
  //     i < Past[year].locations["Boston, MA,USA"].values.length;
  //     i++
  //   ) {
  //     let temp = Past[year].locations["Boston, MA,USA"].values[i][type];

  //     temps.push(temp);
  //   }

  //   // math and round on minT/maxt/avg
  //   const tempsReady = Math.round(
  //     temps.reduce((sum, curr) => sum + curr) / 365,
  //     1
  //   );

  //   return tempsReady;
  // }

  tempsByMonth(month, year) {
    let days = Past[year].locations["Boston, MA,USA"].values;
    let oneMonth = days.filter(
      (x) => new Date(x.datetimeStr).getMonth() === month
    );

    let temps = oneMonth.map((x) => x.temp);

    const tempsReady = Math.round(
      temps.reduce((sum, curr) => sum + curr) / temps.length,
      1
    );

    return tempsReady;
  }

  graphline(years, color) {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let temps = [];
    for (let i = 0; i < monthNames.length; i++) {
      temps.push(this.tempsByMonth(i, years));
    }

    return {
      x: [...monthNames],
      y: [...temps],
      type: "scatter",
      mode: "lines",
      marker: { color: color },
      name: years,
    };
  }

  render() {
    // console.log(Past[2023].locations["Boston, MA,USA"]);

    // all the years
    let years = [];

    for (let i = 0; i < Object.keys(Past).length; i++) {
      let pastJson = Object.keys(Past)[i];
      years.push(pastJson);
    }
    // console.log(this.temps(2023, "maxt"), "💩");

    let graphlines = [];
    let colors = ["#007a54", "#0ac6ff", "orange", "#65e77f", "#f764b7"];

    for (let i = 0; i < years.length; i++) {
      graphlines.push(this.graphline(years[i], colors[i]));
    }
    console.log(graphlines)
    return (
      <Plot
        className="plot"
        data={[...graphlines]}
        layout={{
          width: 500,
          height: 400,
          autosize: true,
          title: "Temperature Over Time",
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    );
  }
}

export default TempGraph;
