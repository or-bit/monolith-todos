import React from 'react';

import { Button, GenericBubble, WebNotification } from 'monolith-frontend';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

import io from 'socket.io-client';

export default class TodoBubble extends GenericBubble {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:5000');

    this.socket.on('todosResponse', todosFromDB => this.setTodoStateAndPersist(todosFromDB));
    this.socket.on('updatedTodos', todosFromDB => this.setTodoState(todosFromDB));

    this.state = {
      alive: true,
      todos: [],
    };
  }

  componentDidMount() {
      this.loadFromBackend();
  }

  loadFromBackend() {
      this.socket.emit('todos');
  }

  static generateId() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  setTodoState(todos) {
    this.setState({ todos });
    new WebNotification('To-do updated').notify();
  }

  setTodoStateAndPersist(todos) {
    this.setState({ todos });
    this.socket.emit('update', todos);
  }

  handleNodeRemoval(nodeId) {
    let todos = this.state.todos;
    todos = todos.filter(el => el.id !== nodeId);
    this.setTodoStateAndPersist(todos);
  }

  handleSubmit(task) {
    let todos = this.state.todos;
    const id = TodoBubble.generateId().toString();
    const complete = 'false';
    todos = todos.concat([{ id, task, complete }]);
    this.setTodoStateAndPersist(todos);
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
    this.setTodoStateAndPersist(todos);
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
        <Button text="Refresh" className="btn btn-info" callback={() => this.loadFromBackend()} />
        <TodoForm onTaskSubmit={task => this.handleSubmit(task)} />
      </div>
    );
  }
}
