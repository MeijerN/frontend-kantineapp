import React, {useContext} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";

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
import AddTask from "./pages/addTask/AddTask";
import EditTask from "./pages/editTask/EditTask";
import Personnel from "./pages/personnel/Personnel";

function App() {

    //Context management
    const {isAuth} = useContext(AuthContext);

    // State management
    const [navDrawer, toggleNavDrawer] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState("Openstaande taken");
    return (
        <>
            {isAuth && <Header
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
                    <LoginPage
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                    />
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
                <Route path="/openstaande-taken/toevoegen">
                    <AddTask
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route exact path="/openstaande-taken/:id">
                    <TaskDetails
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </Route>
                <Route path="/openstaande-taken/:id/bewerken">
                    <EditTask
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
                <Route path="/personeel">
                    <Personnel
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
// Personeel page afmaken
// Apart component maken voor afgeronde taken? Zodat deze niet aanklikbaar is

// TE IMPLEMENTEREN FUNCTIONALITEIT
// TODO: MANAGERS VRIJWILLIGERS VERWIJDEREN BIJ STATISTIEKEN EN DE STATUS MANAGER GEVEN

// IN DE GATEN HOUDEN:
// TODO: Beslis of je context of state gaat gebruik van door de navbar
// TODO: Bekijk of het InputField component nog gebruikt wordt, zo niet dan op het LAATST verwijderen