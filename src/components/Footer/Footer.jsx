import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a href="/admin/" className={styles.adminLink}>Admin</a>
        </footer>
    );
};

export default Footer;
