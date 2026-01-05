import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tag, Check, X, Loader2, Percent } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PromoCodeInputProps {
    onApply: (
        code: string
    ) => Promise<{ valid: boolean; discount: number; discountType: string }>;
    onRemove: () => void;
    appliedCode?: string | null;
    appliedDiscount?: number;
    discountType?: "percentage" | "fixed";
    disabled?: boolean;
}

export function PromoCodeInput({
    onApply,
    onRemove,
    appliedCode,
    appliedDiscount,
    discountType,
    disabled = false,
}: PromoCodeInputProps) {
    const [code, setCode] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        if (!code.trim()) {
            setError("Please enter a promo code");
            return;
        }

        setIsValidating(true);
        setError(null);

        try {
            const result = await onApply(code.trim().toUpperCase());

            if (result.valid) {
                toast({
                    title: "Promo code applied!",
                    description: `You saved ${result.discountType === "percentage"
                            ? `${result.discount}%`
                            : `₹${result.discount}`
                        }`,
                });
                setCode("");
            } else {
                setError("Invalid or expired promo code");
            }
        } catch {
            setError("Failed to validate promo code");
        } finally {
            setIsValidating(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleApply();
        }
    };

    if (appliedCode) {
        return (
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{appliedCode}</span>
                    <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30">
                        {discountType === "percentage"
                            ? `-${appliedDiscount}%`
                            : `-₹${appliedDiscount}`}
                    </Badge>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Label htmlFor="promo-code" className="text-sm flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Promo Code
            </Label>
            <div className="flex gap-2">
                <Input
                    id="promo-code"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={disabled || isValidating}
                    className={error ? "border-red-500" : ""}
                />
                <Button
                    variant="luxury-outline"
                    onClick={handleApply}
                    disabled={disabled || isValidating || !code.trim()}
                >
                    {isValidating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Percent className="h-4 w-4" />
                    )}
                </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
