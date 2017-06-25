import React from 'react';
import PropTypes from 'prop-types';

import { InputText, Label } from 'monolith-frontend';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  inputChangeHandler(newText) {
    this.setState({
      input: newText,
    });
  }

  saveRef(ref) {
    this.node = ref;
  }

  doSubmit(e) {
    e.preventDefault();
    const task = this.state.input;
    if (!task) {
      return;
    }
    this.props.onTaskSubmit(task);
    this.setState({
      input: '',
    });
    this.node.state.text = '';
  }

  render() {
    return (
      <div className="commentForm vert-offset-top-2">
        <hr />
        <div className="clearfix">
          <form
            className="todoForm form-horizontal"
            onSubmit={e => this.doSubmit(e)}
          >
            <h3>What do you need to do?</h3>
            <div className="form-group">
              <Label
                value="Enter your task here"
                forId="task"
                className="col-md-2 control-label"
              />
              <div className="col-md-10">
                <InputText
                  id="task"
                  ref={node => this.saveRef(node)}
                  className="form-control"
                  value={this.state.input}
                  onTextChange={newText => this.inputChangeHandler(newText)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 col-md-offset-2 text-right">
                <input
                  type="submit"
                  value="Save Item"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

TodoForm.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};
