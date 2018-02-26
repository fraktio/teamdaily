import React from "react";
import moment from "moment";

// @TODO Use native functions wheneven possible
import keys from "lodash/keys";
import mapValues from "lodash/mapValues";
import zipObject from "lodash/zipObject";
import reduce from "lodash/reduce";
import forEach from "lodash/forEach";
import map from "lodash/map";
import filter from "lodash/filter";

import * as colors from "../../colors";

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

// TODO: Use i18n library for translations
const translations = {
  monday: "Maanantai",
  tuesday: "Tiistai",
  wednesday: "Keskiviikko",
  thursday: "Torstai",
  friday: "Perjantai"
};

class WeeklyGraph extends React.Component {
  // TODO: make it responsive and (pseudo-)reactive!
  render() {
    return (
      <div>
        <div className="chart-div">
          <div
            id="chart-div"
            style={{
              width: "900px",
              height: "500px"
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    google.load("visualization", "1", {
      packages: ["corechart"],
      callback: () => {
        this.drawChart(this.props.week, this.props.year, this.props.userData);
      }
    });
  }

  componentDidUpdate() {
    this.drawChart(this.props.week, this.props.year, this.props.userData);
  }

  drawChart(week, year, userData) {
    const users = keys(userData);

    const dayUserMap = mapValues(zipObject(weekDays), x => {
      return zipObject(users);
    });

    const dailySpread = reduce(
      userData,
      (dayUserStatusMap, user, name) => {
        let selectedWeekStatuses = user.weeks[week + "_" + year];

        forEach(selectedWeekStatuses, status => {
          let day = moment(status.created)
            .format("dddd")
            .toLowerCase();

          // Paskofix if day is weekend
          if (dayUserStatusMap[day] !== undefined) {
            dayUserStatusMap[day][status.name] = status.color;
          }
        });

        let previousStatus = undefined;

        forEach(weekDays, day => {
          let statusOfTheDay = dayUserStatusMap[day][name];

          if (statusOfTheDay === undefined) {
            dayUserStatusMap[day][name] = previousStatus;
          } else {
            previousStatus = statusOfTheDay;
          }
        });

        return dayUserStatusMap;
      },
      dayUserMap
    );

    const googleArrayFormat = map(dailySpread, (statuses, key) => {
      return [
        translations[key],
        counts(colors.COLOR_PINK, statuses),
        counts(colors.COLOR_BLUE, statuses),
        counts(colors.COLOR_GREEN, statuses),
        counts(colors.COLOR_YELLOW, statuses),
        counts(colors.COLOR_RED, statuses)
      ];
    });

    function counts(status, statuses) {
      return filter(statuses, x => {
        return x === status;
      }).length;
    }

    const data = google.visualization.arrayToDataTable([
      [
        "Day",
        "Lomalla",
        "Liian vähän töitä",
        "Sopivasti töitä",
        "Hieman liikaa töitä",
        "Liian paljon töitä"
      ],
      ...googleArrayFormat
    ]);

    const options = {
      title: "Työtaakka - viikko " + week,
      hAxis: {
        title: "Viikonpäivä",
        titleTextStyle: { color: "white" },
        textStyle: { color: "white" },
        gridlines: {
          color: "gray",
          count: 7
        }
      },
      vAxis: {
        title: "Työntekijöiden lkm",
        minValue: 0,
        titleTextStyle: { color: "white" },
        textStyle: { color: "white" },
        gridlines: {
          color: "gray",
          count: 7
        },
        format: ""
      },
      legend: {
        textStyle: { color: "white" }
      },
      titleTextStyle: { color: "white" },
      isStacked: "true",
      colors: [
        colors.COLOR_PINK,
        colors.COLOR_BLUE,
        colors.COLOR_GREEN,
        colors.COLOR_YELLOW,
        colors.COLOR_RED
      ],
      backgroundColor: "#2B2B2B",
      tooltip: {
        trigger: "focus"
      },
      focusTarget: "category"
    };

    var chart = new google.visualization.SteppedAreaChart(
      document.getElementById("chart-div")
    );
    chart.draw(data, options);
  }
}

export default WeeklyGraph;
