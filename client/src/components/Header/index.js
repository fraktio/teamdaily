import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import WeekSelection from 'components/WeekSelection'

import styles from './style.pcss';

export default class Header extends Component {
  render () {
    const { renderWeekSelector, date, onChange } = this.props

    return (
      <header className={styles.container}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}><h1>TeamDaily</h1></Link>
          <nav className={styles.nav}>
            <Link
              to="/matrix"
              className={styles.navItem}
            >
              <FormattedMessage 
                  id='header_matrix'
                  defaultMessage='Matrix'
              />
            </Link>
            <Link
              to="/people"
              className={styles.navItem}
            >
              <FormattedMessage 
                  id='header_people'
                  defaultMessage='People'
              />
            </Link>
            <Link
              to="/projects"
              className={styles.navItem}
            >
              <FormattedMessage 
                  id='header_projects'
                  defaultMessage='Projects'
              />
            </Link>
            <Link
              to="/week"
              className={styles.navItem}
            >
              <FormattedMessage 
                  id='header_week'
                  defaultMessage='Status Form'
              />
            </Link>
            <Link
              to="/admin"
              className={styles.navItem}
            >
              <FormattedMessage 
                  id='header_admin'
                  defaultMessage='Admin Panel'
              />
            </Link>
          </nav>
        </div>
        {renderWeekSelector &&
          <WeekSelection weekNumberAndYear={date.format('WW-GGGG')} onChange={onChange}/>
        }
      </header>
    )
  }
};
