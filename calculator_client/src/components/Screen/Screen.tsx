import ResultScreen from "./ResultScreen";
import ComputationScreen from "./ComputationScreen";

const screen = (props:any) => (
  <section className="screen">
    <ResultScreen>{props.result}</ResultScreen>
    <ComputationScreen>{props.equation}</ComputationScreen>
  </section>
);

export default screen;