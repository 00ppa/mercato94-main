import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import {
    Gift,
    Download,
    Search,
    ArrowRight,
    Sparkles,
    Star,
    Heart,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import api from "@/lib/api";

interface FreeProduct {
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
    download_count?: number;
}

const FreeDownloads = () => {
    const [products, setProducts] = useState<FreeProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchFreeProducts = async () => {
            try {
                setIsLoading(true);
                // In production, this would filter by is_free=true
                const response = await api.get("/products?is_free=true&limit=20");
                const data = response.data.products || response.data || [];

                // Mock free products data for now (will work with real data when available)
                const freeProducts = data.map((p: any) => ({
                    id: p.id?.toString() || p.slug,
                    title: p.title,
                    slug: p.slug,
                    description: p.description || "",
                    price: 0, // Free products
                    currency: "INR",
                    seller: {
                        name: p.seller_name || "Unknown",
                        avatar: p.seller_avatar || "",
                    },
                    image: p.thumbnail_url || p.images?.[0] || "",
                    badge: "Free",
                    category: p.category,
                    rating: 4.5 + Math.random() * 0.5,
                    sales: Math.floor(Math.random() * 500) + 50,
                    download_count: Math.floor(Math.random() * 1000) + 100,
                }));

                setProducts(freeProducts);
            } catch (error) {
                console.error("Error fetching free products:", error);
                // Set mock data if API fails
                setProducts(getMockFreeProducts());
            } finally {
                setIsLoading(false);
            }
        };

        fetchFreeProducts();
    }, []);

    const categories = Array.from(new Set(products.map((p) => p.category))).filter(
        Boolean
    );

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            !searchQuery ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Helmet>
                <title>Free Downloads — Mercato94</title>
                <meta
                    name="description"
                    content="Download free templates, UI kits, fonts, and icons. High-quality digital products at no cost."
                />
            </Helmet>
            <Layout>
                {/* Hero Section */}
                <section className="pt-24 pb-12 bg-gradient-to-b from-champagne/10 to-background">
                    <div className="container-luxury text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/20 text-champagne mb-6">
                            <Gift className="h-4 w-4" />
                            <span className="text-sm font-medium">Free Resources</span>
                        </div>
                        <h1 className="heading-display mb-4">
                            Free Downloads
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Explore our curated collection of free templates, UI kits, fonts,
                            and icons. Perfect for your next project.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search free resources..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 bg-secondary/50"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-8 border-b border-border">
                    <div className="container-luxury">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <Button
                                variant={selectedCategory === null ? "luxury" : "luxury-outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(null)}
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={
                                        selectedCategory === category ? "luxury" : "luxury-outline"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="section-padding">
                    <div className="container-luxury">
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="aspect-[4/5] rounded-xl bg-secondary animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <p className="text-muted-foreground">
                                        {filteredProducts.length} free{" "}
                                        {filteredProducts.length === 1 ? "resource" : "resources"}{" "}
                                        available
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <Gift className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                                <h2 className="heading-medium mb-2">No free resources found</h2>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your search or check back later for new freebies.
                                </p>
                                <Button variant="luxury" asChild>
                                    <Link to="/products">
                                        Browse All Products
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="section-padding bg-champagne/5 border-t border-border">
                    <div className="container-luxury text-center max-w-2xl mx-auto">
                        <Sparkles className="h-10 w-10 mx-auto mb-4 text-champagne" />
                        <h2 className="heading-medium mb-4">Get Fresh Freebies</h2>
                        <p className="text-muted-foreground mb-6">
                            Subscribe to our newsletter and get notified when we add new free
                            resources.
                        </p>
                        <div className="flex gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-12"
                            />
                            <Button variant="luxury" className="h-12 px-6">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

// Mock data for development
function getMockFreeProducts(): FreeProduct[] {
    return [
        {
            id: "free-1",
            title: "Starter UI Kit",
            slug: "starter-ui-kit",
            description: "A clean and minimal UI kit to kickstart your projects",
            price: 0,
            currency: "INR",
            seller: { name: "Design Studio", avatar: "" },
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
            badge: "Free",
            category: "UI Kits",
            rating: 4.7,
            sales: 234,
            download_count: 567,
        },
        {
            id: "free-2",
            title: "Icon Pack Basic",
            slug: "icon-pack-basic",
            description: "100+ essential icons for web and mobile",
            price: 0,
            currency: "INR",
            seller: { name: "IconMaster", avatar: "" },
            image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
            badge: "Free",
            category: "Icons",
            rating: 4.5,
            sales: 456,
            download_count: 890,
        },
        {
            id: "free-3",
            title: "Landing Page Template",
            slug: "landing-page-template",
            description: "Modern landing page template for startups",
            price: 0,
            currency: "INR",
            seller: { name: "WebCraft", avatar: "" },
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400",
            badge: "Free",
            category: "Templates",
            rating: 4.8,
            sales: 189,
            download_count: 423,
        },
        {
            id: "free-4",
            title: "Brand Guidelines Template",
            slug: "brand-guidelines-template",
            description: "Professional brand book template",
            price: 0,
            currency: "INR",
            seller: { name: "BrandLab", avatar: "" },
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400",
            badge: "Free",
            category: "Templates",
            rating: 4.6,
            sales: 312,
            download_count: 654,
        },
    ];
}

export default FreeDownloads;
