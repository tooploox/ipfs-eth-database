import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "./home/HomePage";
import { ArchivePage } from "./blog/components/ArchivePage";
import { PostPage } from "./blog/components/PostPage";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/u/:author" component={ArchivePage} />
        <Route exact path="/u/:author/:hash" component={PostPage} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

render(<App />, document.querySelector("#root"));
