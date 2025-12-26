import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, ShoppingBag, Megaphone, Receipt } from "lucide-react";

interface EmailPreference {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
}

const defaultPreferences: EmailPreference[] = [
    {
        id: "order_confirmations",
        label: "Order Confirmations",
        description: "Receive email confirmations for your purchases",
        icon: <Receipt className="h-5 w-5" />,
        enabled: true,
    },
    {
        id: "payout_alerts",
        label: "Payout Alerts",
        description: "Get notified when you receive payments (sellers only)",
        icon: <ShoppingBag className="h-5 w-5" />,
        enabled: true,
    },
    {
        id: "product_updates",
        label: "Product Updates",
        description: "Updates about products you've purchased",
        icon: <Bell className="h-5 w-5" />,
        enabled: true,
    },
    {
        id: "marketing",
        label: "Marketing Emails",
        description: "Promotions, new features, and marketplace news",
        icon: <Megaphone className="h-5 w-5" />,
        enabled: false,
    },
    {
        id: "newsletter",
        label: "Weekly Newsletter",
        description: "Curated content and top products of the week",
        icon: <Mail className="h-5 w-5" />,
        enabled: false,
    },
];

export function EmailPreferences() {
    const [preferences, setPreferences] = useState<EmailPreference[]>(defaultPreferences);

    const handleToggle = (id: string) => {
        setPreferences((prev) =>
            prev.map((pref) =>
                pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
            )
        );
        // In production, this would save to the backend
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Preferences
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage which emails you receive from 94mercato
                </p>
            </div>

            <div className="space-y-4">
                {preferences.map((pref) => (
                    <div
                        key={pref.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-muted-foreground mt-0.5">{pref.icon}</div>
                            <div>
                                <Label htmlFor={pref.id} className="font-medium cursor-pointer">
                                    {pref.label}
                                </Label>
                                <p className="text-sm text-muted-foreground">{pref.description}</p>
                            </div>
                        </div>
                        <Switch
                            id={pref.id}
                            checked={pref.enabled}
                            onCheckedChange={() => handleToggle(pref.id)}
                        />
                    </div>
                ))}
            </div>

            <p className="text-xs text-muted-foreground">
                Note: Essential transactional emails (password resets, security alerts) will always be sent.
            </p>
        </div>
    );
}
