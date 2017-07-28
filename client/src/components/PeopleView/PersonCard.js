import React, { PureComponent } from 'react';

import styles from './style.pcss';
import FlaggedIcon from 'assets/flagged.svg';

export default class PersonCard extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    const { name, projects, entries } = this.props;

    const latestEntry = entries.length ? entries[0] : undefined;
    const color = latestEntry ? latestEntry.color : 'empty';
    const isFlagged = latestEntry ? latestEntry.flagged : false;

    return (
      <div className={styles.masonryCard} onClick={this.handleClick}>
        <div className={`${styles.masonryCardInner} ${color}`}>
          <h4 className={styles.employeeTitle}>
            {name}
          </h4>

          {isFlagged && <img className={styles.flagged} src={FlaggedIcon} />}
          {latestEntry &&
            <p>
              {latestEntry.message}
            </p>}

          <div className={styles.projectsContainer}>
            {projects &&
              projects.map((project, i) =>
                <button className={styles.project} key={`${project.id}-${i}`}>
                  {project.name}
                </button>,
              )}
          </div>
        </div>
      </div>
    );
  }
}
