import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    FileType,
    Download,
    Check,
    Figma,
    Layers,
    FileImage,
} from "lucide-react";

interface FileFormat {
    id: string;
    format: string;
    displayName: string;
    fileUrl: string;
    fileSize?: number;
}

interface FileFormatsProps {
    formats: FileFormat[];
    onDownload?: (format: FileFormat) => void;
}

const formatIcons: Record<string, React.ReactNode> = {
    figma: <Figma className="h-4 w-4" />,
    sketch: <Layers className="h-4 w-4" />,
    psd: <FileImage className="h-4 w-4" />,
    ai: <FileType className="h-4 w-4" />,
    xd: <FileType className="h-4 w-4" />,
    html: <FileType className="h-4 w-4" />,
    css: <FileType className="h-4 w-4" />,
    font: <FileType className="h-4 w-4" />,
};

const formatColors: Record<string, string> = {
    figma: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    sketch: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    psd: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    ai: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    xd: "bg-pink-500/10 text-pink-500 border-pink-500/30",
    html: "bg-red-500/10 text-red-500 border-red-500/30",
    css: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    font: "bg-green-500/10 text-green-500 border-green-500/30",
};

function formatFileSize(bytes?: number): string {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileFormats({ formats, onDownload }: FileFormatsProps) {
    const [downloadedFormats, setDownloadedFormats] = useState<Set<string>>(
        new Set()
    );

    const handleDownload = (format: FileFormat) => {
        setDownloadedFormats((prev) => new Set(prev).add(format.id));
        onDownload?.(format);
    };

    if (!formats || formats.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
                Included Formats
            </h3>
            <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                    <Badge
                        key={format.id}
                        variant="outline"
                        className={`gap-1.5 py-1.5 px-3 cursor-default ${formatColors[format.format.toLowerCase()] || "bg-secondary"
                            }`}
                    >
                        {formatIcons[format.format.toLowerCase()] || (
                            <FileType className="h-4 w-4" />
                        )}
                        {format.displayName || format.format.toUpperCase()}
                        {format.fileSize && (
                            <span className="text-xs opacity-70">
                                ({formatFileSize(format.fileSize)})
                            </span>
                        )}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

interface FileFormatsDownloadProps {
    formats: FileFormat[];
    isPurchased: boolean;
    onDownload?: (format: FileFormat) => void;
}

export function FileFormatsDownload({
    formats,
    isPurchased,
    onDownload,
}: FileFormatsDownloadProps) {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [downloadedFormats, setDownloadedFormats] = useState<Set<string>>(
        new Set()
    );

    const handleDownload = async (format: FileFormat) => {
        if (!isPurchased) return;

        setDownloadingId(format.id);

        try {
            // Simulate download delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            setDownloadedFormats((prev) => new Set(prev).add(format.id));
            onDownload?.(format);
        } finally {
            setDownloadingId(null);
        }
    };

    if (!formats || formats.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
                <Download className="h-4 w-4 text-champagne" />
                Download Files
            </h3>

            <div className="space-y-2">
                {formats.map((format) => {
                    const isDownloaded = downloadedFormats.has(format.id);
                    const isDownloading = downloadingId === format.id;

                    return (
                        <div
                            key={format.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-2 rounded-lg ${formatColors[format.format.toLowerCase()] || "bg-secondary"
                                        }`}
                                >
                                    {formatIcons[format.format.toLowerCase()] || (
                                        <FileType className="h-4 w-4" />
                                    )}
                                </div>
                                <div>
                                    <span className="font-medium">
                                        {format.displayName || format.format.toUpperCase()}
                                    </span>
                                    {format.fileSize && (
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(format.fileSize)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant={isDownloaded ? "ghost" : "luxury-outline"}
                                size="sm"
                                onClick={() => handleDownload(format)}
                                disabled={!isPurchased || isDownloading}
                                className={isDownloaded ? "text-green-500" : ""}
                            >
                                {isDownloading ? (
                                    <span className="animate-pulse">Downloading...</span>
                                ) : isDownloaded ? (
                                    <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Downloaded
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                    </>
                                )}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
