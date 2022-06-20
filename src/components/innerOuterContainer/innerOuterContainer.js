import styles from './innerOuterContainer.module.css'
import React from 'react';
import NavigationDrawer from "../navigationDrawer/NavigationDrawer";

function InnerOuterContainer({children, navDrawer, toggleNavdrawer}) {
    return (
        <main className={styles.outer}>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavdrawer}
            />
            <div className={styles.inner}>
                {children}
            </div>
        </main>
    );
}

export default InnerOuterContainer;