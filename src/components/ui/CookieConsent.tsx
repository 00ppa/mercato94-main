import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container-wide">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Icon & Text */}
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-lg bg-champagne/10 shrink-0">
                                <Cookie className="h-5 w-5 text-champagne" />
                            </div>
                            <div>
                                <h3 className="font-medium text-foreground mb-1">We value your privacy</h3>
                                <p className="text-sm text-muted-foreground">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                    By clicking "Accept", you consent to our use of cookies.{" "}
                                    <a href="/cookie" className="text-champagne hover:underline">Learn more</a>
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                            <Button
                                variant="ghost"
                                onClick={handleDecline}
                                className="flex-1 md:flex-none"
                            >
                                Decline
                            </Button>
                            <Button
                                variant="luxury"
                                onClick={handleAccept}
                                className="flex-1 md:flex-none"
                            >
                                Accept Cookies
                            </Button>
                        </div>

                        {/* Close button for mobile */}
                        <button
                            onClick={handleDecline}
                            className="absolute top-3 right-3 md:hidden p-1 text-muted-foreground hover:text-foreground"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
