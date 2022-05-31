import React from 'react';
import styles from './Login.module.css';
import InputField from '../../components/inputField/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import {Link} from 'react-router-dom';

function LoginPage() {
    return (
        <main className={styles.main}>
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
                <p className={styles.p}>Nog geen account? Registreer <Link to="/registreren">hier</Link></p>
            </div>
        </main>
    );
}

export default LoginPage;