import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";

interface BackendProduct {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  category: string | null;
  badge: string | null;
  thumbnail_url: string | null;
  images: string[];
  seller_name: string;
  seller_avatar: string | null;
}

// Map backend product to ProductCard format
const mapProduct = (product: BackendProduct) => ({
  id: product.id.toString(),
  title: product.title,
  slug: product.slug,
  description: product.description || "Premium digital product",
  price: product.price,
  currency: product.currency || "USD",
  seller: {
    name: product.seller_name || "Seller",
    avatar: product.seller_avatar || "",
  },
  image: product.thumbnail_url || (product.images && product.images[0]) || "",
  badge: product.badge || undefined,
  category: product.category || "Templates",
  rating: 4.8,
  sales: 0,
});

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ReturnType<typeof mapProduct>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/products");
        // Take first 6 products as featured
        const mappedProducts = response.data.slice(0, 6).map(mapProduct);
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-champagne" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
