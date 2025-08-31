// A reusable base service class that other services (ProductsService, UserService, etc.) can extend.
export class HttpService {
  constructor(client) {
    // Accept a client (e.g. our preconfigured axios instance)
    this.client = client;
  }

  // Wrapper for GET requests.
  // Handles errors in one place, so we don't repeat try/catch everywhere.
  async get(url, config = {}) {
    try {
      const { data } = await this.client.get(url, config);
      return data; // Always return just the data, not the full axios response
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  // add POST, PUT, DELETE here as well for reuse
}

