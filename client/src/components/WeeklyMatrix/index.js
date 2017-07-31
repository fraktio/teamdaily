import React, { Component } from 'react';
import groupBy from 'lodash/groupBy';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import EmployeeName from 'components/EmployeeName';
import UserWeeklyData from './UserWeeklyData';
import Button from 'components/Button';
import { calculateWeekNumbers } from 'utils/helpers';

import styles from './style.pcss';

const weekNumbers = calculateWeekNumbers(25);

export default class WeeklyMatrix extends Component {
  state = {
    modalData: undefined,
  };

  handleCellClick = data => () => {
    this.setState({
      modalData: data,
    });
  };

  handleModalCloseClick = () => {
    this.setState({
      modalData: undefined,
    });
  };

  getWeeklyColors = person => {
    const groupedEntries = groupBy(person.entries, entry => `${entry.year}-${entry.week}`);

    return weekNumbers.map(({ week, year }, i) => {
      const entries = groupedEntries[`${year}-${week}`];

      if (entries) {
        const label = entries.length > 1 ? entries.length : '';
        const color = last(entries).color;

        return (
          <td
            key={`cell-${i}`}
            className={cx(styles.td, styles.colorCell, color)}
            onClick={this.handleCellClick({ person, entries, week })}
          >
            {label}
          </td>
        );
      } else {
        return <td key={`empty-cell-${i}`} className={styles.td} />;
      }
    });
  };

  handleModalClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { data: { loading, people } } = this.props;
    const { modalData } = this.state;

    if (loading) {
      return null;
    }

    const sortedPeople = sortBy(
      people.filter(person => person.entries.length > 0),
      person => person.name.toLowerCase().split(' ')[1],
    );

    return (
      <div>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                {weekNumbers.map(({ week, year }) =>
                  <th key={week + '-' + year} className={styles.fixedWidth}>
                    {week}
                  </th>,
                )}

                <th className={cx(styles.th, styles.weekAlignLeft)}>
                  <FormattedMessage id="matrix_week" defaultMessage="Week" />
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedPeople.map(person =>
                <tr key={person.id} className={styles.tr}>
                  {this.getWeeklyColors(person)}

                  <td className={styles.employee}>
                    <EmployeeName name={person.name} />
                  </td>
                </tr>,
              )}
            </tbody>
          </table>

          {modalData &&
            <section
              id="modal-container"
              className={styles.modalContainer}
              onClick={this.handleModalCloseClick}
            >
              <div className={styles.modalContent} onClick={this.handleModalClick}>
                <UserWeeklyData {...modalData} />

                <Button className="button-info" onClick={this.handleModalCloseClick}>
                  <FormattedMessage id="matrix_closeModal" defaultMessage="Close" />
                </Button>
              </div>
            </section>}
        </div>
      </div>
    );
  }
}
