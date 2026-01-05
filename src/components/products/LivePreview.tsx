import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Eye,
    Maximize2,
    Minimize2,
    Monitor,
    Tablet,
    Smartphone,
    X,
    ExternalLink,
    Loader2,
} from "lucide-react";

interface LivePreviewProps {
    previewUrl: string;
    productTitle: string;
    trigger?: React.ReactNode;
}

type DeviceFrame = "desktop" | "tablet" | "mobile";

const deviceSizes: Record<DeviceFrame, { width: string; height: string }> = {
    desktop: { width: "100%", height: "100%" },
    tablet: { width: "768px", height: "1024px" },
    mobile: { width: "375px", height: "667px" },
};

export function LivePreview({
    previewUrl,
    productTitle,
    trigger,
}: LivePreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [device, setDevice] = useState<DeviceFrame>("desktop");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const openInNewTab = () => {
        window.open(previewUrl, "_blank", "noopener,noreferrer");
    };

    const defaultTrigger = (
        <Button variant="luxury-outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Live Preview
        </Button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
            <DialogContent
                className={`${isFullscreen
                        ? "max-w-[100vw] max-h-[100vh] w-screen h-screen m-0 rounded-none"
                        : "max-w-6xl w-[95vw] h-[85vh]"
                    } flex flex-col p-0 gap-0 bg-background/95 backdrop-blur-xl`}
            >
                {/* Header */}
                <DialogHeader className="flex-shrink-0 flex flex-row items-center justify-between px-4 py-3 border-b border-border">
                    <DialogTitle className="text-lg font-medium truncate max-w-[300px]">
                        {productTitle}
                    </DialogTitle>

                    {/* Device Toggle */}
                    <div className="flex items-center gap-2 mx-auto">
                        <div className="flex items-center bg-secondary rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 ${device === "desktop" ? "bg-background shadow-sm" : ""
                                    }`}
                                onClick={() => setDevice("desktop")}
                                title="Desktop view"
                            >
                                <Monitor className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 ${device === "tablet" ? "bg-background shadow-sm" : ""
                                    }`}
                                onClick={() => setDevice("tablet")}
                                title="Tablet view"
                            >
                                <Tablet className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 ${device === "mobile" ? "bg-background shadow-sm" : ""
                                    }`}
                                onClick={() => setDevice("mobile")}
                                title="Mobile view"
                            >
                                <Smartphone className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={openInNewTab}
                            title="Open in new tab"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={toggleFullscreen}
                            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                {/* Preview Area */}
                <div className="flex-1 relative overflow-hidden bg-stone/50 flex items-center justify-center p-4">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                                <span className="text-sm text-muted-foreground">
                                    Loading preview...
                                </span>
                            </div>
                        </div>
                    )}

                    {hasError ? (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="p-4 rounded-full bg-red-500/10">
                                <X className="h-8 w-8 text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">Preview Unavailable</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This preview cannot be displayed in an iframe.
                                </p>
                                <Button onClick={openInNewTab} variant="luxury-outline">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open in New Tab
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${device === "desktop" ? "w-full h-full" : ""
                                }`}
                            style={
                                device !== "desktop"
                                    ? {
                                        width: deviceSizes[device].width,
                                        height: deviceSizes[device].height,
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                    }
                                    : undefined
                            }
                        >
                            <iframe
                                src={previewUrl}
                                title={`${productTitle} Preview`}
                                className="w-full h-full border-0"
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                                sandbox="allow-scripts allow-same-origin"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
