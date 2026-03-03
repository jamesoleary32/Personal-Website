import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a href="/admin/" className={styles.adminLink}>Admin</a>
            <a href="https://n8n.jamesoleary.xyz" className={styles.adminLink}>Automations</a>
        </footer>
    );
};

export default Footer;
