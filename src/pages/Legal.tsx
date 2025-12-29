import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";

export default function LegalPage() {
  return (
    <>
      <Helmet>
        <title>Legal Guidelines — 94mercato</title>
        <meta
          name="description"
          content="Legal guidelines for 94mercato, a digital marketplace operated by Outbrix LLC. Understand our terms, liability limitations, and governing law."
        />
        <link rel="canonical" href="https://94mercato.com/legal" />
      </Helmet>
      <Layout>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs tracking-widest uppercase text-champagne">Legal</span>
              <h1 className="heading-large text-3xl md:text-4xl mt-3 mb-4">Legal Guidelines</h1>
              <p className="text-muted-foreground leading-relaxed">
                94Mercato is an online digital marketplace operated by Outbrix LLC, a company registered in the State of Wyoming, United States. By accessing or using this website, you agree to comply with and be bound by the following legal guidelines.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">1. General Information</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    94Mercato provides a digital platform that allows users to browse, list, buy, and sell goods or services offered by third parties. 94Mercato does not manufacture, own, or directly sell third-party products or services unless explicitly stated.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">2. Eligibility</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    By using this website, you confirm that you are at least 18 years old or the legal age in your jurisdiction and that you have the legal capacity to enter into binding agreements.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">3. User Responsibilities</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Users agree to use the platform lawfully and responsibly. Any activity involving fraud, misuse, infringement, or violation of applicable laws may result in suspension or termination of access.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">4. Marketplace Transactions</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All transactions conducted through 94Mercato are agreements solely between buyers and sellers. 94Mercato and Outbrix LLC are not parties to these transactions and do not guarantee the quality, legality, safety, or delivery of any products or services.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">5. Payments & Third-Party Services</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Payments and related services may be processed by third-party providers. 94Mercato is not responsible for errors, delays, or disputes arising from third-party services.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">6. Intellectual Property</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All content on this website, including text, graphics, logos, design elements, and software, is the property of Outbrix LLC or its licensors and is protected by applicable intellectual property laws. Unauthorized use is prohibited.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">7. Limitation of Liability</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To the fullest extent permitted by law, 94Mercato and Outbrix LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or its services.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">8. No Professional Advice</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Information provided on this website is for general informational purposes only and does not constitute legal, financial, or professional advice.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">9. Privacy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Use of 94Mercato is also governed by applicable privacy practices regarding the collection and use of information.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">10. Modifications</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    94Mercato reserves the right to modify these legal guidelines at any time. Continued use of the website constitutes acceptance of any changes.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">11. Governing Law</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These legal guidelines are governed by and interpreted in accordance with the laws of the State of Wyoming, United States.
                  </p>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-3">12. Contact</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    For legal inquiries, please contact Outbrix LLC at{" "}
                    <a href="mailto:Outbrixllc@zohomail.com" className="text-champagne hover:text-champagne/80 transition-colors">
                      Outbrixllc@zohomail.com
                    </a>.<br />
                    For support-related inquiries, please contact{" "}
                    <a href="mailto:support@94Mercato.com" className="text-champagne hover:text-champagne/80 transition-colors">
                      support@94Mercato.com
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
