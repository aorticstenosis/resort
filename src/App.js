//import dependency
import React from "react";
import { Route, Link, Router, Switch } from "react-router-dom";
//import custom components
import "./App.css";
import Home from "./pages/Home";
import Rooms from "./pages/Room";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import NavBar from "./component/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:HaobinCui" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
