import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  category: 'dog' | 'cat' | 'bird';
  subCategory: 'food' | 'toys' | 'accessories';
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={`size-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
        {!product.inStock && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="line-clamp-2">{product.name}</h3>
          <Badge variant="outline" className="capitalize shrink-0">
            {product.category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-400">
              {i < Math.floor(product.rating) ? '★' : '☆'}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <p className="text-2xl">Rs. {product.price.toLocaleString()}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="size-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}