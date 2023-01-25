import React from "react";

const resultScreen = (props) => (
  <div data-testid="result-screen" className="result-screen">
    {props.children}
  </div>
);

export default resultScreen;