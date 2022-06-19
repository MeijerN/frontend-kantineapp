import styles from './ContentCard.module.css'
import React from 'react';

function ContentCard({children, stylingClass}) {
    return (
        <div className={styles[(stylingClass)]}>
            {children}
        </div>
    );
}

export default ContentCard;