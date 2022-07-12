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
import NavigationDrawer from "./components/navigationDrawer/NavigationDrawer";

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
            {isAuth && <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />}
            <Switch>
                <Route exact path="/">
                    {!isAuth ?
                        <LoginPage
                            toggleNavdrawer={toggleNavDrawer}
                        /> : <Redirect to="/openstaande-taken"/>
                    }
                </Route>
                <Route path="/registreren">
                    {!isAuth ?
                        <RegisterPage
                        /> : <Redirect to="/openstaande-taken"/>
                    }
                    <RegisterPage/>
                </Route>
                <PrivateRoute exact path="/openstaande-taken" isAuth={isAuth}>
                    <OpenTasksPage
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/openstaande-taken/toevoegen" isAuth={isAuth}>
                    <AddTask
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute exact path="/openstaande-taken/:title" isAuth={isAuth}>
                    <TaskDetails
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/openstaande-taken/:title/bewerken" isAuth={isAuth}>
                    <EditTask
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/urenregistratie" isAuth={isAuth}>
                    <TimeRegistration
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/personeel" isAuth={isAuth}>
                    <Personnel
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/statistieken" isAuth={isAuth}>
                    <Statistics
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute exact path="/profiel" isAuth={isAuth}>
                    <Profile
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
                <PrivateRoute path="/profiel-wijzigen" isAuth={isAuth}>
                    <EditProfile
                        setCurrentPage={setCurrentPage}
                    />
                </PrivateRoute>
            </Switch>
        </>
    );
}

export default App;

//WAAR WAS IK GEBLEVEN?

// TE IMPLEMENTEREN FUNCTIONALITEIT
// TODO: sort implementeren in statistieken pagina: gebruikers moeten standaard gesorteerd zijn in tabel --> personeel: gebruikers moeten standaard gesorteerd zijn in tabel
// TODO: Users moeten zichzelf kunnen verwijderen in profiel i.p.v. de manager

// IN DE GATEN HOUDEN:
// TODO: Bekijk of het InputField component nog gebruikt wordt, zo niet dan op het LAATST verwijderen
// TODO: helper functies maken van defaultValues in EditTask.js
// TODO: in de states waar DATA gebruikt is misschien iets duidelijkere naam kiezen?