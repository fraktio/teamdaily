import React, { Component } from 'react';
import classnames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import styles from './style.pcss';
import statusFormStyles from '../StatusForm/style.pcss';

const COLOR_RED = 'red';
const COLOR_YELLOW = 'yellow';
const COLOR_GREEN = 'green';
const COLOR_BLUE = 'blue';

class ProjectColor extends Component {
  save = value => {
    this.props.saveProjectColor(value);
  };

  red = () => this.save(COLOR_RED);
  green = () => this.save(COLOR_GREEN);
  yellow = () => this.save(COLOR_YELLOW);
  blue = () => this.save(COLOR_BLUE);

  render() {
    const { color, entries, intl } = this.props;

    return (
      <div className={classnames(statusFormStyles.buttonGroup, styles.colors)}>
        <Button
          type="button"
          onClick={() => this.save(COLOR_BLUE)}
          active={color === COLOR_BLUE}
          inactive={color !== COLOR_BLUE}
          className="blue"
          title={intl.messages.project_maintenance}
        >
          <FormattedMessage id="project_maintenance" defaultMessage="Maintenance" />
        </Button>
        <Button
          type="button"
          onClick={() => this.save(COLOR_GREEN)}
          active={color === COLOR_GREEN}
          inactive={color !== COLOR_GREEN}
          className="green"
          title={intl.messages.project_good}
        >
          <FormattedMessage id="project_good" defaultMessage="Good" />
        </Button>
        <Button
          type="button"
          onClick={() => this.save(COLOR_YELLOW)}
          active={color === COLOR_YELLOW}
          inactive={color !== COLOR_YELLOW}
          className="yellow"
          title={intl.messages.project_challenges}
        >
          <FormattedMessage id="project_challenges" defaultMessage="Challenges" />
        </Button>
        <Button
          type="button"
          onClick={() => this.save(COLOR_RED)}
          active={color === COLOR_RED}
          inactive={color !== COLOR_RED}
          className="red"
          title={intl.messages.project_panic}
        >
          <FormattedMessage id="project_panic" defaultMessage="Panic" />
        </Button>
      </div>
    );
  }
}

export default injectIntl(ProjectColor);
