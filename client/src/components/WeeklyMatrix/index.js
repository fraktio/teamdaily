import React, { Component } from "react";
import first from "lodash/first";
import map from "lodash/map"; // Maps object and returns array, how conveninent
import moment from "moment";
import { Range } from "immutable";
import { Link } from "react-router-dom";
import cx from "classnames";
import { FormattedMessage } from "react-intl";

import Api from "services/api";
import userDataExtractor from "services/userDataExtractor";

import UserDataCell from "components/WeeklyMatrix/UserDataCell";
import EmployeeName from "components/EmployeeName";
import BottomContainer from "components/WeeklyMatrix/BottomContainer";

import localstorage from "services/localstorage";
import StatusForm from "components/StatusForm";

import styles from "./style.pcss";

function getNumberOfWeeksForYear(year) {
  const lastDayOfPreviousYear = "31.12." + year;
  return parseInt(moment(lastDayOfPreviousYear, "DD.MM.YYYY").format("W"));
}

const now = moment();
const currentWeek = parseInt(now.format("WW"));
const currentYear = parseInt(now.format("YYYY"));

const fromWeek = currentWeek - 25;
const weekRangeFromCurrentDate = Range(fromWeek, currentWeek + 1);
const numberOfWeeksLastYear = getNumberOfWeeksForYear(currentYear - 1);

const weekNumbers = weekRangeFromCurrentDate.map(weekNumber => {
  if (weekNumber > 0) {
    return [weekNumber, currentYear];
  }

  return [numberOfWeeksLastYear + weekNumber, currentYear - 1];
});

export default class WeeklyMatrix extends Component {
  state = {
    weeklyData: [],
    currentDate: moment(),
    bottom: undefined,
    bottomData: undefined
  };

  componentDidMount() {
    this.updateStats();

    this.setState({
      reactivizer: setInterval(this.updateStats, 30000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.reactivizer);
  }

  updateStats = () => {
    Api.getYearlyStats().then(data => {
      const weeklyData = data.sortBy(entry => entry.name.split(" ")[1]);

      this.setState({ weeklyData });
    });
  };

  weekNumberOnClick = (week, year) => {
    this.setState({
      bottom: "weekly-data",
      bottomData: { week, year }
    });
  };

  cellClick = (week, year, user) => {
    this.setState({
      bottom: "user-weekly-data",
      bottomData: { week, year, user }
    });
  };

  bottomCloseClick = () => {
    this.setState({
      bottom: undefined,
      bottomData: undefined
    });
  };

  getWeeklyColors = user => {
    return weekNumbers.map(([week, year], i) => {
      const weeklyData = user.weeks[week + "_" + year];

      if (weeklyData) {
        let label = "";
        const userName = first(weeklyData).name;

        if (weeklyData.length > 1) {
          label = weeklyData.length;
        }

        const key = `cell-${weeklyData[0].id}`;

        return (
          <UserDataCell
            className={cx(styles.td, styles.colorCell)}
            key={key}
            onClick={this.cellClick}
            weeklyData={weeklyData}
            label={label}
            userName={userName}
            weekNumber={week}
            year={year}
          />
        );
      }

      return <td key={"empty-cell-" + i} className={styles.td} />;
    });
  };

  render() {
    const { weeklyData, bottom, bottomData } = this.state;
    const {
      loading,
      date,
      employees,
      projects,
      employeeProjectsSavedNotification
    } = this.props;

    const userData = userDataExtractor(weeklyData);

    return (
      <div>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                {weekNumbers.map(([week, year]) =>
                  <th
                    key={week + "-" + year}
                    className={cx(styles.fixedWidth, "clickable")}
                    onClick={this.weekNumberOnClick.bind(this, week, year)}
                  >
                    {week}
                  </th>
                )}
                <th className={cx(styles.th, styles.weekAlignLeft)}>
                  <FormattedMessage id="matrix_week" defaultMessage="Week" />
                </th>
              </tr>
            </thead>
            <tbody>
              {map(userData, (user, normalizedName) =>
                <tr key={normalizedName + "-row"} className={styles.tr}>
                  {this.getWeeklyColors(user)}

                  <td className={styles.employee}>
                    <EmployeeName name={normalizedName} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <BottomContainer
            handleClose={this.bottomCloseClick}
            type={bottom}
            data={bottomData}
            weeklyData={weeklyData}
          />
        </div>
      </div>
    );
  }
}

const isFormEnabled = (loading, date) => {
  const now = moment();

  return (
    !loading &&
    (now.format("GGGG") == date.format("GGGG") &&
      now.format("WW") == date.format("WW"))
  );
};
