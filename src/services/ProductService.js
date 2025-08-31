import { httpClient } from './httpClient';
import { HttpService } from './HttpService';


class ProductsService extends HttpService {
  constructor() {
    // Call parent constructor and pass our axios client
    super(httpClient);
  }
  

  // Fetch all products (optionally with filters)
  async getProducts(filters = {}) {
    let url = '/products';
    if (filters.category) {
      url += `/category/${filters.category}`;
    }
    if (filters.sort) {
      url += `?sort=${filters.sort}`;
    }
    return this.get(url);
  }

  // Fetch category list
  async getCategories() {
    return this.get('/products/categories');
  }

  // Fetch a single product by ID
  async getProduct(id) {
    return this.get(`/products/${id}`);
  }
}

// Export a single shared instance so we don't need to `new ProductsService()` everywhere
export const productsService = new ProductsService();
