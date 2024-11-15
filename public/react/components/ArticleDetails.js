import React from 'react';

export const ArticleDetails = ({ page, handleOnClick }) => {
  // Destructure the page object to get the individual properties
  const { title, author, content, tags, createdAt } = page;

  return (
    <div>
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author.name}</p>
      <p><strong>Content:</strong> {content}</p>
      <p><strong>Tags:</strong> {tags.map(tag => tag.name).join(', ')}</p>
      <p><strong>Created at:</strong> {new Date(createdAt).toLocaleDateString()}</p>
      <button onClick ={handleOnClick}>Click to return</button>
    </div>
  );
};
