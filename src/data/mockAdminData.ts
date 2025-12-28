// Mock data for admin dashboard
export interface AdminKPI {
    id: string;
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'neutral';
}

export interface AdminPayout {
    id: string;
    sellerId: string;
    sellerName: string;
    sellerEmail: string;
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    requestedAt: string;
    processedAt?: string;
}

export interface AdminLog {
    id: string;
    timestamp: string;
    actionType: string;
    adminEmail: string;
    targetType: string;
    targetId: string;
    details: string;
    ip: string;
}

export const mockKPIs: AdminKPI[] = [
    { id: '1', label: 'Total Revenue', value: '$124,500', change: 12.5, trend: 'up' },
    { id: '2', label: 'Active Users', value: 2847, change: 8.2, trend: 'up' },
    { id: '3', label: 'Products Listed', value: 1256, change: 3.1, trend: 'up' },
    { id: '4', label: 'Pending Payouts', value: 23, change: -5.0, trend: 'down' },
    { id: '5', label: 'New Sellers', value: 45, change: 15.3, trend: 'up' },
    { id: '6', label: 'Support Tickets', value: 12, change: -20.0, trend: 'down' },
];

export const mockPayouts: AdminPayout[] = [
    {
        id: 'payout-1',
        sellerId: 'seller-1',
        sellerName: 'John Doe',
        sellerEmail: 'john@example.com',
        amount: 1250.00,
        currency: 'USD',
        status: 'pending',
        requestedAt: '2024-01-15T10:30:00Z',
    },
    {
        id: 'payout-2',
        sellerId: 'seller-2',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@example.com',
        amount: 875.50,
        currency: 'USD',
        status: 'processing',
        requestedAt: '2024-01-14T08:15:00Z',
    },
    {
        id: 'payout-3',
        sellerId: 'seller-3',
        sellerName: 'Bob Wilson',
        sellerEmail: 'bob@example.com',
        amount: 2340.00,
        currency: 'USD',
        status: 'completed',
        requestedAt: '2024-01-12T14:20:00Z',
        processedAt: '2024-01-13T09:00:00Z',
    },
    {
        id: 'payout-4',
        sellerId: 'seller-4',
        sellerName: 'Alice Brown',
        sellerEmail: 'alice@example.com',
        amount: 560.25,
        currency: 'USD',
        status: 'failed',
        requestedAt: '2024-01-10T11:45:00Z',
    },
];

export const mockLogs: AdminLog[] = [
    {
        id: 'log-1',
        timestamp: '2024-01-15T14:30:00Z',
        actionType: 'user_banned',
        adminEmail: 'admin@outbrix.com',
        targetType: 'user',
        targetId: 'user-123',
        details: 'Banned for violating terms of service',
        ip: '192.168.1.100',
    },
    {
        id: 'log-2',
        timestamp: '2024-01-15T12:15:00Z',
        actionType: 'product_flagged',
        adminEmail: 'moderator@outbrix.com',
        targetType: 'product',
        targetId: 'prod-456',
        details: 'Flagged for review - copyright concern',
        ip: '192.168.1.101',
    },
    {
        id: 'log-3',
        timestamp: '2024-01-15T10:00:00Z',
        actionType: 'payout_processed',
        adminEmail: 'finance@outbrix.com',
        targetType: 'payout',
        targetId: 'payout-789',
        details: 'Manual payout approval for $2,500',
        ip: '192.168.1.102',
    },
    {
        id: 'log-4',
        timestamp: '2024-01-14T16:45:00Z',
        actionType: 'settings_updated',
        adminEmail: 'admin@outbrix.com',
        targetType: 'system',
        targetId: 'config-main',
        details: 'Updated commission rate from 10% to 12%',
        ip: '192.168.1.100',
    },
    {
        id: 'log-5',
        timestamp: '2024-01-14T09:30:00Z',
        actionType: 'user_banned',
        adminEmail: 'moderator@outbrix.com',
        targetType: 'user',
        targetId: 'user-321',
        details: 'Temporary ban - suspicious activity detected',
        ip: '192.168.1.101',
    },
];
