import { config } from '../Config/config';

class ServiceCategory {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.endpoint = 'filter.php?c';
  }

  async fetchRecipesByCategory(category) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.endpoint}=${category}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.meals) {
        throw new Error(`No recipes found for category: ${category}`);
      }
      return data.meals;
    } catch (error) {
      throw new Error(`Error fetching recipes for category ${category}: ${error.message}`);
    }
  }
}

export default ServiceCategory;
