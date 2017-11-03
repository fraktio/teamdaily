import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import WeekSelection from 'components/WeekSelection';
import classnames from 'classnames';
import auth from 'services/auth';

import styles from './style.pcss';

export default class Header extends Component {
  render() {
    const { renderWeekSelector, date, onNextWeek, onPrevWeek } = this.props;

    return (
      <header className={styles.container}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            <h1>TeamDaily</h1>
          </Link>
          <nav className={styles.nav}>
            <Link to="/matrix" className={styles.navItem}>
              <FormattedMessage id="header_matrix" defaultMessage="Matrix" />
            </Link>
            <Link to="/people" className={styles.navItem}>
              <FormattedMessage id="header_people" defaultMessage="People" />
            </Link>
            <Link to="/projects" className={styles.navItem}>
              <FormattedMessage id="header_projects" defaultMessage="Projects" />
            </Link>
            <Link to="/week" className={styles.navItem}>
              <FormattedMessage id="header_week" defaultMessage="Status Form" />
            </Link>
            <Link to="/admin" className={styles.navItem}>
              <FormattedMessage id="header_admin" defaultMessage="Admin Panel" />
            </Link>
            {auth.isEnabled &&
              <a onClick={auth.logout} className={classnames(styles.navItem, styles.navItemRight)}>
                <FormattedMessage id="header_logout" defaultMessage="Logout" />
              </a>}
          </nav>
        </div>

        {renderWeekSelector &&
          <WeekSelection date={date} onNextWeek={onNextWeek} onPrevWeek={onPrevWeek} />}
      </header>
    );
  }
}
