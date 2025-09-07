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
   // ✅ CREATE ORDER
   async createOrder(order) {
    // FakeStore API expects: { userId, date, products: [{productId, quantity}] }
    const products = (order.products || []).map(p => ({
      productId: Number(p.id),
      quantity: Number(p.quantity ?? 1),
    }));

    const payload = {
      userId: Number(order.userId ?? 1),
      date: order.date ?? new Date().toISOString(),
      products,
    };

    // Helpful while debugging
    console.log('POST /carts payload:', payload);

    return this.post('/carts', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


// Export a single shared instance so we don't need to `new ProductsService()` everywhere
export const productsService = new ProductsService();
