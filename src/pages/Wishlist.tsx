import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

const Wishlist = () => {
    const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price / 100);
    };

    const handleRemove = (id: string, title: string) => {
        removeFromWishlist(id);
        toast.info("Removed from wishlist", {
            description: `${title} has been removed`,
        });
    };

    const handleClearAll = () => {
        clearWishlist();
        toast.success("Wishlist cleared", {
            description: "All items have been removed from your wishlist",
        });
    };

    return (
        <>
            <Helmet>
                <title>My Wishlist — 94mercato</title>
                <meta
                    name="description"
                    content="View and manage your saved products on 94mercato."
                />
            </Helmet>
            <Layout>
                <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h1 className="heading-large mb-2 flex items-center gap-3">
                                        <Heart className="h-8 w-8 text-red-500 fill-current" />
                                        My Wishlist
                                    </h1>
                                    <p className="text-muted-foreground">
                                        {items.length} {items.length === 1 ? "item" : "items"} saved
                                    </p>
                                </div>
                                {items.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearAll}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Clear All
                                    </Button>
                                )}
                            </div>

                            {/* Wishlist Items */}
                            {items.length > 0 ? (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="glass-card p-4 flex items-center gap-4"
                                        >
                                            {/* Image */}
                                            <Link to={`/products/${item.slug}`} className="shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                            </Link>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/products/${item.slug}`}>
                                                    <h3 className="font-medium text-foreground hover:text-champagne transition-colors truncate">
                                                        {item.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.category}
                                                </p>
                                                <div className="flex items-center gap-1 mt-1 text-sm">
                                                    <Star className="h-3 w-3 text-champagne fill-current" />
                                                    <span>{item.rating}</span>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="font-semibold text-champagne">
                                                    {formatPrice(item.price, item.currency)}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="sapphire"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link to={`/products/${item.slug}`}>
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemove(item.id, item.title)}
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-20">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
                                        <Heart className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <h2 className="heading-medium mb-2">Your wishlist is empty</h2>
                                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                        Save products you're interested in by clicking the heart icon on any product card.
                                    </p>
                                    <Button variant="luxury" size="lg" asChild>
                                        <Link to="/products">
                                            <ShoppingBag className="h-5 w-5 mr-2" />
                                            Browse Products
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Wishlist;
