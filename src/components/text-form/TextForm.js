import React, { Component } from "react";
import { connect } from "react-redux";
import { editorOperations } from "../editor/duck";
import "./TextForm.css";

class TextForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;

    if (!value) return;

    onSubmit(value);
    this.setState({ value: "" });
  }

  handleInputChange(e) {
    const value = e.currentTarget.value;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const placeholder = "Type here to change text...";
    return (
      <form onSubmit={this.handleSubmit} className="text-form">
        <input
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={this.handleInputChange}
        />
        <button className="common-button" type="submit">
          Replace Text
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  onSubmit: editorOperations.updateText
};

export default connect(
  null,
  mapDispatchToProps
)(TextForm);
