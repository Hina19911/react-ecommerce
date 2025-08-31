//Header component that will be used in app
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // if your hook is exported here

export default function Header() {
  const { cartCount } = useCart(); // count from context

  return (
    <header className="flex items-center gap-4 px-4 h-16 bg-white shadow">
      <Link to="/" className="text-xl font-semibold">My Store</Link>

      <nav className="ml-auto flex items-center gap-4">
        <Link to="/cart" className="relative inline-flex items-center">
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full bg-red-600 text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

