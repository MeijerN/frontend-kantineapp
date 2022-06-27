import React, {useContext, useEffect} from 'react';
import styles from './Login.module.css';
import InputField from '../../components/inputField/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

function LoginPage({navDrawer, toggleNavDrawer}) {

    // Context management

    //TIJDELIJKE LOGIN VOOR ONTWIKKELING
    const history = useHistory();
    function handleOnSubmit() {
        history.push("/openstaande-taken")
    }

    // Close navbar after user logout
    useEffect(() => {
        toggleNavDrawer(false);
    }, [])

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>KantineApp</h1>
            <div className={styles["form-card"]}>
                <form className={styles.form} onSubmit="">
                    <InputField
                        type="text"
                        placeholder="Email"
                        stylingClass="login-registration"
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                        stylingClass="login-registration"
                    />
                    <SubmitButton
                        text="Inloggen"
                        onSubmit={handleOnSubmit}
                    />
                </form>
                <p className={styles.p}>Nog geen account? Registreer <Link to="/registreren">hier</Link></p>
            </div>
        </main>
    );
}

export default LoginPage;