import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star, UserPlus, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Seller {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
    productsCount?: number;
    followersCount?: number;
}

interface FollowSellerButtonProps {
    seller: Seller;
    variant?: "default" | "compact";
    onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowSellerButton({
    seller,
    variant = "default",
    onFollowChange,
}: FollowSellerButtonProps) {
    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFollow = async () => {
        if (!user) {
            toast({
                title: "Login required",
                description: "Please login to follow sellers",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // In production, this would call the API
            // await api.post(`/sellers/${seller.id}/follow`)
            await new Promise((resolve) => setTimeout(resolve, 500));

            setIsFollowing(!isFollowing);
            onFollowChange?.(!isFollowing);

            toast({
                title: isFollowing ? "Unfollowed" : "Following! 🔔",
                description: isFollowing
                    ? `You won't receive updates from ${seller.name}`
                    : `You'll get notified when ${seller.name} posts new products`,
            });
        } catch (error) {
            toast({
                title: "Failed to update follow status",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === "compact") {
        return (
            <Button
                variant={isFollowing ? "luxury" : "luxury-outline"}
                size="sm"
                onClick={handleFollow}
                disabled={isLoading}
                className="gap-2"
            >
                {isFollowing ? (
                    <>
                        <Check className="h-4 w-4" />
                        Following
                    </>
                ) : (
                    <>
                        <UserPlus className="h-4 w-4" />
                        Follow
                    </>
                )}
            </Button>
        );
    }

    return (
        <Card className="bg-secondary/30 border-border">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    {seller.avatar ? (
                        <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center">
                            <span className="text-2xl font-medium">{seller.name.charAt(0)}</span>
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-lg">{seller.name}</span>
                            {seller.isVerified && (
                                <Badge
                                    variant="outline"
                                    className="bg-champagne/20 border-champagne/30 text-xs"
                                >
                                    <Star className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            {seller.productsCount !== undefined && (
                                <span>{seller.productsCount} products</span>
                            )}
                            {seller.followersCount !== undefined && (
                                <span>{seller.followersCount} followers</span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
                <Button
                    variant={isFollowing ? "luxury" : "luxury-outline"}
                    className="w-full gap-2"
                    onClick={handleFollow}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        "..."
                    ) : isFollowing ? (
                        <>
                            <Check className="h-4 w-4" />
                            Following
                        </>
                    ) : (
                        <>
                            <UserPlus className="h-4 w-4" />
                            Follow Seller
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
