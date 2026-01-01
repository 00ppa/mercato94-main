// Shared API error handling types
import { AxiosError } from 'axios';

// Generic API error response type
export interface ApiErrorResponse {
    message?: string;
    error?: string;
}

// Type guard for axios errors
export function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
    return error instanceof Error && 'isAxiosError' in error;
}

// Get error message from unknown error
export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        return error.response?.data?.message || error.response?.data?.error || error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
}

// Common product type
export interface Product {
    id: number;
    title: string;
    slug: string;
    description?: string;
    full_description?: string;
    price: number;
    currency: string;
    category?: string;
    badge?: string;
    thumbnail_url?: string;
    images?: string[];
    features?: string[];
    tags?: string[];
    status: 'pending' | 'published' | 'rejected' | 'removed';
    rating?: number;
    seller_id: number;
    seller_name?: string;
    seller_avatar?: string;
    seller_is_verified?: boolean;
    created_at: string;
    updated_at?: string;
}

// Order types
export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    buyer_id: number;
    stripe_session_id: string;
    amount_total: string | number;
    status: 'pending' | 'paid' | 'failed';
    items: OrderItem[];
    created_at: string;
    product_title?: string;
    thumbnail_url?: string;
    seller_name?: string;
}

// User types
export interface User {
    id: number;
    email: string;
    name?: string;
    display_name: string;
    bio?: string;
    avatar_url?: string;
    website?: string;
    role: 'buyer' | 'seller' | 'admin';
    is_verified: boolean;
    balance: number;
    created_at: string;
    last_login?: string;
}

// Admin types
export interface AdminKPI {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
}

export interface AdminProduct extends Product {
    seller_email?: string;
}

export interface AdminOrder extends Order {
    buyer_name?: string;
    buyer_email?: string;
}

// Seller dashboard types
export interface SellerStats {
    totalSales: number;
    totalEarnings: number;
    totalProducts: number;
    pendingPayouts?: number;
}

export interface SellerProduct extends Product {
    sales_count?: number;
    earnings?: number;
}

// Review types
export interface Review {
    id: number;
    user_name: string;
    user_avatar?: string;
    rating: number;
    comment: string;
    created_at: string;
    verified_purchase: boolean;
}
