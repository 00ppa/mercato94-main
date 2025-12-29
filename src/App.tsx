import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AIAssistantWidget } from "@/components/ai/AIAssistantWidget";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAdmin } from "@/components/admin/RequireAdmin";

// Eagerly load Index for fast initial render
import Index from "./pages/Index";

// Lazy load other pages
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Sell = lazy(() => import("./pages/Sell"));
const SellerOnboarding = lazy(() => import("./pages/SellerOnboarding"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const DashboardUpload = lazy(() => import("./pages/DashboardUpload"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));
const BuyerDashboard = lazy(() => import("./pages/BuyerDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const SellerProfile = lazy(() => import("./pages/SellerProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Forbidden = lazy(() => import("./pages/Forbidden"));
const Cart = lazy(() => import("./pages/Cart"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));

// Legal Pages
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookie = lazy(() => import("./pages/Cookie"));
const Refund = lazy(() => import("./pages/Refund"));
const Legal = lazy(() => import("./pages/Legal"));
const License = lazy(() => import("./pages/License"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminPayouts = lazy(() => import("./pages/admin/AdminPayouts"));
const AdminDisputes = lazy(() => import("./pages/admin/AdminDisputes"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/sell/onboarding" element={<SellerOnboarding />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<SellerDashboard />} />
                <Route path="/dashboard/upload" element={<DashboardUpload />} />
                <Route path="/dashboard/edit/:productId" element={<ProductEdit />} />
                <Route path="/purchases" element={<BuyerDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller/:displayName" element={<SellerProfile />} />
                <Route path="/403" element={<Forbidden />} />
                <Route path="/purchase/success" element={<PaymentSuccess />} />
                <Route path="/purchase/cancel" element={<PaymentCancel />} />

                {/* Legal Routes */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookie" element={<Cookie />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/license" element={<License />} />

                {/* Admin Routes - Protected */}
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <RequireAdmin>
                      <AdminUsers />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <RequireAdmin>
                      <AdminProducts />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <RequireAdmin>
                      <AdminOrders />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/payouts"
                  element={
                    <RequireAdmin>
                      <AdminPayouts />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/disputes"
                  element={
                    <RequireAdmin>
                      <AdminDisputes />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <RequireAdmin>
                      <AdminSettings />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/logs"
                  element={
                    <RequireAdmin>
                      <AdminLogs />
                    </RequireAdmin>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <AIAssistantWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
