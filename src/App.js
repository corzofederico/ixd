import React, { Suspense } from "react";
import { Route, Switch } from "wouter";
import 'App.css';
import { UserContextProvider } from "userContext";

import Menu from 'components/Menu';
import Comunidad from 'pages/Comunidad';
import Log from 'pages/Log';
import Profile from 'pages/Profile';
//import Proyectos from 'pages/Proyectos';

const HomePage = React.lazy(() => import("pages/Home"));

export default function App() {
  return (
    <UserContextProvider>
        <Menu />
        <div id="cont">
          <Suspense fallback={<b>Loading...</b>}>
            <Switch>
              <Route component={HomePage} path="/" />
              <Route component={Log} path="/log/:type" />
              <Route component={Comunidad} path="/comunidad/:search?" />
              <Route component={Profile} path="/user/:usr" />
              <Route component={Profile} path="/project/:proj" />
              <Route>404, Not Found!</Route>
            </Switch>
          </Suspense>
        </div>
    </UserContextProvider>
  );
}