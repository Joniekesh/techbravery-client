import { motion } from "framer-motion";

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  What Are Cookies
                </h2>
                <p>
                  Cookies are small text files that are used to store small
                  pieces of information. They are stored on your device when the
                  website is loaded on your browser.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  How We Use Cookies
                </h2>
                <p>
                  We use cookies to improve your experience on our website,
                  analyze usage patterns, and provide personalized content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Types of Cookies We Use
                </h2>
                <ul>
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website
                    to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    visitors interact with our website
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant
                    advertisements
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Managing Cookies
                </h2>
                <p>
                  You can control and/or delete cookies as you wish. Most web
                  browsers allow you to delete cookies and prevent them from
                  being stored.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have questions about our use of cookies, please contact
                  us at hello@techbravery.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
