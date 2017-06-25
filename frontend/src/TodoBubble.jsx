import React from 'react';

import { GenericBubble } from 'monolith-frontend';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';


export default class TodoBubble extends GenericBubble {
  constructor(props) {
    super(props);

    const todos = [
      {
        id: '00001',
        task: 'Completed sample task',
        complete: 'true',
      },
      {
        id: '00002',
        task: 'Unfinished sample task',
        complete: 'false',
      },
    ];

    this.state = {
      alive: true,
      todos: props.empty ? [] : todos,
    };
  }

  static generateId() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  handleNodeRemoval(nodeId) {
    let todos = this.state.todos;
    todos = todos.filter(el => el.id !== nodeId);
    this.setState({ todos });
  }

  handleSubmit(task) {
    let todos = this.state.todos;
    const id = TodoBubble.generateId().toString();
    const complete = 'false';
    todos = todos.concat([{ id, task, complete }]);
    this.setState({ todos });
  }

  handleToggleComplete(nodeId) {
    let todos = this.state.todos;
    todos = todos.map((todo) => {
      const newTodo = todo;
      if (todo.id === nodeId) {
        newTodo.complete = todo.complete === 'true' ? 'false' : 'true';
      }
      return newTodo;
    });
    this.setState({ todos });
  }

  aliveRender() {
    return (
      <div className="well">
        <h1 className="vert-offset-top-0">To-do</h1>
        <TodoList
          todos={this.state.todos}
          removeNode={nodeId => this.handleNodeRemoval(nodeId)}
          toggleComplete={nodeId => this.handleToggleComplete(nodeId)}
        />
        <TodoForm onTaskSubmit={task => this.handleSubmit(task)} />
      </div>
    );
  }
}
