import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import Sort from "./components/Sort";
import Navigation from "./components/Navigation";
import { HashRouter, Route } from "react-router-dom";
import "./index.css";

//render everything in App as html code in the body of index.html
ReactDOM.render(
    <HashRouter basename="/">
        <Route exact path="/" render={() => <Navigation Component={Home} activeKey="#/"/>}/>
        <Route path="/sort" render={() => <Navigation Component={Sort} activeKey="#/sort"/>}/>
    </HashRouter>, 
    document.getElementById("root")
);