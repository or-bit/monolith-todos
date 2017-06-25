import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  removeNode(nodeId) {
    this.props.removeNode(nodeId);
  }

  toggleComplete(nodeId) {
    this.props.toggleComplete(nodeId);
  }

  render() {
    const listNodes = this.props.todos.map(listItem => (
      <TodoItem
        key={listItem.id}
        nodeId={listItem.id}
        task={listItem.task}
        complete={listItem.complete}
        removeNode={nodeId => this.removeNode(nodeId)}
        toggleComplete={nodeId => this.toggleComplete(nodeId)}
      />
            ),
        );
    return (
      <ul className="list-group">
        {listNodes}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeNode: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
