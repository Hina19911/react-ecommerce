import { useQuery } from '@tanstack/react-query';
import { productsService } from '../services/ProductService';

export const useProducts = (filters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsService.getProducts(filters),
  });
};
