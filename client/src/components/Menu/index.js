import React from 'react';
import { Link } from 'react-router-dom';

import styles from './style.pcss';

export default () =>
  <div className={styles.container}>
    <div className={styles.menu}>
      <h1 className={styles.heading}>TeamDaily</h1>

      <Link to="/week" className={styles.menuButton}>
        Enter weekly status (legacy)
      </Link>
      <Link to="/matrix" className={styles.menuButton}>
        Matrix view
      </Link>
      <Link to="/projects" className={styles.menuButton}>
        Project matrix
      </Link>
    </div>
  </div>;
