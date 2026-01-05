import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Download,
    TrendingUp,
    Globe,
    Calendar,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

interface DownloadData {
    date: string;
    downloads: number;
}

interface GeographicData {
    country: string;
    code: string;
    downloads: number;
    percentage: number;
}

interface ProductDownload {
    productId: number;
    productTitle: string;
    downloads: number;
    trend: number; // percentage change
}

interface DownloadAnalyticsProps {
    dailyData?: DownloadData[];
    weeklyData?: DownloadData[];
    monthlyData?: DownloadData[];
    geographicData?: GeographicData[];
    topProducts?: ProductDownload[];
    totalDownloads?: number;
    periodChange?: number; // percentage change from previous period
}

const COLORS = ["#d4af37", "#a08529", "#ffd966", "#c9b458", "#8b7355"];

const mockDailyData: DownloadData[] = [
    { date: "Mon", downloads: 45 },
    { date: "Tue", downloads: 52 },
    { date: "Wed", downloads: 38 },
    { date: "Thu", downloads: 65 },
    { date: "Fri", downloads: 48 },
    { date: "Sat", downloads: 72 },
    { date: "Sun", downloads: 58 },
];

const mockGeoData: GeographicData[] = [
    { country: "India", code: "IN", downloads: 1250, percentage: 42 },
    { country: "United States", code: "US", downloads: 680, percentage: 23 },
    { country: "United Kingdom", code: "GB", downloads: 420, percentage: 14 },
    { country: "Germany", code: "DE", downloads: 320, percentage: 11 },
    { country: "Other", code: "OT", downloads: 290, percentage: 10 },
];

const mockTopProducts: ProductDownload[] = [
    { productId: 1, productTitle: "Modern Dashboard UI Kit", downloads: 234, trend: 12 },
    { productId: 2, productTitle: "Icon Pack Pro", downloads: 189, trend: -5 },
    { productId: 3, productTitle: "Landing Page Template", downloads: 156, trend: 28 },
    { productId: 4, productTitle: "E-commerce Theme", downloads: 98, trend: 8 },
];

export function DownloadAnalytics({
    dailyData = mockDailyData,
    geographicData = mockGeoData,
    topProducts = mockTopProducts,
    totalDownloads = 2960,
    periodChange = 15.3,
}: DownloadAnalyticsProps) {
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-champagne/20">
                            <Download className="h-5 w-5 text-champagne" />
                        </div>
                        <span className="text-sm text-muted-foreground">Total Downloads</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-serif font-medium">
                            {totalDownloads.toLocaleString()}
                        </span>
                        <Badge
                            variant="outline"
                            className={`${periodChange >= 0
                                    ? "bg-green-500/10 text-green-500 border-green-500/30"
                                    : "bg-red-500/10 text-red-500 border-red-500/30"
                                }`}
                        >
                            {periodChange >= 0 ? (
                                <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                                <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(periodChange)}%
                        </Badge>
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-champagne/20">
                            <TrendingUp className="h-5 w-5 text-champagne" />
                        </div>
                        <span className="text-sm text-muted-foreground">Avg. Daily</span>
                    </div>
                    <span className="text-3xl font-serif font-medium">
                        {Math.round(totalDownloads / 30)}
                    </span>
                </div>

                <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-champagne/20">
                            <Globe className="h-5 w-5 text-champagne" />
                        </div>
                        <span className="text-sm text-muted-foreground">Top Region</span>
                    </div>
                    <span className="text-3xl font-serif font-medium">
                        {geographicData[0]?.country || "N/A"}
                    </span>
                </div>
            </div>

            {/* Time Range Toggle */}
            <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Download Trends
                </h3>
                <div className="flex gap-2">
                    {(["7d", "30d", "90d"] as const).map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? "luxury" : "luxury-outline"}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                        >
                            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Downloads Chart */}
            <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={dailyData}>
                        <defs>
                            <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                borderRadius: "8px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="downloads"
                            stroke="#d4af37"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#downloadGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Geographic & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Breakdown */}
                <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-champagne" />
                        Geographic Breakdown
                    </h4>
                    <div className="flex items-center gap-6">
                        <div className="w-40 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={geographicData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        dataKey="downloads"
                                    >
                                        {geographicData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 space-y-2">
                            {geographicData.map((item, index) => (
                                <div key={item.country} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-sm">{item.country}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-champagne" />
                        Top Downloaded Products
                    </h4>
                    <div className="space-y-3">
                        {topProducts.map((product, index) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-champagne/20 flex items-center justify-center text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium truncate max-w-[200px]">
                                        {product.productTitle}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">{product.downloads}</span>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${product.trend >= 0
                                                ? "bg-green-500/10 text-green-500 border-green-500/30"
                                                : "bg-red-500/10 text-red-500 border-red-500/30"
                                            }`}
                                    >
                                        {product.trend >= 0 ? "+" : ""}
                                        {product.trend}%
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
