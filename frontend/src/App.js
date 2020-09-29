import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./icons.js";
import PageOne from "./screens/PageOne";
import PageTwo from "./screens/PageTwo";
import "./style.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={PageOne} />
      <Route path="/PageOne/" exact component={PageOne} />
      <Route path="/PageTwo/" exact component={PageTwo} />
    </Router>
  );
}

export default App;
