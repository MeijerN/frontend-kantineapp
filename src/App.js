import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Import pages
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import OpenTasksPage from './pages/openTasks/OpenTasks';
import Header from "./components/header/Header";
import TimeRegistration from "./pages/timeRegistration/TimeRegistration";
import Profile from "./pages/profile/Profile";
import Statistics from "./pages/statistics/Statistics";
import EditProfile from "./pages/editProfile/EditProfile";
import TaskDetails from "./pages/taskDetails/TaskDetails";

function App() {

    // State management
    const [navDrawer, toggleNavDrawer] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState("Openstaande taken");
    const [auth, setAuth] = React.useState(true);

    return (
        <>
            {auth && <Header
                page={currentPage}
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
                <Route exact path="/openstaande-taken">
                    <OpenTasksPage
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route path="/openstaande-taken/:id">
                    <TaskDetails
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route path="/urenregistratie">
                    <TimeRegistration
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route path="/statistieken">
                    <Statistics
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route exact path="/profiel">
                    <Profile
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route path="/profiel-wijzigen">
                    <EditProfile
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
            </Switch>
        </>
    );
}

export default App;

//WAAR WAS IK GEBLEVEN?
//TODO: Add task pagina maken
//TODO: Edit task pagina maken

// TE IMPLEMENTEREN FUNCTIONALITEIT
// TODO: MANAGERS VRIJWILLIGERS VERWIJDEREN BIJ STATISTIEKEN EN DE STATUS MANAGER GEVEN

// IN DE GATEN HOUDEN:
// TODO: Beslis of je context of state gaat gebruik van door de navbar