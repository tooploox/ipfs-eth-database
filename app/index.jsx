import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "./home/HomePage";
import { ArchivePage } from "./blog/ArchivePage";
import { PostPage } from "./blog/PostPage";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/u/:address" component={ArchivePage} />
        <Route exact path="/u/:address/:hash" component={PostPage} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

render(<App />, document.querySelector("#root"));
