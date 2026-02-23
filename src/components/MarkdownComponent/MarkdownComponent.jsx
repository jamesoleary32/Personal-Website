import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';

const MarkdownComponent = ({ filePath }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                setContent(text);
            } catch (err) {
                console.error('Error fetching markdown:', err);
                setError(err.message);
            }
        };

        fetchMarkdown();
    }, [filePath]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ReactMarkdown remarkPlugins={[remarkFrontmatter]}>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownComponent;
