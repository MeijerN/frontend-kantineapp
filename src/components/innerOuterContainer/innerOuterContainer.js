import styles from './innerOuterContainer.module.css'
import React from 'react';

function InnerOuterContainer({children}) {
    return (
        <main className={styles.outer}>
            <div className={styles.inner}>
                {children}
            </div>
        </main>
    );
}

export default InnerOuterContainer;