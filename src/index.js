import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./Components/app";
import Login from "./Components/Login";
// import Header from "./functional-components/Header";
import Footer from "./functional-components/Footer";
import ImagePageComp from "./Components/ImagePageComp";
import SignupComp from "./Components/SignupComp";
const route = (
  <BrowserRouter>
    <div>
      {/* <Header head={"Photo-Gallery App"} /> */}
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/'} component={App} exact={true} />
        <Route path={process.env.PUBLIC_URL + '/login'} component={Login} exact={true} />
        <Route path={process.env.PUBLIC_URL + '/image'} component={ImagePageComp} exact={true} />
        <Route path={process.env.PUBLIC_URL + '/signup'} component={SignupComp} exact={true} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

ReactDOM.render(route, document.getElementById("root"));
