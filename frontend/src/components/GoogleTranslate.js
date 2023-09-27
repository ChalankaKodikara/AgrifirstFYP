import React, { Component } from "react";

class GoogleTranslate extends Component {
  googleTranslateElementInit() {
    //alert("test2")
    /* eslint-disable no-new */
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "pt",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
  }

  componentDidMount() {
    // alert("test")

    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = this.googleTranslateElementInit;
  }

  render() {
    return (
      // <script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
      <div id="google_translate_element"></div>
    );
  }
}

export default GoogleTranslate;
