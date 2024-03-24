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
          We can use graphs to learn more about weather. They can show us
          patterns that occur or how a certain weather criteria like
          precipitation or temperature change over time. From these patterns, we
          can see if temperatures are rising or falling over multiple years;
          whether the amount a snow is decreasing or increasing; if certain
          weather event occurs over a multi-year cycle; and which months are the
          rainiest. Using graphs, we are able to learn about the past, and that
          knowledge can help us have an idea about the future.
        </p>
        <p>
          There are different types of graphs we can use to show weather
          patterns and measures. Two of the most common charts are line graphs
          and bar charts. Line graphs can show us temperature over time, while
          bar charts are often used to show rain or snow totals.
        </p>
        <section className="temp">
          <h3>Temperatures Over Time</h3>
          <p>
            This graph looks at the monthly temperatures for Boston over the
            last five years. The x-axis, or the horizontal line of the chart,
            show us the months of the year. The y-axis, or vertical line, gives
            us the temperature values in Fahrenheit. The lines connect points on
            the graph, showing us how the temperature changes over time.
          </p>
          <p>
            Using the x- and y-axes, we can plot, or graph, the temperature data
            for different years. Each line represents a different year. The
            legend, or colored lines with numbers next to them, tell us which
            year we are looking at. The
            <span style={{ color: "#007a54" }}> dark green</span> line shows the
            average total temperature for each month of the year 2019. The
            <span style={{ color: "#0ac6ff" }}> blue</span> line is the year
            2020. <span style={{ color: "orange" }}>Orange</span> is the year
            2021,
            <span style={{ background: "#65e77f" }}> light green</span> is 2022,
            and
            <span style={{ color: "#f764b7" }}> pink</span> stands for 2023.
          </p>
          <p>
            From this graph, we can see that the blue year (2020) had the
            warmest winter (38&deg;) of the five years. We can also draw the
            conclusion that 2019 had the warmest July of the five years with an
            average temperature of 78&deg;. 2021 (orange) had the coolest
            average summer temperature (72&deg;), as well as the second coldest
            winter temperature (31&deg;).
          </p>
          <TempGraph />
        </section>
        <section className="snow">
          <h3>
            Snowfall Totals for November, December, January, February, and March
          </h3>
          <p>
            Some years, snowfall is heavy; other times, it is very light. Graphs
            can show us a year's snowfall in relation to other years. The graph
            to the side is a bar graph instead of the line graph we used above.
            We still have x- and y- axes, although they have been renamed to
            match the values needed for this chart, they serve a similar
            purpose. In both, the axes let us see one set of values (like
            temperature or inches) in relation to another set of values (like
            months). The main difference between the two charts is whether you
            use lines or bars. In the chart on the left, each year is
            represented as colored bar.
          </p>
          <p>
            The x-axis shows us the months most likely to have snow: January,
            February, March, November, and December. The y-axis gives us the
            value of the snow depth in inches.
          </p>
          <p>
            From this graph, we can see 2023 (pink) had the most snow for each
            month on the graph. The highest snow total for 2023 was in February
            (27 inches). 2019 (dark green) and 2022 (light green) had no snow
            totals for November. 2019 also had the smallest average snow total
            for January, March, and December.
          </p>
          <SnowGraph />
        </section>
        <section className="rain">
          <h3>Precipitation Totals for the Last Five Years</h3>
          <p>
            This graph is a bar chart like the one above about snowfall, even
            though it looks a little different. Unlike the snowfall graph, each
            colored bar only appears once. This difference is based on the
            values of the measurements we are using. This graph is also a little
            different because the value of the bar (or rainfall measurement in
            inches) is displayed as white text on the colored bar itself. This
            just makes it easier to know the value of the bar.
          </p>
          <p>
            In this graph, the x-axis has years instead of months like the other
            two. This one uses years, so we can look at the average rainfall
            over the course of the whole year, instead of individually for each
            month. The y-axis gives us the amount of rainfall in inches.
          </p>
          <p>
            From this graph, we can that 2021 (green) was the rainiest of the
            last five years for Boston (0.14 inches). We can also see 2022 (red)
            was the least rainy of the displayed years (0.08 inches). Both 2019
            (blue) and 2023 (purple) had rainy years with similar rainfall
            totals (0.13). *The rainfall totals have been rounded for easier
            reading; therefore, 2019 and 2023 might not be exactly the same.
          </p>
          <RainGraph />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Past;
