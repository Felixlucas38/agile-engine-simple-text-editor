import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { editorSelectors, editorOperations } from "../duck";
import { getFormattedWord } from "../utils";
import ControlPanel from "../control-panel/ControlPanel";
import "./Modal.css";

class Modal extends Component {
  componentDidMount() {
    // TODO: Adjust localStorage and remove CDM
    this.props.onClose();
  }

  renderSynonyms() {
    const {
      replaceWord,
      word: { id, synonyms }
    } = this.props;

    if (!synonyms || synonyms.length === 0) return null;

    return (
      <Fragment>
        <h3>Synonyms</h3>
        <ul>
          {synonyms.map(syn => (
            <li>
              <button onClick={() => replaceWord({ id, word: syn.word })}>
                {syn.word}
              </button>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }

  render() {
    const { word, onClose } = this.props;

    if (!word) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <ControlPanel />
          <div className="modal-word">{getFormattedWord(word)}</div>
          <div className="synonyms">{this.renderSynonyms()}</div>
          <button className="common-button close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  word: editorSelectors.getSelectedWord(state)
});

const mapDispatchToProps = {
  fetchSynonyms: editorOperations.fetchSynonyms,
  replaceWord: editorOperations.replaceWord,
  onClose: editorOperations.clearSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
