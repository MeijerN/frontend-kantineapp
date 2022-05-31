import React from 'react';
import styles from './ContentCard.module.css'

function ContentCard({children}) {
    return (
        <div className={styles["content-card"]}>
            <ul className={styles.ul}>
                {children}
            </ul>
        </div>
    );
};

export default ContentCard;

//TODO: Navigation drawer afmaken
// CSS nog voorzien van indeling