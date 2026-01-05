import { History, Download, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Version {
    id: number;
    version_number: string;
    changelog: string;
    file_url: string;
    file_size_bytes?: number;
    created_at: string;
    is_current?: boolean;
}

interface VersionHistoryProps {
    versions: Version[];
    onDownload?: (version: Version) => void;
    currentVersionId?: number;
}

function formatFileSize(bytes?: number): string {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateString));
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

export function VersionHistory({
    versions,
    onDownload,
    currentVersionId,
}: VersionHistoryProps) {
    if (!versions || versions.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No version history available</p>
            </div>
        );
    }

    const sortedVersions = [...versions].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <History className="h-5 w-5 text-champagne" />
                <h3 className="font-medium">Version History</h3>
                <Badge variant="outline" className="text-xs">
                    {versions.length} {versions.length === 1 ? "version" : "versions"}
                </Badge>
            </div>

            <div className="space-y-3">
                {sortedVersions.map((version, index) => {
                    const isCurrent =
                        version.is_current || version.id === currentVersionId || index === 0;

                    return (
                        <div
                            key={version.id}
                            className={`relative p-4 rounded-lg border transition-colors ${isCurrent
                                    ? "border-champagne/50 bg-champagne/5"
                                    : "border-border bg-secondary/20 hover:bg-secondary/40"
                                }`}
                        >
                            {/* Version indicator line */}
                            {index < sortedVersions.length - 1 && (
                                <div className="absolute left-6 top-[60px] bottom-[-12px] w-px bg-border" />
                            )}

                            <div className="flex items-start gap-3">
                                {/* Version dot */}
                                <div
                                    className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${isCurrent ? "bg-champagne" : "bg-muted-foreground/30"
                                        }`}
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">v{version.version_number}</span>
                                        {isCurrent && (
                                            <Badge className="bg-champagne/20 text-champagne border-champagne/30 text-xs">
                                                Current
                                            </Badge>
                                        )}
                                        {version.file_size_bytes && (
                                            <span className="text-xs text-muted-foreground">
                                                {formatFileSize(version.file_size_bytes)}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-2">
                                        {formatDate(version.created_at)} • {formatTimeAgo(version.created_at)}
                                    </p>

                                    {version.changelog && (
                                        <div className="text-sm space-y-1 mb-3">
                                            <p className="text-muted-foreground font-medium">What's new:</p>
                                            <p className="text-muted-foreground whitespace-pre-line">
                                                {version.changelog}
                                            </p>
                                        </div>
                                    )}

                                    {onDownload && (
                                        <Button
                                            variant="luxury-outline"
                                            size="sm"
                                            onClick={() => onDownload(version)}
                                            className="gap-2"
                                        >
                                            <Download className="h-3 w-3" />
                                            {isCurrent ? "Download Latest" : "Download"}
                                            <ArrowRight className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
