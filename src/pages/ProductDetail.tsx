import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import {
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Download,
  Clock,
  Check,
  ChevronRight,
  Loader2,
  Edit,
  AlertTriangle,
  Plus,
  Minus,
  RefreshCw,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { ProductCard } from "@/components/products/ProductCard";
import { ReviewSection } from "@/components/products/ReviewSection";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  price: number;
  currency: string;
  category: string;
  badge: string | null;
  status: string;
  thumbnail_url: string | null;
  images: string[];
  features: string[];
  tags: string[];
  seller_id: number;
  seller_name: string;
  seller_avatar: string | null;
  seller_is_verified: boolean;
}

interface RelatedProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  seller: { name: string; avatar: string };
  image: string;
  badge?: string;
  category: string;
  rating: number;
  sales: number;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);

  // Fetch product data
  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/products/${slug}`);
      setProduct(response.data);
    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Product not found');
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Fetch related products by category
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category) return;
      try {
        const response = await api.get(`/products?category=${encodeURIComponent(product.category)}&limit=5`);
        // Filter out current product and take first 4
        const related = (response.data.products || response.data || [])
          .filter((p: any) => p.slug !== slug)
          .slice(0, 4)
          .map((p: any) => ({
            id: p.id?.toString() || p.slug,
            title: p.title,
            slug: p.slug,
            description: p.description || '',
            price: p.price,
            currency: p.currency || 'INR',
            seller: { name: p.seller_name || 'Unknown', avatar: p.seller_avatar || '' },
            image: p.thumbnail_url || p.images?.[0] || '',
            badge: p.badge,
            category: p.category,
            rating: 4.8,
            sales: Math.floor(Math.random() * 100) + 10,
          }));
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };
    fetchRelatedProducts();
  }, [product?.category, slug]);

  // Convert both to numbers for comparison to handle type mismatches
  const isOwner = user && product && Number(user.id) === Number(product.seller_id);
  const isPublished = product?.status === 'published';

  const handleAddToCart = () => {
    if (!product) return;

    const itemToAdd = {
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.thumbnail_url || (product.images && product.images[0]) || '',
    };

    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(itemToAdd);
    }

    toast.success("Added to cart", {
      description: `${quantity}x ${product.title} added to your cart.`,
    });
    setQuantity(1); // Reset quantity after adding
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    const wishlistItem = {
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.thumbnail_url || (product.images && product.images[0]) || '',
      slug: product.slug,
    };

    toggleItem(wishlistItem);

    const isNowInWishlist = !isInWishlist(product.id.toString());
    toast.success(isNowInWishlist ? "Added to wishlist" : "Removed from wishlist", {
      description: isNowInWishlist
        ? `${product.title} has been added to your wishlist.`
        : `${product.title} has been removed from your wishlist.`,
    });
  };

  const handleRetry = () => {
    setIsRetrying(true);
    fetchProduct();
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = product?.title || 'Check out this product';

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Link copied!", {
        description: "Product link has been copied to clipboard.",
      });
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-champagne" />
        </div>
      </Layout>
    );
  }

  // Check if product is in wishlist
  const inWishlist = product ? isInWishlist(product.id.toString()) : false;

  // Error or not found state
  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="heading-large mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'Unable to load product'}</p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="luxury"
                onClick={handleRetry}
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Retrying...</>
                ) : (
                  <><RefreshCw className="h-4 w-4 mr-2" /> Try Again</>
                )}
              </Button>
              <Button variant="luxury-outline" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get the main display image - use selected image from gallery or fallback to thumbnail
  const allImages = product.images && product.images.length > 0
    ? product.images
    : (product.thumbnail_url ? [product.thumbnail_url] : []);
  const displayImage = allImages[selectedImageIndex] || product.thumbnail_url || '';
  const features = product.features || [];
  const tags = product.tags || [];

  return (
    <>
      <Helmet>
        <title>{product.title} — Mercato94</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        {displayImage && <meta property="og:image" content={displayImage} />}
      </Helmet>
      <Layout>
        {/* Owner/Status Banner - pt-20 for fixed header offset */}
        {isOwner && !isPublished && (
          <div className="pt-20 bg-amber-500/20 border-b border-amber-500/30">
            <div className="container-luxury py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  This product is <span className="capitalize">{product.status}</span> and not visible to customers
                </span>
              </div>
              <Button variant="luxury-outline" size="sm" asChild>
                <Link to={`/dashboard/edit/${product.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Breadcrumb - only add pt-24 if banner is not showing */}
        <nav className={`${(isOwner && !isPublished) ? 'pt-4' : 'pt-24'} pb-4 border-b border-border bg-stone/20`}>
          <div className="container-luxury">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/products" className="hover:text-foreground transition-colors">
                  Products
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{product.title}</span>
              </div>

              {/* Edit button for owner (visible on published products too) */}
              {isOwner && isPublished && (
                <Button variant="luxury-outline" size="sm" asChild>
                  <Link to={`/dashboard/edit/${product.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </nav>

        {/* Product content */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left - Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-stone">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image available
                    </div>
                  )}
                </div>

                {/* Gallery thumbnails */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`aspect-square rounded-lg overflow-hidden bg-secondary transition-all duration-200 ${selectedImageIndex === idx
                          ? 'ring-2 ring-champagne ring-offset-2 ring-offset-background'
                          : 'hover:opacity-80'
                          }`}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {product.badge && (
                  <Badge
                    variant="outline"
                    className="bg-champagne/20 text-foreground border-champagne/30"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Right - Info */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <span className="text-sm text-muted-foreground tracking-widest uppercase">
                    {product.category}
                  </span>
                  <h1 className="heading-large">{product.title}</h1>
                  <p className="text-muted-foreground text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Price & CTA */}
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-medium">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="luxury-outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                      <Button
                        variant="luxury-outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="luxury"
                      size="xl"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={!isPublished && !isOwner}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart{quantity > 1 ? ` (${quantity})` : ''}
                    </Button>
                    <Button
                      variant="luxury-outline"
                      size="icon"
                      className={`h-14 w-14 transition-colors ${inWishlist ? 'bg-red-500/20 border-red-500/50 text-red-500' : ''}`}
                      onClick={handleToggleWishlist}
                      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="luxury-outline"
                      size="icon"
                      className="h-14 w-14"
                      onClick={handleShare}
                      title="Share this product"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* What's included / Features */}
                {features.length > 0 && (
                  <div className="space-y-4 p-6 rounded-xl bg-secondary/30">
                    <h3 className="font-medium">Features</h3>
                    <ul className="space-y-3">
                      {features.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-champagne" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Seller info */}
                <div className="flex items-center justify-between p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    {product.seller_avatar ? (
                      <img
                        src={product.seller_avatar}
                        alt={product.seller_name}
                        className="w-12 h-12 rounded-full bg-secondary object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-lg font-medium">{product.seller_name?.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.seller_name}</span>
                        {product.seller_is_verified && (
                          <Shield className="h-4 w-4 text-champagne" />
                        )}
                      </div>
                      {product.seller_is_verified ? (
                        <p className="text-sm text-muted-foreground">Verified Seller</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Seller</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="luxury-outline"
                    size="sm"
                    onClick={() => window.open(`/seller/${encodeURIComponent(product.seller_name)}`, '_blank')}
                  >
                    View Profile
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Instant Download
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Full Description */}
            {product.full_description && (
              <div className="mt-16 pt-16 border-t border-border">
                <h2 className="heading-medium mb-6">Description</h2>
                <div className="prose prose-neutral max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-muted-foreground">
                    {product.full_description}
                  </pre>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <ReviewSection productId={product.id} productSlug={product.slug} />

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16 pt-16 border-t border-border">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="heading-medium">Related Products</h2>
                  <Button variant="luxury-outline" size="sm" asChild>
                    <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                      View All
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 flex items-center gap-3 flex-wrap">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductDetail;
