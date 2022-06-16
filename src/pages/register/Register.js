import React from 'react';
import styles from './Register.module.css';
import InputField from '../../components/inputField/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import {Link} from "react-router-dom";

function RegisterPage() {
    return (
        <div className={styles.main}>
            <div className={styles["form-card"]}>
                <h1 className={styles.h1}>Registreren</h1>
                <form className={styles.form} onSubmit="">
                    <InputField
                        type="text"
                        placeholder="Voornaam"
                        stylingClass="login-registration"
                    />
                    <InputField
                        type="text"
                        placeholder="Achternaam"
                        stylingClass="login-registration"
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                        stylingClass="login-registration"
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                        stylingClass="login-registration"
                    />
                    <InputField
                        type="password"
                        placeholder="Herhaal wachtwoord"
                        stylingClass="login-registration"
                    />
                    <SubmitButton
                        text="Maak account aan"
                        onSubmit=""
                    />
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;