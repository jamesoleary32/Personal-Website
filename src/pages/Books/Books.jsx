import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import BookData from './BookData.json';
import { Link } from 'react-router-dom';
import styles from './Books.module.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [showWithSummary, setShowWithSummary] = useState(false);
    const [bookOfTheDay, setBookOfTheDay] = useState(null);

    // Function to get a deterministic "random" book based on the current date
    const getBookOfTheDay = (booksWithSummaries) => {
        if (booksWithSummaries.length === 0) return null;

        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

        // Simple hash function to convert date string to a number
        let hash = 0;
        for (let i = 0; i < dateString.length; i++) {
            hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }

        const index = Math.abs(hash) % booksWithSummaries.length;
        return booksWithSummaries[index];
    };

    useEffect(() => {
        setBooks(BookData.books);
        setFilteredBooks(BookData.books);

        const booksWithSummaries = BookData.books.filter(book => book.summaryLink);
        setBookOfTheDay(getBookOfTheDay(booksWithSummaries));
    }, []);

    const handleGenreSelect = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    useEffect(() => {
        if (selectedGenres.length === 0) {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter((book) =>
                selectedGenres.every((genre) => book.genre.includes(genre))
            );
            setFilteredBooks(filtered);
        }
    }, [selectedGenres, books]);

    const handleSummaryFilter = () => {
        setShowWithSummary(!showWithSummary);
    };

    // Compute the final displayed books (genre + summary filters applied)
    const displayedBooks = filteredBooks.filter(book => !showWithSummary || book.summaryLink);

    // Count books per genre within the displayed set
    const genreCountMap = {};
    const genres = [
        "Biography",
        "History",
        "Politics",
        "Warfare",
        "Technology",
        "Philosophy",
        "Economics",
        "Management",
        "Mathematics",
        "Engineering",
        "Sociology",
        "Fiction"
    ];

    genres.forEach(genre => {
        genreCountMap[genre] = displayedBooks.filter(book => book.genre.includes(genre)).length;
    });

    // Count books with summaries within the genre-filtered set
    const summaryCount = filteredBooks.filter(book => book.summaryLink).length;

    const renderSummary = (summary) => {
        const regex = /\[(.*?)\]\((notes\/.*?\.md)\)/g;
        const parts = summary.split(regex);
        return parts.map((part, index) => {
            if (index % 3 === 1) {
                const linkText = part;
                const linkUrl = `../${parts[index + 1]}`;
                return (
                    <a key={index} href={linkUrl} target="_blank" rel="noopener noreferrer">
                        {linkText}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className={styles.booksContainer}>
            <Navigation />

            {bookOfTheDay && (
                <div className={styles.bookOfTheDay}>
                    <h2>Book of the Day</h2>
                    <div className={styles.bookOfTheDayContent}>
                        <Link to={bookOfTheDay.summaryLink} className={styles.bookOfTheDayLink}>
                            <img
                                src={bookOfTheDay.image}
                                alt={bookOfTheDay.title}
                                className={styles.bookOfTheDayImage}
                            />
                            <div className={styles.bookOfTheDayInfo}>
                                <h3>{bookOfTheDay.title}</h3>
                                <p className={styles.bookOfTheDayAuthor}>by {bookOfTheDay.author}</p>
                                {bookOfTheDay.genre && (
                                    <p className={styles.bookOfTheDayGenres}>{bookOfTheDay.genre.join(', ')}</p>
                                )}
                                <span className={styles.readReviewLink}>Read Review →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            <div className={styles.filterBar}>
                <div className={styles.filterPills}>
                    {genres.map((genre) => {
                        if (genreCountMap[genre] === 0 && !selectedGenres.includes(genre)) return null;

                        return (
                            <button
                                key={genre}
                                className={`${styles.pill} ${selectedGenres.includes(genre) ? styles.pillActive : ''}`}
                                onClick={() => handleGenreSelect(genre)}
                            >
                                {genre} <span className={styles.pillCount}>{genreCountMap[genre]}</span>
                            </button>
                        );
                    })}

                    {(summaryCount > 0 || showWithSummary) && (
                        <button
                            className={`${styles.pill} ${showWithSummary ? styles.pillActive : ''}`}
                            onClick={handleSummaryFilter}
                        >
                            Has summary <span className={styles.pillCount}>{summaryCount}</span>
                        </button>
                    )}
                </div>

                <p className={styles.resultCount}>
                    Showing {displayedBooks.length} {displayedBooks.length === 1 ? 'book' : 'books'}
                </p>
            </div>

            <div className={styles.bookshelf}>
                {displayedBooks.map((book, index) => {
                    const cardInner = (
                        <>
                            <img src={book.image} alt={book.title} className={styles.bookImage} loading="lazy" />
                            <div className={styles.bookMeta}>
                                <div className={styles.bookTitle}>{book.title}</div>
                                {book.author && <div className={styles.bookAuthor}>{book.author}</div>}
                            </div>
                            {book.summaryLink && <div className={styles.readReview}>Read review →</div>}
                        </>
                    );

                    return (
                        <div key={index} className={styles.bookItem}>
                            {book.summaryLink ? (
                                <Link to={book.summaryLink} className={styles.bookCard}>
                                    {cardInner}
                                </Link>
                            ) : (
                                <div className={`${styles.bookCard} ${styles.bookCardDisabled}`}> {cardInner} </div>
                            )}

                            {book.summary && (
                                <div className={styles.summary}>
                                    {renderSummary(book.summary)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Books;
