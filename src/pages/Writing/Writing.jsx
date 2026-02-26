import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './Writing.module.css';
import Navigation from '../../components/Navigation/Navigation';
import ContentsComponent from '../../components/Contents/Contents';
import sections from './sections.json'; // Adjust the path if the JSON file is in a different location

const Writing = () => {
    return (
        <div className={styles.writingContainer}>
            <Helmet>
                <title>My Writings | James' Personal Website</title>
                <meta name="description" content="Collection of articles on Philosophy, Computer Science, and Footium by James" />
                <meta name="keywords" content="writing, articles, philosophy, computer science, footium" />
                <meta property="og:title" content="My Writings | James' Personal Website" />
                <meta property="og:description" content="Collection of articles on Philosophy, Computer Science, and Footium by James" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com/writing'} />
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com/writing'} />
            </Helmet>
            <Navigation />

            <ContentsComponent sections={[...sections].filter(s => s.published !== false).reverse()} />

        </div>
    );
};

export default Writing;
