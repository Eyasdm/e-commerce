export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm">Last updated: March 29, 2026</p>
      </div>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TechNest, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            the platform. TechNest is a portfolio project built to demonstrate
            full-stack e-commerce development.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            2. Use of the Platform
          </h2>
          <p>
            You may use TechNest only for lawful purposes and in accordance with
            these terms. You agree not to use the platform to submit false or
            fraudulent orders, impersonate other users, attempt to gain
            unauthorized access to any part of the system, or engage in any
            activity that disrupts or interferes with the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately of any
            unauthorized use of your account. TechNest is not liable for any
            loss resulting from unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            4. Orders and Payments
          </h2>
          <p>
            All orders are subject to availability. We reserve the right to
            refuse or cancel any order at any time. Prices are displayed in USD
            and are subject to change without notice. Payment is processed
            securely through Stripe at the time of checkout.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            5. Returns and Refunds
          </h2>
          <p>
            As TechNest is a portfolio demonstration platform, no physical
            products are shipped and no real transactions occur. In a production
            environment, a standard 30-day return policy would apply to all
            eligible items in original condition.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            6. Intellectual Property
          </h2>
          <p>
            All content on TechNest — including design, code, text, and images —
            is the property of TechNest or its content suppliers. You may not
            reproduce, distribute, or create derivative works without explicit
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            TechNest is provided "as is" without warranties of any kind. To the
            fullest extent permitted by law, TechNest shall not be liable for
            any indirect, incidental, or consequential damages arising from your
            use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of TechNest after changes are posted constitutes your acceptance
            of the new terms. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">9. Contact</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <span className="text-blue-600">legal@technest.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
