import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

export default function Cookie() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — 94mercato</title>
        <meta
          name="description"
          content="Learn about how 94mercato uses cookies and similar technologies. Understand your choices regarding cookie usage on our platform."
        />
        <link rel="canonical" href="https://94mercato.com/cookie" />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs tracking-widest uppercase text-champagne">Legal</span>
              <h1 className="heading-large text-3xl md:text-4xl mt-3 mb-4">Cookie Policy</h1>
              <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This Cookie Policy explains how 94mercato uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our platform.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">3. Your Choices Regarding Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>

              <h2 className="heading-medium text-2xl mt-12 mb-4">4. Where to Find More Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can learn more about cookies at the following third-party websites:
              </p>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>
                  <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-champagne hover:text-champagne/80 transition-colors">
                    AllAboutCookies.org
                  </a>
                </li>
                <li>
                  <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-champagne hover:text-champagne/80 transition-colors">
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>

              <h2 className="heading-medium text-2xl mt-12 mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies or other technologies, please email us at{" "}
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