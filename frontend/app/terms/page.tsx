import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Clinical Research Nexus',
  description: 'Terms and conditions for using Clinical Research Nexus by Exon Sciences Ltd.',
};

const LAST_UPDATED = '1 October 2026';

export default function TermsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold mb-2">Terms &amp; Conditions</h1>
          <p className="text-cyan-200 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By registering for or purchasing a course on Clinical Research Nexus, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. About Us</h2>
              <p>Clinical Research Nexus is operated by <strong>Exon Sciences Ltd</strong>, registered in England and Wales. Our courses are designed for professionals in clinical research, pharmacovigilance, and regulatory affairs.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Course Access</h2>
              <ul className="space-y-1.5 list-disc list-inside text-sm">
                <li>Upon successful payment, you receive <strong>lifetime access</strong> to the purchased course(s)</li>
                <li>Access is granted to the individual who purchased the course — accounts are non-transferable</li>
                <li>You may access course materials from any device using your account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Payment and Pricing</h2>
              <ul className="space-y-1.5 list-disc list-inside text-sm">
                <li>All prices are displayed in GBP (£) and include any applicable VAT</li>
                <li>Payment is processed securely via Stripe</li>
                <li>Your enrolment is confirmed only after payment has been successfully processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Refund Policy</h2>
              <p>We offer a <strong>5-day money-back guarantee</strong>. If you are not satisfied with a course, contact us within 5 days of purchase at <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a> for a full refund. Refunds will not be issued after a certificate has been awarded for the course.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
              <p>All course content — including videos, text, quizzes, and downloadable resources — is the intellectual property of Exon Sciences Ltd or its licensors. You may not:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li>Copy, reproduce, or redistribute course materials</li>
                <li>Share your account login with others</li>
                <li>Use course content for commercial purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Certificates</h2>
              <p>Certificates are issued upon successful completion of all course requirements including passing any assessments. Certificates are issued to the name on your account and are non-transferable.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li>Use the platform for any unlawful purpose</li>
                <li>Attempt to gain unauthorised access to any part of the platform</li>
                <li>Upload or transmit malicious code or content</li>
                <li>Share your account credentials with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Disclaimers</h2>
              <p>Course content is for educational purposes and does not constitute medical, legal, or regulatory advice. Always consult qualified professionals for specific guidance on your clinical trials or regulatory submissions.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Exon Sciences Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">11. Governing Law</h2>
              <p>These terms are governed by the laws of <strong>England and Wales</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">12. Changes to Terms</h2>
              <p>We reserve the right to update these terms. We will notify you of significant changes by email. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">13. Contact</h2>
              <div className="text-sm space-y-1">
                <p><strong>Exon Sciences Ltd</strong></p>
                <p>Email: <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a></p>
                <p>Website: clinicalresearchnexus.co.uk</p>
              </div>
            </section>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-500">
              <p>By using our platform you confirm you have read and agree to these Terms &amp; Conditions.</p>
            </div>

          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/privacy" className="text-[#0d2233] hover:underline">Privacy Policy →</Link>
            <Link href="/cookies" className="text-[#0d2233] hover:underline">Cookie Policy →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
