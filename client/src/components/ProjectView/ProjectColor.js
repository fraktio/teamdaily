import React from 'react';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Select from 'react-select';

import * as colors from '../../colors';

import styles from './style.pcss';

const ProjectColorOption = props => {
  const { value, label } = props;

  return (
    <div className={styles.projectColorOption}>
      <span className={classnames(styles.projectColorOptionBall, value)} />
      <span>
        {label}
      </span>
    </div>
  );
};

const ProjectColor = props => {
  const { color, saveProjectColor, intl } = props;

  const options = [
    {
      value: colors.COLOR_BLUE,
      label: intl.formatMessage({ id: 'project_passive', defaultMessage: 'Passive' }),
    },
    {
      value: colors.COLOR_GREEN,
      label: intl.formatMessage({ id: 'project_good', defaultMessage: 'Good' }),
    },
    {
      value: colors.COLOR_YELLOW,
      label: intl.formatMessage({ id: 'project_hurry', defaultMessage: 'Hurry' }),
    },
    {
      value: colors.COLOR_RED,
      label: intl.formatMessage({ id: 'project_understaffed', defaultMessage: 'Understaffed' }),
    },
  ];

  const selectedOption = options.findIndex(option => option.value === color);

  const save = selected => {
    selected ? saveProjectColor(selected.value) : saveProjectColor(null);
  };

  return (
    <Select
      className="project-color-select"
      name="project-color"
      onChange={save}
      optionRenderer={ProjectColorOption}
      options={options}
      placeholder={intl.formatMessage({ id: 'project_status', defaultMessage: 'Status' })}
      value={options[selectedOption]}
    />
  );
};

export default injectIntl(ProjectColor);
