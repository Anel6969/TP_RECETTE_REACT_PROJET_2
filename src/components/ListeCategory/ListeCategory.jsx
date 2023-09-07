import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import ServiceCategory from '../ServiceCategory';
import './ListeCategory.css';


const cS = new ServiceCategory();

function ListeCategory() {
  const { categoryName } = useParams();

  const { data: recipes, isLoading, isError, error } = useQuery(['recipes', categoryName], () =>
    cS.fetchRecipesByCategory(categoryName)
  );

  const LoadingSpinner = () => (
    <div className='loader'>
      Loading...
    </div>
  );

  const ErrorDisplay = ({ errorMessage }) => (
    <div>
      <p>{errorMessage}</p>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <ErrorDisplay errorMessage={`Error: ${error.message}`} />;
    }

    return (
      
      <div className='container'>
         <Link to="/" className='RetourCategories'>Retour aux catégories</Link>
        <h2 className='mt-4'>Recettes de la catégorie: {categoryName}</h2>
        <ul className='list-group'>
          {recipes &&
            recipes.map(recipe => (
              <li key={recipe.idMeal} className='list-group-item'>
                <Link to={`/recipe/${recipe.idMeal}`}>
                  {recipe.strMeal}
                </Link>
              </li>
            ))}
        </ul>
       
      </div>
    );
  };

  return (
    <div className='card' style={{ width: '80%' }}>
      <div className='card-body'>{renderContent()}</div>
    </div>
  );
}

export default ListeCategory;
