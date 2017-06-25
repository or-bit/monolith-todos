import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import TodoBubble from './TodoBubble';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoBubble time={0} empty />
      </div>
    );
  }
}

export default App;
