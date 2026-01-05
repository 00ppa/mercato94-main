import { Badge } from "@/components/ui/badge";
import { Check, X, HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LicenseFeature {
    name: string;
    standard: boolean | string;
    extended: boolean | string;
    tooltip?: string;
}

interface LicenseComparisonProps {
    standardPrice: number;
    extendedPrice: number;
    currency?: string;
    onSelectLicense?: (type: "standard" | "extended") => void;
    selectedLicense?: "standard" | "extended";
}

const defaultFeatures: LicenseFeature[] = [
    {
        name: "Personal Projects",
        standard: true,
        extended: true,
        tooltip: "Use in your personal, non-commercial projects",
    },
    {
        name: "Commercial Use",
        standard: true,
        extended: true,
        tooltip: "Use in commercial projects for clients",
    },
    {
        name: "Single End Product",
        standard: true,
        extended: true,
        tooltip: "Create one end product per license",
    },
    {
        name: "Unlimited Projects",
        standard: false,
        extended: true,
        tooltip: "Use in unlimited commercial projects",
    },
    {
        name: "SaaS / Web App",
        standard: false,
        extended: true,
        tooltip: "Include in Software-as-a-Service products",
    },
    {
        name: "Resale Products",
        standard: false,
        extended: true,
        tooltip: "Include in products you sell (templates, themes)",
    },
    {
        name: "Team Access",
        standard: "1 user",
        extended: "Unlimited",
        tooltip: "Number of team members who can use the license",
    },
];

function formatPrice(amount: number, currency: string = "INR"): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function LicenseComparison({
    standardPrice,
    extendedPrice,
    currency = "INR",
    onSelectLicense,
    selectedLicense,
}: LicenseComparisonProps) {
    const renderFeatureValue = (value: boolean | string) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="h-5 w-5 text-green-500" />
            ) : (
                <X className="h-5 w-5 text-red-400/50" />
            );
        }
        return <span className="text-sm font-medium">{value}</span>;
    };

    return (
        <TooltipProvider>
            <div className="rounded-xl border border-border overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-3 bg-secondary/50">
                    <div className="p-4 font-medium text-left">Feature</div>
                    <div
                        className={`p-4 text-center border-l border-border cursor-pointer transition-colors ${selectedLicense === "standard"
                                ? "bg-champagne/20 border-l-champagne"
                                : "hover:bg-secondary"
                            }`}
                        onClick={() => onSelectLicense?.("standard")}
                    >
                        <Badge variant="outline" className="mb-2">
                            Standard
                        </Badge>
                        <div className="text-2xl font-serif font-medium">
                            {formatPrice(standardPrice, currency)}
                        </div>
                    </div>
                    <div
                        className={`p-4 text-center border-l border-border cursor-pointer transition-colors ${selectedLicense === "extended"
                                ? "bg-champagne/20 border-l-champagne"
                                : "hover:bg-secondary"
                            }`}
                        onClick={() => onSelectLicense?.("extended")}
                    >
                        <Badge
                            variant="outline"
                            className="mb-2 bg-champagne/20 border-champagne/50"
                        >
                            Extended
                        </Badge>
                        <div className="text-2xl font-serif font-medium">
                            {formatPrice(extendedPrice, currency)}
                        </div>
                    </div>
                </div>

                {/* Feature Rows */}
                {defaultFeatures.map((feature, index) => (
                    <div
                        key={feature.name}
                        className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                            }`}
                    >
                        <div className="p-4 flex items-center gap-2">
                            <span className="text-sm">{feature.name}</span>
                            {feature.tooltip && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">{feature.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <div className="p-4 flex items-center justify-center border-l border-border">
                            {renderFeatureValue(feature.standard)}
                        </div>
                        <div className="p-4 flex items-center justify-center border-l border-border">
                            {renderFeatureValue(feature.extended)}
                        </div>
                    </div>
                ))}
            </div>
        </TooltipProvider>
    );
}
