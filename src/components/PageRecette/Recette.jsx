import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Recipe from '../Recipe';
import Fetch from '../Fetch/Fetch';


const oRS = new Recipe();

function Recette() {
  const { recipeId } = useParams();
  const { data: recipe, isLoading, isError, error } = useQuery(['recipe', recipeId], () =>
    oRS.fetchRecipeById(recipeId)
  );

  const [isIngredientsAccordionOpen, setIngredientsAccordionOpen] = useState(false);
  const [isInstructionsAccordionOpen, setInstructionsAccordionOpen] = useState(false);

  const toggleIngredientsAccordion = () => {
    setIngredientsAccordionOpen(!isIngredientsAccordionOpen);
  };

  const toggleInstructionsAccordion = () => {
    setInstructionsAccordionOpen(!isInstructionsAccordionOpen);
  };

  const renderRecipeDetails = () => {
    if (isLoading) {
      return (
        <>
          <div>Loading...</div>
        </>
      );
    }

    if (isError) {
      return (
        <>
          <div>
            <p>{error.message}</p>
          </div>
        </>
      );
    }

    return (
      <>
        <div>
        <Link className='RetourCategories' to={`/category/${recipe.strCategory}`}>Retour à la catégorie</Link>
          <h2>{recipe.strMeal}</h2>
          <p>Catégorie: {recipe.strCategory}</p>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3 onClick={toggleIngredientsAccordion} style={{ cursor: 'pointer' }}>
            Ingrédients {isIngredientsAccordionOpen ? '(-)' : '(+)'}
          </h3>
          {isIngredientsAccordionOpen && (
            <ul>
              {Object.entries(recipe)
                .filter(([key, value]) => key.startsWith('strIngredient') && value)
                .map(([key, value]) => (
                  <li key={key}>
                    {value} - {recipe[`strMeasure${key.slice(13)}`]}
                  </li>
                ))}
            </ul>
          )}
          <h3 onClick={toggleInstructionsAccordion} style={{ cursor: 'pointer' }}>
            Instructions {isInstructionsAccordionOpen ? '(-)' : '(+)'}
          </h3>
          {isInstructionsAccordionOpen && (
            <p>{recipe.strInstructions}</p>
          )}
          
        </div>
      </>
    );
  };

  return (
    <>
      <Fetch isLoading={isLoading} isError={isError} error={error}>
        {renderRecipeDetails()}
      </Fetch>
    </>
  );
}

export default Recette;
