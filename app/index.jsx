import React from "react";
import { render } from "react-dom";
import { HomePage } from "./home/HomePage";

function App() {
  return (
    <HomePage />
  );
}

render(<App />, document.querySelector("#root"));
