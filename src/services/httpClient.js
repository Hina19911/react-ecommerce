import axios from 'axios';

// Create a pre-configured axios instance.
// ✅ This saves you from rewriting baseURL & headers for every request.
export const httpClient = axios.create({
  baseURL: 'https://fakestoreapi.com', // all requests will be relative to this
  headers: {
    'Content-Type': 'application/json', // tells server we are sending/receiving JSON
  },
});
