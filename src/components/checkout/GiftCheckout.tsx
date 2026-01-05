import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Mail, User, MessageSquare, Loader2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateGiftCode } from "@/lib/licenseGenerator";

interface GiftCheckoutProps {
    productTitle: string;
    productPrice: number;
    productCurrency?: string;
    onGiftPurchase: (giftData: GiftData) => Promise<void>;
    trigger?: React.ReactNode;
}

export interface GiftData {
    recipientEmail: string;
    recipientName: string;
    personalMessage: string;
    giftCode: string;
}

export function GiftCheckout({
    productTitle,
    productPrice,
    productCurrency = "INR",
    onGiftPurchase,
    trigger,
}: GiftCheckoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recipientEmail) {
            toast({
                title: "Email required",
                description: "Please enter the recipient's email address",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const giftCode = generateGiftCode();

            await onGiftPurchase({
                recipientEmail,
                recipientName,
                personalMessage,
                giftCode,
            });

            toast({
                title: "Gift sent! 🎁",
                description: `A gift notification has been sent to ${recipientEmail}`,
            });

            setIsOpen(false);
            resetForm();
        } catch (error) {
            toast({
                title: "Failed to send gift",
                description: "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRecipientEmail("");
        setRecipientName("");
        setPersonalMessage("");
    };

    const formatPrice = (amount: number, currency: string) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(amount);

    const defaultTrigger = (
        <Button variant="luxury-outline" size="sm" className="gap-2">
            <Gift className="h-4 w-4" />
            Gift This
        </Button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-champagne" />
                        Send as Gift
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {/* Product Info */}
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                        <p className="font-medium mb-1">{productTitle}</p>
                        <p className="text-champagne font-medium">
                            {formatPrice(productPrice, productCurrency)}
                        </p>
                    </div>

                    {/* Recipient Email */}
                    <div className="space-y-2">
                        <Label htmlFor="recipient-email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Recipient's Email *
                        </Label>
                        <Input
                            id="recipient-email"
                            type="email"
                            placeholder="friend@example.com"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Recipient Name */}
                    <div className="space-y-2">
                        <Label htmlFor="recipient-name" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Recipient's Name (optional)
                        </Label>
                        <Input
                            id="recipient-name"
                            placeholder="John"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                        />
                    </div>

                    {/* Personal Message */}
                    <div className="space-y-2">
                        <Label htmlFor="personal-message" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Personal Message (optional)
                        </Label>
                        <Textarea
                            id="personal-message"
                            placeholder="Hope you enjoy this gift! 🎉"
                            value={personalMessage}
                            onChange={(e) => setPersonalMessage(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* Info Note */}
                    <p className="text-xs text-muted-foreground">
                        The recipient will receive an email with a unique gift code to redeem
                        this product. Gift codes expire after 1 year.
                    </p>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="luxury"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Send Gift ({formatPrice(productPrice, productCurrency)})
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
