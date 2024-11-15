import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetails } from './ArticleDetails';
import apiURL from '../api'; // The base URL for API calls

export const App = () => {
  const [pages, setPages] = useState([]); // Store list of pages (articles)
  const [selectedPage, setSelectedPage] = useState(null); // Store the selected article
  const [isAddingArticle, setIsAddingArticle] = useState(false); // Track if we are adding an article
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    tags: '',
  });

  // Fetch the list of pages on initial load
  useEffect(() => {
    async function fetchPages() {
      const response = await fetch(`${apiURL}/wiki`);
      const data = await response.json();
      setPages(data);
    }
    fetchPages();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  // Handle form submission (POST request)
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Prepare the data to send in the POST request
    const articleData = {
      title: newArticle.title,
      content: newArticle.content,
      authorName: newArticle.authorName,
      authorEmail: newArticle.authorEmail,
      tags: newArticle.tags.split(' '), // Convert space-separated tags to an array
    };

    // Send POST request to the server to create the new article
    const response = await fetch(`${apiURL}/wiki`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      const createdArticle = await response.json();
      setPages([...pages, createdArticle]);
      setIsAddingArticle(false);
      setNewArticle({
        title: '',
        content: '',
        authorName: '',
        authorEmail: '',
        tags: '',
      });
    } else {
      console.log('Failed to create article');
    }
  };

  const handlePageClick = async (slug) => {
    const response = await fetch(`${apiURL}/wiki/${slug}`);
    const pageData = await response.json();
    setSelectedPage(pageData); 
  };

  const handleOnClick = () => {
    setSelectedPage(null); 
  };

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>

      {isAddingArticle ? (
        <form onSubmit={handleFormSubmit}>
          <h3>Create a New Article</h3>

          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newArticle.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={newArticle.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={newArticle.authorName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Author Email:</label>
            <input
              type="email"
              name="authorEmail"
              value={newArticle.authorEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Tags (separate by spaces):</label>
            <input
              type="text"
              name="tags"
              value={newArticle.tags}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : selectedPage ? (
        <ArticleDetails 
          page={selectedPage} 
          handleOnClick={handleOnClick}
        />
      ) : (
        <>
          <PagesList pages={pages} onPageClick={handlePageClick} />

          <button onClick={() => setIsAddingArticle(true)}>Create New Page</button>
        </>
      )}
    </main>
  );
};
