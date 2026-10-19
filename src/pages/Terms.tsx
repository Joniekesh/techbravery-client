import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using our services, you accept and agree to
                  be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily use our services for
                  personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
                <p>
                  The materials on our website are provided on an 'as is' basis.
                  We make no warranties, expressed or implied.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
                <p>
                  In no event shall Techbravery or its suppliers be liable for
                  any damages arising out of the use or inability to use our
                  services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  5. Contact Information
                </h2>
                <p>
                  If you have questions about these Terms of Service, please
                  contact us at hello@techbravery.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
