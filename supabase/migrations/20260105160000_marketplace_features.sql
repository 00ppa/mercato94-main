-- Mercato94 Marketplace Features Migration
-- Phase 1-4: Complete feature set

-- =============================================
-- PHASE 1: Core Marketplace Essentials
-- =============================================

-- 1.1 Download Counter & Analytics
CREATE TABLE IF NOT EXISTS public.product_downloads (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT,
  country_code TEXT,
  version_id INTEGER
);

CREATE INDEX idx_product_downloads_product ON public.product_downloads(product_id);
CREATE INDEX idx_product_downloads_date ON public.product_downloads(downloaded_at);

-- 1.2 License System
CREATE TABLE IF NOT EXISTS public.licenses (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  license_key TEXT UNIQUE NOT NULL,
  license_type TEXT CHECK (license_type IN ('standard', 'extended')) DEFAULT 'standard',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_licenses_user ON public.licenses(user_id);
CREATE INDEX idx_licenses_product ON public.licenses(product_id);

-- 1.3 Product Preview URLs
-- (Adding columns to existing products concept)

-- =============================================
-- PHASE 2: Seller Tools
-- =============================================

-- 2.1 Version History
CREATE TABLE IF NOT EXISTS public.product_versions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  version_number TEXT NOT NULL,
  changelog TEXT,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_current BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_product_versions_product ON public.product_versions(product_id);

-- 2.2 Promo Codes
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id SERIAL PRIMARY KEY,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')) DEFAULT 'percentage',
  discount_value DECIMAL(10, 2) NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  product_ids INTEGER[], -- NULL = applies to all seller products
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_promo_codes_seller ON public.promo_codes(seller_id);
CREATE INDEX idx_promo_codes_code ON public.promo_codes(code);

-- 2.3 Product Files (Multiple Formats)
CREATE TABLE IF NOT EXISTS public.product_files (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  format TEXT NOT NULL, -- 'figma', 'sketch', 'psd', 'ai', 'xd', 'html', 'css', 'font'
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_files_product ON public.product_files(product_id);

-- =============================================
-- PHASE 3: Buyer Experience
-- =============================================

-- 3.1 Product Bundles
CREATE TABLE IF NOT EXISTS public.bundles (
  id SERIAL PRIMARY KEY,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bundle_products (
  bundle_id INTEGER REFERENCES public.bundles(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (bundle_id, product_id)
);

-- 3.2 Gift Purchases
CREATE TABLE IF NOT EXISTS public.gift_purchases (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  personal_message TEXT,
  gift_code TEXT UNIQUE NOT NULL,
  redeemed_at TIMESTAMPTZ,
  redeemed_by UUID REFERENCES auth.users(id),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gift_purchases_code ON public.gift_purchases(gift_code);
CREATE INDEX idx_gift_purchases_recipient ON public.gift_purchases(recipient_email);

-- =============================================
-- PHASE 4: Trust & Engagement
-- =============================================

-- 4.1 Seller Following
CREATE TABLE IF NOT EXISTS public.seller_followers (
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, seller_id)
);

-- 4.2 Notification Preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email_new_products BOOLEAN DEFAULT TRUE,
  email_weekly_digest BOOLEAN DEFAULT TRUE,
  email_promotions BOOLEAN DEFAULT FALSE,
  email_version_updates BOOLEAN DEFAULT TRUE,
  push_enabled BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4.3 Affiliate System
CREATE TABLE IF NOT EXISTS public.affiliate_links (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  affiliate_code TEXT UNIQUE NOT NULL,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.affiliate_payouts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'paid', 'failed')) DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  payout_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ENABLE RLS ON ALL NEW TABLES
-- =============================================

ALTER TABLE public.product_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES
-- =============================================

-- Product Downloads: Sellers see their product downloads, buyers see their own
CREATE POLICY "Users can view their own downloads"
  ON public.product_downloads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all downloads"
  ON public.product_downloads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert downloads"
  ON public.product_downloads FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Licenses: Users see their own licenses
CREATE POLICY "Users can view their own licenses"
  ON public.licenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert licenses"
  ON public.licenses FOR INSERT
  WITH CHECK (TRUE);

-- Product Versions: Public read for current versions
CREATE POLICY "Anyone can view product versions"
  ON public.product_versions FOR SELECT
  USING (TRUE);

-- Promo Codes: Sellers manage their own codes
CREATE POLICY "Sellers can manage their promo codes"
  ON public.promo_codes FOR ALL
  USING (auth.uid() = seller_id);

CREATE POLICY "Anyone can read active promo codes for validation"
  ON public.promo_codes FOR SELECT
  USING (is_active = TRUE);

-- Product Files: Public read
CREATE POLICY "Anyone can view product files"
  ON public.product_files FOR SELECT
  USING (TRUE);

-- Bundles: Public read, seller manage
CREATE POLICY "Anyone can view active bundles"
  ON public.bundles FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Sellers can manage their bundles"
  ON public.bundles FOR ALL
  USING (auth.uid() = seller_id);

-- Bundle Products: Public read
CREATE POLICY "Anyone can view bundle products"
  ON public.bundle_products FOR SELECT
  USING (TRUE);

-- Gift Purchases: Senders and recipients see their gifts
CREATE POLICY "Senders can view their gifts"
  ON public.gift_purchases FOR SELECT
  USING (auth.uid() = sender_id);

CREATE POLICY "Authenticated users can create gifts"
  ON public.gift_purchases FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Seller Followers
CREATE POLICY "Users can manage their follows"
  ON public.seller_followers FOR ALL
  USING (auth.uid() = follower_id);

CREATE POLICY "Sellers can see their followers"
  ON public.seller_followers FOR SELECT
  USING (auth.uid() = seller_id);

-- Notification Preferences
CREATE POLICY "Users can manage their notification preferences"
  ON public.notification_preferences FOR ALL
  USING (auth.uid() = user_id);

-- Affiliate Links
CREATE POLICY "Users can manage their affiliate links"
  ON public.affiliate_links FOR ALL
  USING (auth.uid() = user_id);

-- Affiliate Payouts
CREATE POLICY "Users can view their payouts"
  ON public.affiliate_payouts FOR SELECT
  USING (auth.uid() = user_id);

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to generate unique license key
CREATE OR REPLACE FUNCTION public.generate_license_key()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := 'M94-';
  i INTEGER;
  j INTEGER;
BEGIN
  FOR j IN 1..3 LOOP
    FOR i IN 1..4 LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    IF j < 3 THEN
      result := result || '-';
    END IF;
  END LOOP;
  RETURN result;
END;
$$;

-- Function to generate affiliate code
CREATE OR REPLACE FUNCTION public.generate_affiliate_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := 'ref_';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Function to generate gift code
CREATE OR REPLACE FUNCTION public.generate_gift_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := 'GIFT-';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This would update a download_count column on products if it exists
  -- For now, we track all downloads in the product_downloads table
  RETURN NEW;
END;
$$;

-- Trigger for download tracking
CREATE TRIGGER on_product_download
  AFTER INSERT ON public.product_downloads
  FOR EACH ROW EXECUTE FUNCTION public.increment_download_count();
