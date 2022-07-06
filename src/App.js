import React, {useContext} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

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
                    {!isAuth ?
                        <LoginPage
                            toggleNavDrawer={toggleNavDrawer}
                        /> : <Redirect to="/openstaande-taken"/>
                    }
                </Route>
                <Route path="/registreren">
                    {!isAuth ?
                        <RegisterPage
                            toggleNavDrawer={toggleNavDrawer}
                        /> : <Redirect to="/openstaande-taken"/>
                    }
                    <RegisterPage/>
                </Route>
                <PrivateRoute exact path="/openstaande-taken" isAuth={isAuth}>
                    <OpenTasksPage
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/openstaande-taken/toevoegen" isAuth={isAuth}>
                    <AddTask
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute exact path="/openstaande-taken/:id" isAuth={isAuth}>
                    <TaskDetails
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/openstaande-taken/:id/bewerken" isAuth={isAuth}>
                    <EditTask
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/urenregistratie" isAuth={isAuth}>
                    <TimeRegistration
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/personeel" isAuth={isAuth}>
                    <Personnel
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/statistieken" isAuth={isAuth}>
                    <Statistics
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute exact path="/profiel" isAuth={isAuth}>
                    <Profile
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/profiel-wijzigen" isAuth={isAuth}>
                    <EditProfile
                        navDrawer={navDrawer}
                        toggleNavDrawer={toggleNavDrawer}
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
            </Switch>
        </>
    );
}

export default App;

//WAAR WAS IK GEBLEVEN?
//TODO: profielfoto uploaden

// TE IMPLEMENTEREN FUNCTIONALITEIT
// TODO: Users moeten zichzelf kunnen verwijderen in profiel i.p.v. de manager

// IN DE GATEN HOUDEN:
// TODO: Bekijk of het InputField component nog gebruikt wordt, zo niet dan op het LAATST verwijderen
// TODO: helper functies maken van defaultValues in EditTask.js