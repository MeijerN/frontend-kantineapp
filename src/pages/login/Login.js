import React from 'react';
import styles from './Login.module.css';
import InputField from '../../components/inputfield/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { Link } from 'react-router-dom';



function LoginPage() {
    return (
        <div className={styles["page-container"]}>
            <h1 className={styles.h1}>KantineApp</h1>
            <div className={styles["form-card"]}>
                <form className={styles.form} onSubmit="">
                    <InputField
                        type="text"
                        placeholder="Email"
                    />
                    <InputField
                        type="password"
                        placeholder="Wachtwoord"
                    />
                    <SubmitButton
                        text="Inloggen"
                        onSubmit=""
                    />
                </form>
                <p className={styles.p}>Nog geen account? Registreer <Link to="/registreren">hier</Link> </p>
            </div>
        </div>
    );
}

export default LoginPage;