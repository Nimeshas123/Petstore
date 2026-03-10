import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { ProductCard, Product } from "./components/product-card";
import { ShoppingCartSheet } from "./components/shopping-cart";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { ForgotPassword } from "./components/auth/forgot-password";

interface CartItem extends Product {
  quantity: number;
}

interface User {
  name: string;
  email: string;
}

type AuthView = "login" | "signup" | "forgot-password" | null;

export default function App() {

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Dog Food Bowl Set",
      category: "dog",
      subCategory: "food",
      price: 1800,
      image: "https://images.unsplash.com/photo-1598134493179-51332e56807f",
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: "Nutritious Dog Food - 5kg",
      category: "dog",
      subCategory: "food",
      price: 3200,
      image: "https://images.unsplash.com/photo-1684882726821-2999db517441",
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: "Interactive Dog Toy Ball",
      category: "dog",
      subCategory: "toys",
      price: 1200,
      image: "https://images.unsplash.com/photo-1759105636768-8b32c099812c",
      rating: 4.8,
      inStock: true
    },
    {
      id: 4,
      name: "Durable Dog Leash & Collar Set",
      category: "dog",
      subCategory: "accessories",
      price: 2200,
      image: "https://images.unsplash.com/photo-1600277971170-8a7d75fb1bd9",
      rating: 4.7,
      inStock: true
    },
    {
      id: 5,
      name: "Premium Dry Cat Food - 3kg",
      category: "cat",
      subCategory: "food",
      price: 2800,
      image: "https://images.unsplash.com/photo-1764249453850-faace6e57444",
      rating: 4.8,
      inStock: true
    },
    {
      id: 6,
      name: "Interactive Cat Toy Mouse",
      category: "cat",
      subCategory: "toys",
      price: 850,
      image: "https://images.unsplash.com/photo-1759720488555-d4ca178c2543",
      rating: 4.6,
      inStock: true
    },
    {
      id: 7,
      name: "Cozy Cat Bed & Cushion",
      category: "cat",
      subCategory: "accessories",
      price: 2400,
      image: "https://images.unsplash.com/photo-1619996801482-c85cade3dc28",
      rating: 4.7,
      inStock: true
    },
    {
      id: 8,
      name: "Premium Bird Seed Mix - 2kg",
      category: "bird",
      subCategory: "food",
      price: 1600,
      image: "https://images.unsplash.com/photo-1647458597077-6712547a5047",
      rating: 4.5,
      inStock: true
    },
    {
      id: 9,
      name: "Bird Perch & Swing Toy",
      category: "bird",
      subCategory: "toys",
      price: 1100,
      image: "https://images.unsplash.com/photo-1762849283503-9247032c7017",
      rating: 4.4,
      inStock: true
    },
    {
      id: 10,
      name: "Spacious Bird Cage",
      category: "bird",
      subCategory: "accessories",
      price: 6500,
      image: "https://images.unsplash.com/photo-1634413102755-7f0857eba45b",
      rating: 4.9,
      inStock: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<"all" | "dog" | "cat" | "bird">("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<"all" | "food" | "toys" | "accessories">("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>(null);
  const [user, setUser] = useState<User | null>(null);

  // fetch products from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {
        console.log("Backend not running - using local products");
      });
  }, []);

  const handleLogin = (email: string, password: string) => {
    const userData = { name: email.split("@")[0], email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthView(null);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthView(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCartItems([]);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      selectedCategory === "all" || p.category === selectedCategory;

    const subCategoryMatch =
      selectedSubCategory === "all" || p.subCategory === selectedSubCategory;

    return categoryMatch && subCategoryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {authView === "login" && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView("signup")}
          onSwitchToForgotPassword={() => setAuthView("forgot-password")}
        />
      )}

      {authView === "signup" && (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView("login")}
        />
      )}

      {authView === "forgot-password" && (
        <ForgotPassword onBack={() => setAuthView("login")} />
      )}

      {!authView && (
        <>
          <Header
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
            user={user}
            onLoginClick={() => setAuthView("login")}
            onLogout={handleLogout}
          />

         {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl mb-4">Everything Your Pet Needs</h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8">
                  Premium quality supplies for dogs, cats, and birds. Free shipping on orders over Rs. 4,000!
                </p>
                <Button size="lg" variant="secondary">Shop Now</Button>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl mb-2">Browse Products</h3>
                <p className="text-gray-600">
                  Find the perfect supplies for your furry or feathered friends
                </p>
              </div>

              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="dog">🐕 Dogs</TabsTrigger>
                  <TabsTrigger value="cat">🐈 Cats</TabsTrigger>
                  <TabsTrigger value="bird">🦜 Birds</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Sub-Categories */}
            <div className="flex justify-center mb-6">
              <Tabs value={selectedSubCategory} onValueChange={(value) => setSelectedSubCategory(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="food">🍖 Food</TabsTrigger>
                  <TabsTrigger value="toys">🎾 Toys</TabsTrigger>
                  <TabsTrigger value="accessories">🎒 Accessories</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </section>

          {/* Shopping Cart */}
          <ShoppingCartSheet
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </>
      )}
    </div>
  );
}