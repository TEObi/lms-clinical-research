import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Clinical Research Nexus',
  description: 'How Clinical Research Nexus by Exon Sciences Ltd collects, uses, and protects your personal data.',
};

const LAST_UPDATED = '1 October 2026';

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-cyan-200 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">

          <div className="card p-8 space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Who We Are</h2>
              <p>Clinical Research Nexus is operated by <strong>Exon Sciences Ltd</strong>, a company registered in England and Wales. We provide online clinical research training courses and related educational services.</p>
              <p className="mt-2">Contact: <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a></p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <p>We collect information you provide when you register, purchase a course, or contact us:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li><strong>Identity data:</strong> first name, last name, email address, country</li>
                <li><strong>Payment data:</strong> handled securely by Stripe — we never store card details</li>
                <li><strong>Usage data:</strong> courses accessed, progress, quiz results, certificates earned</li>
                <li><strong>Technical data:</strong> IP address, browser type, device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <ul className="space-y-1.5 list-disc list-inside text-sm">
                <li>To provide and manage your course access</li>
                <li>To process payments and issue receipts</li>
                <li>To issue certificates of completion</li>
                <li>To send important account and course updates</li>
                <li>To improve our platform and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Legal Basis for Processing</h2>
              <p>We process your data under the following lawful bases (UK GDPR):</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li><strong>Contract:</strong> processing necessary to deliver the services you purchased</li>
                <li><strong>Legitimate interests:</strong> improving our platform, fraud prevention</li>
                <li><strong>Consent:</strong> marketing communications (you may withdraw at any time)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data Retention</h2>
              <p>We retain your account data for as long as your account is active and for 7 years thereafter for legal and accounting purposes. You may request deletion of your account at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Your Rights Under UK GDPR</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request erasure ("right to be forgotten")</li>
                <li>Object to processing</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-3">To exercise any right, contact us at <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a></p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Cookies</h2>
              <p>We use essential cookies to keep you logged in and functional cookies to remember your preferences. We do not use advertising or tracking cookies. See our <Link href="/cookies" className="text-[#0d2233] underline">Cookie Policy</Link> for full details.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Third-Party Services</h2>
              <ul className="space-y-1.5 list-disc list-inside text-sm">
                <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0d2233] underline">stripe.com/privacy</a>)</li>
                <li><strong>AWS / Render / Vercel</strong> — cloud hosting and website delivery</li>
                <li><strong>Resend</strong> — transactional email delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p>We will notify you of material changes by email or prominent notice on our website. Continued use of the platform after changes constitutes acceptance.</p>
            </section>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-500">
              <p>Questions about your data? Contact our Data Controller at <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a></p>
            </div>

          </div>

          {/* Related links */}
          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/terms" className="text-[#0d2233] hover:underline">Terms &amp; Conditions →</Link>
            <Link href="/cookies" className="text-[#0d2233] hover:underline">Cookie Policy →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
