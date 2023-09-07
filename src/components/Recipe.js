import { config } from '../Config/config';

class Recipe {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.endpoint = 'lookup.php?i';
  }

  async fetchRecipeById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.endpoint}=${id}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.meals || data.meals.length === 0) {
        throw new Error(`Recipe with ID ${id} not found`);
      }
      return data.meals[0];
    } catch (error) {
      throw new Error(`Error fetching recipe by ID ${id}: ${error.message}`);
    }
  }
}

export default Recipe;
