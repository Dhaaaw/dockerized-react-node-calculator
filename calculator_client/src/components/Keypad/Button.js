import React from "react";

const button = (props) => {
  const classes = ["btn"];

  if (typeof props !== "undefined" && typeof props.type !== "undefined")
    classes.push("btn--" + props.type);
  return (
    <button
      data-testid={props.children === "0" ? "zero" : ""}
      className={classes.join(" ")}
      onClick={props.onButtonPress}
    >
      {props.children}
    </button>
  );
};

export default button;