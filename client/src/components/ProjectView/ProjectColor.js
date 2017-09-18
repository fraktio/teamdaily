import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Select from 'react-select';

import Button from 'components/Button';
import styles from './style.pcss';
import statusFormStyles from '../StatusForm/style.pcss';

const COLOR_RED = 'red';
const COLOR_YELLOW = 'yellow';
const COLOR_GREEN = 'green';
const COLOR_BLUE = 'blue';

const ProjectColor = props => {
  const { color, entries, intl, saveProjectColor } = props;

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
    options={options}
    placeholder="Status"
    value={options[selectedOption]}
  />;
}

export default injectIntl(ProjectColor);
