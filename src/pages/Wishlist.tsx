import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Wishlist = () => {
    const { items, removeItem, clearWishlist } = useWishlistStore();

    return (
        <>
            <Helmet>
                <title>My Wishlist | 94mercato</title>
                <meta name="description" content="View and manage your saved products" />
            </Helmet>
            <Header />
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container-wide">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="heading-large flex items-center gap-3">
                                <Heart className="h-8 w-8 text-champagne fill-champagne" />
                                My Wishlist
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                {items.length} {items.length === 1 ? "item" : "items"} saved
                            </p>
                        </div>
                        {items.length > 0 && (
                            <Button
                                variant="ghost"
                                onClick={clearWishlist}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                Clear All
                            </Button>
                        )}
                    </div>

                    {/* Wishlist Items */}
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-champagne/50 transition-all duration-300"
                                >
                                    {/* Product Image */}
                                    <Link to={`/products/${item.slug}`} className="block aspect-[4/3] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </Link>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                                        aria-label="Remove from wishlist"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <Link to={`/products/${item.slug}`}>
                                            <h3 className="font-medium text-foreground group-hover:text-champagne transition-colors line-clamp-2">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-lg font-semibold text-champagne">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            <Button size="sm" variant="luxury" asChild>
                                                <Link to={`/products/${item.slug}`}>
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                                <Heart className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
                            <p className="text-muted-foreground mb-6 max-w-md">
                                Save your favorite products to your wishlist and they'll appear here for easy access.
                            </p>
                            <Button variant="luxury" asChild>
                                <Link to="/products">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Browse Products
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Wishlist;
