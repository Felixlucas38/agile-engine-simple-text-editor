import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import { editorOperations, editorSelectors } from "../duck";
import { FORMAT_OPTIONS } from "../config";
import "./ControlPanel.css";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      showColorPicker: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
  }

  handleClick(e) {
    const {
      word: { id },
      updateFormat
    } = this.props;
    const format = e.currentTarget.attributes.id.value;
    console.log({ e, format });
    updateFormat({ id, format });
  }

  handleColor({ hex: color }) {
    const {
      updateColor,
      word: { id }
    } = this.props;
    updateColor({ color, id });
  }

  toggleColorPicker() {
    const { showColorPicker } = this.state;
    this.setState({ showColorPicker: !showColorPicker });
  }

  render() {
    const { word } = this.props;
    const { showColorPicker, color } = this.state;
    const { BOLD, ITALIC, UNDERLINE } = FORMAT_OPTIONS;
    return (
      <div className="control-panel">
        <div className="format-actions">
          <button
            onClick={this.handleClick}
            type="button"
            className={`${word.format.find(f => f === BOLD) && "active"}`}
            id={BOLD}
          >
            <b>B</b>
          </button>
          <button
            onClick={this.handleClick}
            type="button"
            className={`${word.format.find(f => f === ITALIC) && "active"}`}
            id={ITALIC}
          >
            <i>I</i>
          </button>
          <button
            onClick={this.handleClick}
            type="button"
            className={`${word.format.find(f => f === UNDERLINE) && "active"}`}
            id={UNDERLINE}
          >
            <u>U</u>
          </button>
          <button
            onClick={this.toggleColorPicker}
            className={`${showColorPicker && "active"}`}
          >
            <b><i>Color</i></b>
          </button>
          {showColorPicker && (
            <div className="color-picker">
              <SketchPicker
                color={color}
                onChange={color => this.setState({ color })}
                onChangeComplete={this.handleColor}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  word: editorSelectors.getSelectedWord(state)
});

const mapDispatchToProps = {
  updateFormat: editorOperations.updateFormat,
  updateColor: editorOperations.updateColor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
