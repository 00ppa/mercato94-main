import { Download, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DownloadCounterProps {
    count: number;
    showTrending?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function DownloadCounter({
    count,
    showTrending = false,
    size = "md",
    className = "",
}: DownloadCounterProps) {
    const formatCount = (num: number): string => {
        if (num >= 10000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toLocaleString();
    };

    const sizeClasses = {
        sm: "text-xs gap-1",
        md: "text-sm gap-1.5",
        lg: "text-base gap-2",
    };

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    // Show trending badge if downloads > 100 in the context
    const isTrending = showTrending && count > 100;

    return (
        <div
            className={`flex items-center ${sizeClasses[size]} text-muted-foreground ${className}`}
        >
            <Download className={iconSizes[size]} />
            <span className="font-medium">{formatCount(count)}</span>
            <span className="hidden sm:inline">downloads</span>
            {isTrending && (
                <Badge
                    variant="outline"
                    className="ml-2 bg-green-500/10 text-green-500 border-green-500/30 text-xs"
                >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                </Badge>
            )}
        </div>
    );
}
