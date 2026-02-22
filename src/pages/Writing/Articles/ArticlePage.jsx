import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '../../../components/Navigation/Navigation';
import MarkdownComponent from '../../../components/MarkdownComponent/MarkdownComponent';
import sections from '../sections.json';
import styles from './ArticleStyling.module.css';

const ArticlePage = () => {
    const { slug } = useParams();
    const article = sections.find(s => s.markdownUrl === `/articles/${slug}.md`);

    if (!article) {
        return <Navigate to="/writing" />;
    }

    return (
        <div>
            <Navigation />
            <div className={styles.markdownContainer}>
                <MarkdownComponent filePath={article.markdownUrl} />
            </div>
        </div>
    );
};

export default ArticlePage;
