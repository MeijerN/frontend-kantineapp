import styles from './ContentCard.module.css'
import React from 'react';

function ContentCard({children}) {
    return (
        <div className={styles["content-card"]}>
            {children}
        </div>
    );
}

export default ContentCard;