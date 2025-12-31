import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success("Link copied!", {
                description: "Product link copied to clipboard.",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    const openShareWindow = (shareUrl: string) => {
        window.open(shareUrl, "_blank", "width=600,height=400,menubar=no,toolbar=no");
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
                onClick={() => openShareWindow(shareLinks.twitter)}
                title="Share on Twitter"
            >
                <Twitter className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#4267B2]/10 hover:text-[#4267B2]"
                onClick={() => openShareWindow(shareLinks.facebook)}
                title="Share on Facebook"
            >
                <Facebook className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                onClick={() => openShareWindow(shareLinks.linkedin)}
                title="Share on LinkedIn"
            >
                <Linkedin className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-champagne/10 hover:text-champagne"
                onClick={copyToClipboard}
                title="Copy link"
            >
                {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Link2 className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
}
