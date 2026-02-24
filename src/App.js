/*Libaries*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/*Pages*/
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Writing from './pages/Writing/Writing';
import Books from './pages/Books/Books';
import KnowledgeGraph from './pages/KnowledgeGraph/KnowledgeGraph';
import WorldMapPage from './pages/WorldMap/WorldMapPage';
import Trackers from './pages/Trackers/Trackers';
import Languages from './pages/Languages/Languages';
import Projects from './pages/Projects/Projects';

/*Pages: Articles */
import ArticlePage from './pages/Writing/Articles/ArticlePage';
/*Pages: Book Summaries */
import BookSummary from './pages/Books/Book_Summaries/BookSummary';

/*Components*/
import NotePage from './pages/NotePage/NotePage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Helmet>
        <title>James O'Leary</title>
        <meta name="description" content="Personal website featuring articles on philosophy, computer science, and Footium, along with book summaries and a knowledge graph." />
        <meta name="keywords" content="philosophy, computer science, Footium, book summaries, knowledge graph" />
        <meta property="og:title" content="James O'Leary" />
        <meta property="og:description" content="Personal website featuring articles on philosophy, computer science, and Footium, along with book summaries and a knowledge graph." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://yourwebsite.com'} />
      </Helmet>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} /> 
          <Route path="/languages" element={<Languages />} />

          
          <Route path="/articles/:slug" element={<ArticlePage />} />

          <Route path="/books" element={<Books />} />
          <Route path="/Books" element={<Books />} />

          <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/world-map" element={<WorldMapPage />} />
                     
          <Route path="/books/:bookId" element={<BookSummary />} />
          
          <Route path="/notes/:noteName" element={<NotePage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
