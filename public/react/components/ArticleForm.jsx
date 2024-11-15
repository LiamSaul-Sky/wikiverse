import React from 'react';

export const ArticleForm = ({ handleOnClick }) => {
    
  return (
    <div>
      <h3>{title}</h3>
      <p><strong>Author:</strong> </p>
      <p><strong>Content:</strong> </p>
      <p><strong>Tags:</strong> </p>
      <p><strong>Created at:</strong> </p>
      <button onClick ={handleOnClick}>Click to return</button>
    </div>
  );
};
