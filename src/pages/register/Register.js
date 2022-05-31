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
                    />
                    <InputField
                        type="text"
                        placeholder="Achternaam"
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                    />
                    <InputField
                        type="password"
                        placeholder="Herhaal wachtwoord"
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