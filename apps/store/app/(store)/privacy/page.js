export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm">Last updated: March 29, 2026</p>
      </div>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            1. Information We Collect
          </h2>
          <p>
            When you use TechNest, we collect information you provide directly —
            such as your name, email address, and payment details when you place
            an order. We also collect usage data such as pages visited, products
            viewed, and actions taken on the site to improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to process and fulfill your
            orders, send order confirmations and updates, improve our platform
            and product recommendations, and communicate with you about
            promotions or account activity. We do not sell your personal
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            3. Payment Information
          </h2>
          <p>
            All payments are processed securely through Stripe. TechNest does
            not store your credit card number or payment details on our servers.
            Stripe handles all payment data in compliance with PCI-DSS
            standards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Cookies</h2>
          <p>
            We use cookies to keep you logged in and to remember your cart
            between sessions. These are strictly necessary for the site to
            function. We do not use third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            5. Data Retention
          </h2>
          <p>
            We retain your account and order data for as long as your account is
            active or as needed to provide services. You may request deletion of
            your account and associated data at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal data
            at any time. To exercise these rights, please contact us at
            privacy@technest.com. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes by posting the new policy on this page
            with an updated date. Continued use of TechNest after changes
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">8. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, you can reach
            us at <span className="text-blue-600">privacy@technest.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
