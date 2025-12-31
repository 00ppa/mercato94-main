import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

export default function License() {
  return (
    <>
      <Helmet>
        <title>License Agreement — 94mercato</title>
        <meta
          name="description"
          content="Understand the license terms for digital products purchased on 94mercato. Learn about Standard and Extended license rights and restrictions."
        />
        <link rel="canonical" href="https://94mercato.com/license" />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs tracking-widest uppercase text-champagne">Legal</span>
              <h1 className="heading-large text-3xl md:text-4xl mt-3 mb-4">License Agreement</h1>
              <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This License Agreement is a legal agreement between you and 94mercato for the digital products you purchase on our website. By purchasing and downloading our products, you agree to be bound by the terms of this agreement.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">1. Standard License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Standard License grants you the following rights:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Use of the product for personal, non-commercial projects.</li>
                <li>Use of the product for one (1) commercial project.</li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">2. Extended License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Extended License grants you the following rights:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Use of the product for personal, non-commercial projects.</li>
                <li>Use of the product for unlimited commercial projects.</li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">3. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under both licenses, you are strictly prohibited from:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Redistributing, reselling, or sharing the product, either for free or for profit.</li>
                <li>Including the product in a larger package for resale.</li>
                <li>Claiming ownership of the product.</li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All digital products on this website are the intellectual property of 94mercato or the respective creators. This license grants you the right to use the products, but it does not transfer ownership.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this License Agreement, please contact us at{" "}
                <a href="mailto:support@94mercato.com" className="text-champagne hover:text-champagne/80 transition-colors">
                  support@94mercato.com
                </a>.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
