import styles from './NavigationDrawerItem.module.css'
import React from 'react';
import {NavLink} from "react-router-dom";

function NavigationDrawerItem({text, path}) {
    return (
        <li className={styles.li}>
            <NavLink
                className={styles.navlink}
                exact activeClassName={styles["navlink-active"]}
                to={path}
            >
                {text}
            <
            /NavLink>
        </li>
    );
};

export default NavigationDrawerItem;