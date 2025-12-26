import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
    priceRange: [number, number];
    minRating: number;
    sortBy: string;
}

interface FilterPanelProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    maxPrice?: number;
    className?: string;
}

const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "sales", label: "Best Selling" },
];

const ratingOptions = [0, 3, 3.5, 4, 4.5];

export function FilterPanel({
    filters,
    onFiltersChange,
    maxPrice = 10000,
    className,
}: FilterPanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handlePriceChange = (value: number[]) => {
        onFiltersChange({
            ...filters,
            priceRange: [value[0], value[1]] as [number, number],
        });
    };

    const handleRatingChange = (rating: number) => {
        onFiltersChange({
            ...filters,
            minRating: rating,
        });
    };

    const handleSortChange = (sortBy: string) => {
        onFiltersChange({
            ...filters,
            sortBy,
        });
    };

    const clearFilters = () => {
        onFiltersChange({
            priceRange: [0, maxPrice],
            minRating: 0,
            sortBy: "newest",
        });
    };

    const hasActiveFilters =
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < maxPrice ||
        filters.minRating > 0 ||
        filters.sortBy !== "newest";

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Sort By */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sorting" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Price Range</Label>
                    <span className="text-xs text-muted-foreground">
                        {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </span>
                </div>
                <Slider
                    value={[filters.priceRange[0], filters.priceRange[1]]}
                    onValueChange={handlePriceChange}
                    max={maxPrice}
                    min={0}
                    step={100}
                    className="py-2"
                />
            </div>

            {/* Minimum Rating */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Minimum Rating</Label>
                <div className="flex flex-wrap gap-2">
                    {ratingOptions.map((rating) => (
                        <Button
                            key={rating}
                            variant={filters.minRating === rating ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleRatingChange(rating)}
                            className="flex items-center gap-1"
                        >
                            {rating === 0 ? (
                                "Any"
                            ) : (
                                <>
                                    <Star className="h-3 w-3 fill-current" />
                                    {rating}+
                                </>
                            )}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full text-muted-foreground"
                >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Sort dropdown - always visible */}
            <div className="hidden md:block">
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Filter button - opens sheet on mobile, popover on desktop */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="relative">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {hasActiveFilters && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-champagne text-midnight text-xs flex items-center justify-center">
                                !
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterContent />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export const defaultFilters: FilterState = {
    priceRange: [0, 10000],
    minRating: 0,
    sortBy: "newest",
};
