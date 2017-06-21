import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import WeekSelection from 'components/WeekSelection'

import styles from './style.pcss';

export default class Header extends Component {
  render () {
    const { renderWeekSelector, date, onChange } = this.props

    return (
      <header className={styles.container}>
          <Link to="/" className={styles.logo}><h1>TeamDaily</h1></Link>
          <nav className={styles.tabs}>
            <Link
              to="/matrix"
              className={styles.tab}
              activeClassName={styles.activeTab}
            >
              Matriisi
            </Link>
            <Link
              to="/people"
              className={styles.tab}
              activeClassName={styles.activeTab}
            >
              Ihmiset
            </Link>
            <Link
              to="/projects"
              className={styles.tab}
              activeClassName={styles.activeTab}
            >
              Projektit
            </Link>
            <Link
              to="/week"
              className={styles.tab}
              activeClassName={styles.activeTab}
            >
              Kirjaus
            </Link>
          </nav>
          <div className={styles.weekSelector}>
            { renderWeekSelector &&
              <div className={styles.weekSelector}>
                <WeekSelection weekNumberAndYear={date.format('WW-GGGG')} onChange={onChange}/>
              </div>
            }
          </div>
      </header>
    )
  }
};
