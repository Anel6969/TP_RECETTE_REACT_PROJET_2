import { config } from '../Config/config';

class Category {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.endpoint = '/categories.php';
  }

  async fetchCategories() {
    try {
      const response = await fetch(`${this.baseUrl}/${this.endpoint}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.categories;
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }
}

export default Category;
