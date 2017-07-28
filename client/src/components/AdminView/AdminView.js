import React, { Component } from 'react';
import Button from 'components/Button';
import Masonry from 'react-masonry-component';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './style.pcss';

class AdminView extends Component {
  handleAddProject = e => {
    e.preventDefault();

    const { addProject } = this.props;

    addProject(this.projectName.value).then(() => (this.projectName.value = ''));
  };

  handleDeleteProject = id => () => {
    const { deleteProject } = this.props;

    deleteProject(id);
  };

  addPerson = e => {
    const { addPerson } = this.props;

    e.preventDefault();

    addPerson(this.employeeName.value).then(() => (this.employeeName.value = ''));
  };

  deletePerson = id => () => {
    const { deletePerson } = this.props;

    deletePerson(id);
  };

  render() {
    const { data: { loading, projects, people }, intl } = this.props;

    if (loading) {
      return null;
    }

    const masonryOptions = {
      transitionDuration: 0,
    };

    return (
      <div className={styles.container}>
        <div className={styles.formsContainer}>
          <form onSubmit={this.addPerson} className={styles.form}>
            <input
              placeholder={intl.messages.admin_addEmployee}
              type="text"
              ref={input => (this.employeeName = input)}
            />
            <Button type="submit">
              <FormattedMessage id="admin_addEmployee" defaultMessage="Add Person" />
            </Button>
          </form>

          <form onSubmit={this.handleAddProject} className={styles.form}>
            <input
              placeholder={intl.messages.admin_addProject}
              type="text"
              ref={input => (this.projectName = input)}
            />
            <Button type="submit">
              <FormattedMessage id="admin_addProject" defaultMessage="Add Project" />
            </Button>
          </form>
        </div>

        <hr />
        <p>
          <FormattedMessage id="admin_projects" defaultMessage="Projects" />
        </p>
        <Masonry options={masonryOptions}>
          {projects.map(project =>
            <div key={project.id} className={styles.project}>
              <div>
                {project.name}
              </div>

              <button
                className={styles.deleteButton}
                onClick={this.handleDeleteProject(project.id)}
              >
                <FormattedMessage id="admin_delete" defaultMessage="Delete" />
              </button>
            </div>,
          )}
        </Masonry>

        <hr />
        <p>
          <FormattedMessage id="admin_employees" defaultMessage="Employees" />
        </p>
        <Masonry options={masonryOptions}>
          {people.map(people =>
            <div key={people.id} className={styles.project}>
              <div>
                {people.name}
              </div>

              <button className={styles.deleteButton} onClick={this.deletePerson(people.id)}>
                <FormattedMessage id="admin_delete" defaultMessage="Delete" />
              </button>
            </div>,
          )}
        </Masonry>
      </div>
    );
  }
}

export default injectIntl(AdminView);
