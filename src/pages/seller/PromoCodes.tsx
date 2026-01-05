import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Tag,
    Plus,
    Trash2,
    Copy,
    Calendar,
    Users,
    TrendingUp,
    Loader2,
    Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generatePromoCode } from "@/lib/licenseGenerator";

interface PromoCode {
    id: number;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    maxUses: number | null;
    currentUses: number;
    validFrom: string;
    validUntil: string | null;
    isActive: boolean;
}

const SellerPromoCodes = () => {
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // New promo form state
    const [newCode, setNewCode] = useState(generatePromoCode());
    const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [maxUses, setMaxUses] = useState("");
    const [validUntil, setValidUntil] = useState("");

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const fetchPromoCodes = async () => {
        try {
            setIsLoading(true);
            // In production, fetch from API
            // const response = await api.get("/seller/promo-codes");
            // setPromoCodes(response.data);

            // Mock data
            setPromoCodes([
                {
                    id: 1,
                    code: "LAUNCH20",
                    discountType: "percentage",
                    discountValue: 20,
                    maxUses: 100,
                    currentUses: 45,
                    validFrom: "2025-12-01",
                    validUntil: "2026-02-28",
                    isActive: true,
                },
                {
                    id: 2,
                    code: "VIP50OFF",
                    discountType: "fixed",
                    discountValue: 500,
                    maxUses: 50,
                    currentUses: 12,
                    validFrom: "2025-12-15",
                    validUntil: null,
                    isActive: true,
                },
                {
                    id: 3,
                    code: "EXPIRED25",
                    discountType: "percentage",
                    discountValue: 25,
                    maxUses: 30,
                    currentUses: 30,
                    validFrom: "2025-11-01",
                    validUntil: "2025-12-31",
                    isActive: false,
                },
            ]);
        } catch (error) {
            console.error("Error fetching promo codes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCode = async () => {
        if (!discountValue) {
            toast({ title: "Please enter a discount value", variant: "destructive" });
            return;
        }

        setIsCreating(true);

        try {
            // In production, save to API
            const newPromo: PromoCode = {
                id: Date.now(),
                code: newCode,
                discountType,
                discountValue: parseFloat(discountValue),
                maxUses: maxUses ? parseInt(maxUses) : null,
                currentUses: 0,
                validFrom: new Date().toISOString().split("T")[0],
                validUntil: validUntil || null,
                isActive: true,
            };

            setPromoCodes([newPromo, ...promoCodes]);
            setIsCreateOpen(false);
            resetForm();

            toast({ title: "Promo code created!", description: `Code: ${newCode}` });
        } catch (error) {
            toast({ title: "Failed to create promo code", variant: "destructive" });
        } finally {
            setIsCreating(false);
        }
    };

    const resetForm = () => {
        setNewCode(generatePromoCode());
        setDiscountType("percentage");
        setDiscountValue("");
        setMaxUses("");
        setValidUntil("");
    };

    const handleToggleActive = (id: number) => {
        setPromoCodes(
            promoCodes.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
        );
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({ title: "Copied!", description: `${code} copied to clipboard` });
    };

    const handleDeleteCode = (id: number) => {
        setPromoCodes(promoCodes.filter((p) => p.id !== id));
        toast({ title: "Promo code deleted" });
    };

    const stats = {
        total: promoCodes.length,
        active: promoCodes.filter((p) => p.isActive).length,
        totalUses: promoCodes.reduce((acc, p) => acc + p.currentUses, 0),
    };

    return (
        <>
            <Helmet>
                <title>Promo Codes — Mercato94</title>
            </Helmet>
            <Layout>
                <section className="pt-32 pb-20 min-h-screen">
                    <div className="container-luxury max-w-5xl">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="heading-large mb-2">Promo Codes</h1>
                                <p className="text-muted-foreground">
                                    Create and manage discount codes for your products
                                </p>
                            </div>
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="luxury" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Create Code
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Create Promo Code</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                            <Label>Code</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={newCode}
                                                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                                                    placeholder="PROMO-XXXXXX"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setNewCode(generatePromoCode())}
                                                    title="Generate new code"
                                                >
                                                    <Tag className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Discount Type</Label>
                                                <Select
                                                    value={discountType}
                                                    onValueChange={(v) => setDiscountType(v as "percentage" | "fixed")}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                                                        <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Value</Label>
                                                <Input
                                                    type="number"
                                                    value={discountValue}
                                                    onChange={(e) => setDiscountValue(e.target.value)}
                                                    placeholder={discountType === "percentage" ? "20" : "500"}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Max Uses (optional)</Label>
                                                <Input
                                                    type="number"
                                                    value={maxUses}
                                                    onChange={(e) => setMaxUses(e.target.value)}
                                                    placeholder="Unlimited"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Expires On (optional)</Label>
                                                <Input
                                                    type="date"
                                                    value={validUntil}
                                                    onChange={(e) => setValidUntil(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            variant="luxury"
                                            className="w-full"
                                            onClick={handleCreateCode}
                                            disabled={isCreating}
                                        >
                                            {isCreating ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Create Promo Code
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                                <div className="flex items-center gap-2 mb-1">
                                    <Tag className="h-4 w-4 text-champagne" />
                                    <span className="text-sm text-muted-foreground">Total Codes</span>
                                </div>
                                <span className="text-2xl font-serif font-medium">{stats.total}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-muted-foreground">Active Codes</span>
                                </div>
                                <span className="text-2xl font-serif font-medium">{stats.active}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm text-muted-foreground">Total Redemptions</span>
                                </div>
                                <span className="text-2xl font-serif font-medium">{stats.totalUses}</span>
                            </div>
                        </div>

                        {/* Promo Codes List */}
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                            </div>
                        ) : promoCodes.length === 0 ? (
                            <div className="text-center py-12">
                                <Tag className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                                <h2 className="text-xl font-medium mb-2">No promo codes yet</h2>
                                <p className="text-muted-foreground mb-6">
                                    Create your first promo code to offer discounts to your customers
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {promoCodes.map((promo) => (
                                    <div
                                        key={promo.id}
                                        className={`p-4 rounded-xl border transition-colors ${promo.isActive
                                                ? "bg-secondary/30 border-border"
                                                : "bg-secondary/10 border-border/50 opacity-60"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="font-mono text-lg font-medium cursor-pointer hover:text-champagne transition-colors flex items-center gap-2"
                                                    onClick={() => handleCopyCode(promo.code)}
                                                    title="Click to copy"
                                                >
                                                    {promo.code}
                                                    <Copy className="h-4 w-4 opacity-50" />
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        promo.isActive
                                                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                                                            : "bg-gray-500/10 text-gray-500 border-gray-500/30"
                                                    }
                                                >
                                                    {promo.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <Switch
                                                    checked={promo.isActive}
                                                    onCheckedChange={() => handleToggleActive(promo.id)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDeleteCode(promo.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">
                                                {promo.discountType === "percentage"
                                                    ? `${promo.discountValue}% off`
                                                    : `₹${promo.discountValue} off`}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {promo.currentUses}
                                                {promo.maxUses ? ` / ${promo.maxUses}` : ""} uses
                                            </span>
                                            {promo.validUntil && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Expires {promo.validUntil}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default SellerPromoCodes;
