import React from 'react';

export default class Input extends React.Component {
  state = {
    value: ''
  }

  onChangeHandler = e => {
    this.setState({value: e.target.value});
  };

  render() {
    return (
      <input
        type={this.props.type}
        placeholder={this.props.placeHolder}
        value={this.state.value}
        onChange={this.onChangeHandler}
      />
    );
  }
}
