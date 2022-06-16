import React from 'react';
import styles from './ListContentCard.module.css'

function ListContentCard({children, stylingClass}) {
        return (
            <div className={styles["content-card"]}>
                <ul className={styles[(stylingClass)]}>
                    {children}
                </ul>
            </div>
        )
}

export default ListContentCard;