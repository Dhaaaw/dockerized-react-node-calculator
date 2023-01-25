import React, { useState } from "react";
import axios from "axios";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

interface CalculatorState {
  equation: string;
  result: number | string;
}

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    equation: "",
    result: 0,
  });
  const [block, setBlock] = useState<boolean>(true);

  const onButtonPress = (event: React.MouseEvent<HTMLButtonElement>) => {
    let equation = state.equation;
    const pressedButton = event.currentTarget.innerHTML;

    if (pressedButton === "C") {
      setBlock(true);
      return clear();
    } else if (
      (pressedButton >= "0" && pressedButton <= "9") ||
      pressedButton === "."
    ) {
      equation += pressedButton;
      setBlock(false);
    } else if (["+", "-", "*", "/"].indexOf(pressedButton) !== -1) {
      if (!block){ equation += " "+pressedButton+" ";
      setBlock(true);}
    } else if (pressedButton === "=") {
      axios

        .post("/calculator", {
          equation,
        })
        .then((response) => {
          const res = Number.isInteger(response.data)
            ? response.data
            : response.data.toFixed(3);
            setState({ ...state, result:res });
        })
        .catch((error) => {
          setState({ ...state, result:error });

        });
    } else {
      equation = equation.trim();
      equation = equation.slice(0, equation.length - 1);
      setState({ ...state });
      setBlock(false);
      }
    setState({ ...state, equation:equation });
  };

  const clear = () => {
    setState({ equation:"", result:0 });
  }

  return (
    <main className="calculator">
      <Screen equation={state.equation} result={state.result} />
      <Keypad onButtonPress={onButtonPress} />
    </main>
  );
}

export default Calculator;
