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
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}><h1>TeamDaily</h1></Link>
          <nav className={styles.nav}>
            <Link
              to="/matrix"
              className={styles.navItem}
              activeClassName={styles.active}
            >
              Matriisi
            </Link>
            <Link
              to="/people"
              className={styles.navItem}
              activeClassName={styles.active}
            >
              Ihmiset
            </Link>
            <Link
              to="/projects"
              className={styles.navItem}
              activeClassName={styles.active}
            >
              Projektit
            </Link>
            <Link
              to="/week"
              className={styles.navItem}
              activeClassName={styles.active}
            >
              Kirjaus
            </Link>
            <Link
              to="/admin"
              className={styles.tab}
              activeClassName={styles.activeTab}
            >
              Admin
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
