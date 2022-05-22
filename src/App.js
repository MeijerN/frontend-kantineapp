import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Import pages
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import OpenTasksPage from './pages/opentasks/OpenTasks';

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <LoginPage/>
            </Route>
            <Route path="/registreren">
                <RegisterPage/>
            </Route>
            <Route path="/openstaande-taken">
                <OpenTasksPage/>
            </Route>
        </Switch>
    );
}

export default App;