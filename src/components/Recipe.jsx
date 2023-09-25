import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToFavorites } from './actions/favoritesActions';
import { config } from '../Config/config';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
    this.baseUrl = config.baseUrl;
    this.endpoint = 'lookup.php?i';
  }

  async componentDidMount() {
    const { recipeId } = this.props.match.params;
    try {
      const response = await fetch(`${this.baseUrl}/${this.endpoint}=${recipeId}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.meals || data.meals.length === 0) {
        throw new Error(`Recipe with ID ${recipeId} not found`);
      }
      this.setState({ recipe: data.meals[0] });
    } catch (error) {
      console.error(`Error fetching recipe by ID ${recipeId}: ${error.message}`);
    }
  }

  handleAddToFavorites = () => {
    if (this.state.recipe) {
      this.props.addToFavorites(this.state.recipe);
    }
  };

  render() {
    const { recipe } = this.state;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{recipe.strMeal}</h2>
       
        <button onClick={this.handleAddToFavorites}>Ajouter aux favoris</button>
      </div>
    );
  }
}

export default connect(null, { addToFavorites })(Recipe);
