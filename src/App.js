import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import getMockText from "./text.service";
import Editor from "./components/editor/Editor";
import TextForm from "./components/text-form/TextForm";
import { editorOperations, editorSelectors } from "./components/editor/duck";

class App extends Component {
  componentDidMount() {
    const { shouldInitialize } = this.props;
    if (shouldInitialize) this.getText();
  }

  getText() {
    const { updateText } = this.props;
    getMockText().then(result => {
      updateText(result);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Wrapper">
          <header>
            <span>Simple Text Editor - Felix Lucas</span>
          </header>
          <main>
            <Editor />
            <TextForm />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shouldInitialize: editorSelectors.shouldInitialize(state)
});

const mapDispatchToProps = { updateText: editorOperations.updateText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
