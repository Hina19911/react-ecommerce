import { useEffect,useState } from "react"
import ProductsGrid from "./ProductsGrid"
export default function Products(){
  const [products,setProducts] = useState([])


  
  return (
    // Grid
    <div className="w-full max-w-6xl px-4 py-8">
      <ProductsGrid products={products} />
    </div>
  );
}
