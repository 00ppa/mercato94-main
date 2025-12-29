import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — 94mercato</title>
        <meta
          name="description"
          content="Read 94mercato's Privacy Policy. Learn how we collect, use, and protect your personal information on our digital marketplace."
        />
        <link rel="canonical" href="https://94mercato.com/privacy" />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs tracking-widest uppercase text-champagne">Legal</span>
              <h1 className="heading-large text-3xl md:text-4xl mt-3 mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This Privacy Policy describes how 94mercato ("we," "us," or "our") collects, uses, and discloses your personal information when you use our website, products, and services.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect the following types of personal information from you:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Contact information, such as your name, email address, and phone number.</li>
                <li>Demographic information, such as your age, gender, and location.</li>
                <li>Usage information, such as your IP address, browser type, and operating system.</li>
                <li>Information you provide to us, such as when you contact us for support or participate in surveys.</li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may use your personal information for the following purposes:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>To provide and improve our products and services.</li>
                <li>To personalize your experience on our platform.</li>
                <li>To communicate with you about our products, services, and promotions.</li>
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To protect the security and integrity of our platform.</li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your personal information with third-party service providers who assist us in operating our platform and providing our services. We may also disclose your information if required by law or to protect our rights or the rights of others.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">5. Your Choices</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may opt-out of receiving promotional communications from us by following the instructions in those communications. You may also access, update, or delete your personal information by contacting us.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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