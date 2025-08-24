// src/components/ProductsGrid.jsx

// ProductsGrid is a reusable component that expects a "products" prop
// Example: <ProductsGrid products={myArrayOfProducts} />
export default function ProductsGrid(props) {
    // Log the products to confirm we received them correctly
    console.log(props.products);
  
    return (
      // Outer container → sets up responsive grid
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        
        {/* Loop through each product in props.products */}
        {props.products?.map((product) => (
          
          // Individual product card
          <div
            key={product.id} // Unique key for React rendering
            
            // Tailwind styles:
            // p-4 → padding inside card
            // transition / transform / hover:* → animations when hovering
            className="p-4 bg-white rounded shadow transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Product image */}
            <img
              src={product.image}
              alt={product.title}
              
              // h-40 → fixed image height
              // mx-auto → center image horizontally
              // mb-4 → margin below
              // object-contain → scale image without cropping
              // transition-transform + hover:scale-105 → zoom in slightly on hover
              className="h-40 mx-auto mb-4 object-contain transition-transform duration-200 hover:scale-105"
            />
  
            {/* Product title */}
            <h2 className="text-lg font-semibold">{product.title}</h2>
  
            {/* Product price */}
            <p className="text-gray-700 mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    );
  }
  