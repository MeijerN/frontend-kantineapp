import React from 'react';
import styles from './Icon.module.css'

function Icon({text, image, alt, onClick}) {
    return (
        <figure onClick={onClick} className={styles.figure}>
            <input type="image" src={image} className={styles.icon} alt={alt}/>
            <p className={styles["icon-text"]}>{text}</p>
        </figure>
    );
}

export default Icon;