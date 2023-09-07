import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Category from '../Category';
import './Index.css'; 

const Index = () => {
  const categoryService = new Category();

  const { data: categories, isLoading, isError, error } = useQuery(['categories'], () =>
    categoryService.fetchCategories()
  );

  const renderCategories = () => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    if (isError) {
      return <div className="error">{error.message}</div>;
    }

    return (
      <div className="container">
        <h2>Categories</h2>
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category.idCategory}>
                <Link to={`/category/${category.strCategory}`} className="category-link">
                  {category.strCategory}
                </Link>
              </li>
            ))}
        </ul>
        
      </div>
    );
  };

  return (
    <div>
      {renderCategories()}
    </div>
  );
}

export default Index;
