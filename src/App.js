import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Import pages
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import OpenTasksPage from './pages/opentasks/OpenTasks';
import Header from "./components/header/Header";

function App() {

    // State management
    const [navDrawer, toggleNavDrawer] = React.useState(false);
    const [auth, setAuth] = React.useState(true);

    return (
        <>
            {auth && <Header
                page="Openstaande taken"
                highPrioNumber="1"
                mediumPrioNumber="2"
                lowPrioNumber="3"
                openTasksNumber="4"
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />}
            <Switch>
                <Route exact path="/">
                    <LoginPage/>
                </Route>
                <Route path="/registreren">
                    <RegisterPage/>
                </Route>
                <Route path="/openstaande-taken">
                    <OpenTasksPage
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                    />
                </Route>
            </Switch>
        </>
    );
}

export default App;