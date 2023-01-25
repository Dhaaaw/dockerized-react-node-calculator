import React from "react";

const computationScreen = (props) => (
  <div data-testid="computation-screen" className="computation-screen">
    {props.children}
  </div>
);

export default computationScreen;