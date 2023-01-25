import React from "react";
import axios from "axios";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

class Calculator extends React.Component {
  state = {
    equation: "",
    result: 0,
    block: true,
  };


  onButtonPress = (event) => {
    let self = this;
    let equation = this.state.equation;
    const pressedButton = event.target.innerHTML;

    if (pressedButton === "C") {
      this.setState({ block: true });
      return this.clear();
    } else if (
      (pressedButton >= "0" && pressedButton <= "9") ||
      pressedButton === "."
    ) {
      equation += pressedButton;
      this.setState({ block: false });
    } else if (["+", "-", "*", "/"].indexOf(pressedButton) !== -1) {
      if (!this.state.block) equation += pressedButton;
      this.setState({ block: true });
    } else if (pressedButton === "=") {
      axios
        .post("/calculator", {
          equation,
        })
        .then(function (response) {
          const res = Number.isInteger(response.data.result.result)
            ? response.data.result.result
            : response.data.result.result.toFixed(3);
          self.setState({ result: res });
        })
        .catch(function (error) {
          self.setState({ result: "Error" });
        });
    } else {
      equation = equation.trim();
      equation = equation.slice(0, equation.length - 1);
      this.setState({ block: false });
    }

    this.setState({ equation: equation });
  };

  clear() {
    this.setState({ equation: "", result: 0 });
  }

  render() {
    return (
      <main className="calculator">
        <Screen equation={this.state.equation} result={this.state.result} />
        <Keypad onButtonPress={this.onButtonPress} />
      </main>
    );
  }
}

export default Calculator;