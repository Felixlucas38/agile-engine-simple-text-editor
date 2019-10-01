import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Modal from "./modal/Modal";
import { editorSelectors, editorOperations } from "./duck";
import { getFormattedWord } from "./utils";
import "./Editor.css";

class Editor extends Component {
  handleSelection(word) {
    const { updateSelection } = this.props;
    updateSelection(word);
  }

  renderWords() {
    const { words } = this.props;

    return Object.values(words).map(word => {
      const { id } = word;
      const props = {
        id,
        onDoubleClick: this.handleSelection.bind(this, word)
      };
      return (
        <Fragment key={id}>
          <span {...props}>{getFormattedWord(word)}</span>
          {` `}
        </Fragment>
      );
    });
  }

  render() {
    return (
      <div className="editor">
        <p className="editor-legend">Double-click on any word to select it</p>
        <div className="editor-content">{this.renderWords()}</div>
        <Modal />
      </div>
    );
  }
}

const mapStateToProps = state => ({ words: editorSelectors.getWords(state) });

const mapDispatchToProps = { ...editorOperations };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
