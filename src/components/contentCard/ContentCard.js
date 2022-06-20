import styles from './ContentCard.module.css'
import React from 'react';

function ContentCard({children, stylingClass}) {
    return (
        <article className={styles[(stylingClass)]}>
            {children}
        </article>
    );
}

export default ContentCard;