import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'monolith-frontend';

export default class TodoItem extends React.Component {
  removeNode(e) {
    e.preventDefault();
    this.props.removeNode(this.props.nodeId);
  }

  toggleComplete(e) {
    e.preventDefault();
    this.props.toggleComplete(this.props.nodeId);
  }

  render() {
    let classes = 'list-group-item clearfix';
    if (this.props.complete === 'true') {
      classes = `${classes} list-group-item-success`;
    }
    return (
      <li className={classes}>
        {this.props.task}
        <div className="pull-right" role="group">
          <Button
            text="&#x2713;"
            callback={e => this.toggleComplete(e)}
            className="btn btn-xs btn-success img-circle"
          />
          <Button
            text="&#xff38;"
            callback={e => this.removeNode(e)}
            className="btn btn-xs btn-danger img-circle"
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  complete: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired,
};
