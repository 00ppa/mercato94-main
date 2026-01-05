import { Badge } from "@/components/ui/badge";
import { Shield, Star, Sparkles, Award } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type SellerTier = "new" | "rising" | "top" | "elite";

interface VerifiedBadgeProps {
    isVerified: boolean;
    tier?: SellerTier;
    showLabel?: boolean;
    size?: "sm" | "md" | "lg";
}

const tierConfig: Record<
    SellerTier,
    {
        label: string;
        icon: React.ReactNode;
        color: string;
        description: string;
    }
> = {
    new: {
        label: "New Seller",
        icon: <Sparkles className="h-3 w-3" />,
        color: "bg-gray-500/10 text-gray-500 border-gray-500/30",
        description: "Just started selling on Mercato94",
    },
    rising: {
        label: "Rising Star",
        icon: <Star className="h-3 w-3" />,
        color: "bg-blue-500/10 text-blue-500 border-blue-500/30",
        description: "50+ sales • Growing fast",
    },
    top: {
        label: "Top Seller",
        icon: <Award className="h-3 w-3" />,
        color: "bg-champagne/20 text-champagne border-champagne/30",
        description: "500+ sales • Consistently excellent",
    },
    elite: {
        label: "Elite Seller",
        icon: <Shield className="h-3 w-3 fill-current" />,
        color: "bg-purple-500/10 text-purple-500 border-purple-500/30",
        description: "2000+ sales • Verified & trusted",
    },
};

export function VerifiedBadge({
    isVerified,
    tier = "new",
    showLabel = true,
    size = "md",
}: VerifiedBadgeProps) {
    if (!isVerified && tier === "new") {
        return null;
    }

    const config = tierConfig[tier];
    const sizeClasses = {
        sm: "text-xs py-0.5 px-2",
        md: "text-xs py-1 px-2.5",
        lg: "text-sm py-1 px-3",
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge
                        variant="outline"
                        className={`gap-1 ${config.color} ${sizeClasses[size]} cursor-default`}
                    >
                        {config.icon}
                        {showLabel && config.label}
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-medium">{config.label}</p>
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

interface VerifiedCheckmarkProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function VerifiedCheckmark({
    size = "md",
    className = "",
}: VerifiedCheckmarkProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`inline-flex items-center justify-center rounded-full bg-champagne/20 p-0.5 ${className}`}
                    >
                        <Shield
                            className={`${sizeClasses[size]} text-champagne fill-champagne/30`}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Verified Seller</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
