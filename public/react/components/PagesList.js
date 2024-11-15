import React from 'react';

export const PagesList = ({ pages, onPageClick }) => {
  return (
    <ul>
      {pages.map((page) => (
        <li key={page.slug}>
          <button onClick={() => onPageClick(page.slug)}>{page.title}</button>
        </li>
      ))}
    </ul>
  );
};
