import React from 'react';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Select from 'react-select';

import styles from './style.pcss';

const COLOR_RED = 'red';
const COLOR_YELLOW = 'yellow';
const COLOR_GREEN = 'green';
const COLOR_BLUE = 'blue';

const ProjectColorOption = props => {
  const { value, label } = props;

  return (
    <div className={styles.projectColorOption}>
     <span className={classnames(styles.projectColorOptionBall, value)} />
     <span>{label}</span>
   </div>
  );
}

const ProjectColor = props => {
  const { color, saveProjectColor } = props;

  const options = [
    { value: COLOR_BLUE, label: 'Shred' },
    { value: COLOR_GREEN, label: 'Good' },
    { value: COLOR_YELLOW, label: 'Alarm' },
    { value: COLOR_RED, label: 'Panic' },
  ];

  const selectedOption = options.findIndex(option => option.value === color);

  const save = selected => {
    selected ? saveProjectColor(selected.value) : saveProjectColor(null);
  };

  return <Select
    className="project-color-select"
    name="project-color"
    onChange={save}
    optionRenderer={ProjectColorOption}
    options={options}
    placeholder="Status"
    value={options[selectedOption]}
  />;
}

export default injectIntl(ProjectColor);
