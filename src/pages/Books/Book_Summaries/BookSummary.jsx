import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '../../../components/Navigation/Navigation';
import MarkdownComponent from '../../../components/MarkdownComponent/MarkdownComponent';
import BookData from '../BookData.json';
import styles from './ArticleStyling.module.css';

const BookSummary = () => {
    const { bookId } = useParams();
    console.log('BookSummary rendered with bookId:', bookId);
    
    // Find the book in BookData
    const book = BookData.books.find(b => b.summaryLink === `/books/${bookId}`);
    console.log('Found book:', book);
    
    // If book doesn't exist, redirect to books page
    if (!book) {
        console.log('No book found, redirecting...');
        return <Navigate to="/books" />;
    }

    return (
        <div>
            <Navigation />
            <div className={styles.markdownContainer}>
                <MarkdownComponent filePath={`/book_summaries/${bookId}.md`} />
            </div>
        </div>
    );
};

export default BookSummary; 