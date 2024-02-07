import React from "react";
import Header from "./header";
import Footer from "./footer";
import TempGraph from "./tempGraph";
import SnowGraph from "./snowGraph";
import RainGraph from "./rainGraph";

function Past() {
  return (
    <>
      <Header />
      <main className="past">
        <h2>Past Weather Data</h2>
        <p>
          We can use graphs to learn about weather. They can show us patterns
          that occur or how a certain weather criteria like precipitation or
          temperature change over time. From these patterns, we can see if
          temperatures are rising or falling over multiple years, whether the
          amount a snow is decreasing or if it just has a cycle, and which
          months are the rainiest. Using graphs, we are able to learn about the
          past, and that knowledge can help us have an idea about the future.
        </p>
        <section className="temp">
          <h3>Temperatures Over the Last Ten Years</h3>
          <p>
            In this graph, we are looking at the average temperatures for each
            of the last ten years. By doing this, we can see whether
            temperatures have been rising or falling.
          </p>
          <p>
            The x-axis, or the number along the bottom of the chart, are years.
            The y-axis, on number going up the side of the chart, are
            temperatures. Each point represents a temperature value. The{" "}
            <span style={{ color: "red" }}>red</span> line shows us the average
            maximum temperature over the years. The{" "}
            <span style={{ background: "yellow" }}>yellow</span> line shows us
            the average temperature, and the{" "}
            <span style={{ color: "blue" }}>blue</span> line marks the average
            minimum.
          </p>
          <TempGraph />
        </section>
        <section className="snow">
          <h3>
            Snowfall Totals for December, January, February, and March Over the
            Last Ten Years.
          </h3>
          <p>
            Some years, snowfall is heavy; other times, it is very light. Graphs
            can show us whether this is a cycle or a change over time.
          </p>
          <SnowGraph />
        </section>
        <section className="rain">
          <h3>Precipitation Totals per Month for Last Year</h3>
          <p>
            This graph shows us the total amount of rain that fell for each
            month in the last year. From this, we can see months ____ and ____
            were the rainiest with ___ inches in _____ and ____ inches in ___.
            ___ was the driest with only ____ inches of rain.
          </p>
          <RainGraph />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Past;
