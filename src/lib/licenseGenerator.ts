/**
 * License Key Generator Utility
 * Generates unique license keys and creates downloadable PDF licenses
 */

export interface LicenseData {
    licenseKey: string;
    purchaseDate: Date;
    buyerName: string;
    buyerEmail: string;
    productTitle: string;
    productId: number | string;
    licenseType: "standard" | "extended";
    orderId: string;
}

/**
 * Generate a unique license key in format: M94-XXXX-XXXX-XXXX
 */
export function generateLicenseKey(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segments: string[] = ["M94"];

    for (let s = 0; s < 3; s++) {
        let segment = "";
        for (let i = 0; i < 4; i++) {
            segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        segments.push(segment);
    }

    return segments.join("-");
}

/**
 * Generate a gift code in format: GIFT-XXXXXXXX
 */
export function generateGiftCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "GIFT-";

    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

/**
 * Generate an affiliate code in format: ref_xxxxxxxx
 */
export function generateAffiliateCode(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "ref_";

    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

/**
 * Generate a promo code in format: PROMO-XXXXXX
 */
export function generatePromoCode(prefix: string = "PROMO"): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = `${prefix.toUpperCase()}-`;

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

/**
 * Generate downloadable license certificate as HTML (can be converted to PDF)
 */
export function generateLicenseHTML(license: LicenseData): string {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(license.purchaseDate);

    const licenseRights =
        license.licenseType === "extended"
            ? [
                "✓ Personal and Commercial Use",
                "✓ Unlimited Projects",
                "✓ SaaS/Web App Use",
                "✓ Resale Rights",
                "✓ Unlimited Team Members",
            ]
            : [
                "✓ Personal Use",
                "✓ Single Commercial Project",
                "✓ Single End Product",
                "✗ SaaS/Web App Use",
                "✗ Resale Rights",
            ];

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>License Certificate - ${license.productTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Georgia', serif; 
      background: #1a1a1a; 
      color: #fff; 
      padding: 40px;
      min-height: 100vh;
    }
    .certificate {
      max-width: 800px;
      margin: 0 auto;
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
      border: 2px solid #d4af37;
      border-radius: 16px;
      padding: 48px;
      position: relative;
    }
    .certificate::before {
      content: '';
      position: absolute;
      inset: 8px;
      border: 1px solid #d4af37;
      border-radius: 12px;
      pointer-events: none;
      opacity: 0.3;
    }
    .header {
      text-align: center;
      border-bottom: 1px solid #333;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #d4af37;
      letter-spacing: 2px;
    }
    .title {
      font-size: 24px;
      margin-top: 16px;
      color: #fff;
    }
    .license-type {
      display: inline-block;
      background: ${license.licenseType === "extended" ? "#d4af37" : "#666"};
      color: ${license.licenseType === "extended" ? "#000" : "#fff"};
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 12px;
    }
    .content { margin: 32px 0; }
    .field {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #333;
    }
    .field-label { color: #888; font-size: 14px; }
    .field-value { font-weight: 500; }
    .license-key {
      text-align: center;
      background: #111;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 24px;
      margin: 32px 0;
    }
    .license-key-label {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .license-key-value {
      font-family: 'Consolas', monospace;
      font-size: 24px;
      color: #d4af37;
      letter-spacing: 3px;
    }
    .rights {
      background: #111;
      border-radius: 8px;
      padding: 24px;
      margin-top: 24px;
    }
    .rights-title {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
      color: #888;
    }
    .rights-list {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .rights-list li { font-size: 14px; }
    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #333;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="logo">MERCATO94</div>
      <div class="title">License Certificate</div>
      <div class="license-type">${license.licenseType} License</div>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="field-label">Product</span>
        <span class="field-value">${license.productTitle}</span>
      </div>
      <div class="field">
        <span class="field-label">Licensed To</span>
        <span class="field-value">${license.buyerName}</span>
      </div>
      <div class="field">
        <span class="field-label">Email</span>
        <span class="field-value">${license.buyerEmail}</span>
      </div>
      <div class="field">
        <span class="field-label">Purchase Date</span>
        <span class="field-value">${formattedDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Order ID</span>
        <span class="field-value">#${license.orderId}</span>
      </div>
    </div>
    
    <div class="license-key">
      <div class="license-key-label">License Key</div>
      <div class="license-key-value">${license.licenseKey}</div>
    </div>
    
    <div class="rights">
      <div class="rights-title">License Rights</div>
      <ul class="rights-list">
        ${licenseRights.map((right) => `<li>${right}</li>`).join("")}
      </ul>
    </div>
    
    <div class="footer">
      <p>This license is non-transferable and tied to the email address above.</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} Mercato94. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Download license as HTML file (can be printed to PDF)
 */
export function downloadLicenseHTML(license: LicenseData): void {
    const html = generateLicenseHTML(license);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `license-${license.licenseKey}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Validate a license key format
 */
export function validateLicenseKey(key: string): boolean {
    const pattern = /^M94-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return pattern.test(key);
}

/**
 * Validate a promo code format
 */
export function validatePromoCode(code: string): boolean {
    const pattern = /^[A-Z0-9]+-[A-Z0-9]{4,8}$/;
    return pattern.test(code);
}
