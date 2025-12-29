import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

export default function Refund() {
  return (
    <>
      <Helmet>
        <title>Refund Policy — 94mercato</title>
        <meta
          name="description"
          content="Understand 94mercato's refund policy for digital products. Learn when refunds may be granted and how to request one."
        />
        <link rel="canonical" href="https://94mercato.com/refund" />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs tracking-widest uppercase text-champagne">Legal</span>
              <h1 className="heading-large text-3xl md:text-4xl mt-3 mb-4">Refund Policy</h1>
              <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Due to the digital nature of our products, which are available for immediate download upon purchase, we generally do not offer refunds. Once a product has been purchased and downloaded, it cannot be "returned."
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">1. When a Refund May Be Granted</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe in our products and strive for customer satisfaction. We will grant refunds under the following circumstances:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>
                  <strong className="text-foreground">Technical Issues:</strong> If a digital file is corrupt and we are unable to provide you with a working version within 48 hours.
                </li>
                <li>
                  <strong className="text-foreground">Incorrect Product:</strong> If you received a different product than the one you purchased.
                </li>
                <li>
                  <strong className="text-foreground">Misleading Description:</strong> If the product was materially not as described in the product listing.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We do not issue refunds for reasons such as changing your mind, not having the correct software to open the file (when specified in the description), or if you bought the item by mistake (unless it's an accidental duplicate purchase).
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">2. How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, please contact our support team at{" "}
                <a href="mailto:support@94mercato.com" className="text-champagne hover:text-champagne/80 transition-colors">
                  support@94mercato.com
                </a>{" "}
                within 14 days of your purchase. Please include your order number, a description of the issue, and any relevant screenshots. Our team will review your request and get back to you.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">For Customers in the EU & UK</h2>
              <p className="text-muted-foreground leading-relaxed">
                By purchasing a digital product from our store, you consent to its immediate download and delivery, and you acknowledge that you thereby waive your 14-day right of withdrawal.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your satisfaction is important to us. If you have any issues or questions, please don't hesitate to reach out to us at{" "}
                <a href="mailto:support@94mercato.com" className="text-champagne hover:text-champagne/80 transition-colors">
                  support@94mercato.com
                </a>{" "}
                before requesting a refund. We are here to help.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
