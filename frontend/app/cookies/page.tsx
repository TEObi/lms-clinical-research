import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy — Clinical Research Nexus',
  description: 'How Clinical Research Nexus uses cookies and similar technologies.',
};

const LAST_UPDATED = '1 October 2026';

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="bg-[#0d2233] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold mb-2">Cookie Policy</h1>
          <p className="text-cyan-200 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. What Are Cookies?</h2>
              <p>Cookies are small text files placed on your device when you visit a website. They allow the website to remember your actions and preferences over a period of time, so you don&apos;t have to keep re-entering information when you return or navigate between pages.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Cookies We Use</h2>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#0d2233] text-white">
                      <th className="text-left px-4 py-3 font-semibold">Cookie</th>
                      <th className="text-left px-4 py-3 font-semibold">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold">Duration</th>
                      <th className="text-left px-4 py-3 font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-mono text-xs">access_token</td>
                      <td className="px-4 py-3">Keeps you logged in to your account</td>
                      <td className="px-4 py-3">Session / 15 min</td>
                      <td className="px-4 py-3"><span className="badge badge-green">Essential</span></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">refresh_token</td>
                      <td className="px-4 py-3">Renews your login session automatically</td>
                      <td className="px-4 py-3">7 days</td>
                      <td className="px-4 py-3"><span className="badge badge-green">Essential</span></td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-mono text-xs">cart</td>
                      <td className="px-4 py-3">Remembers items you have added to your cart</td>
                      <td className="px-4 py-3">7 days</td>
                      <td className="px-4 py-3"><span className="badge badge-green">Essential</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Cookies We Do Not Use</h2>
              <p>We do <strong>not</strong> use:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
                <li>Advertising or tracking cookies</li>
                <li>Social media tracking pixels</li>
                <li>Third-party analytics cookies (e.g. Google Analytics)</li>
                <li>Fingerprinting or behavioural profiling technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Managing Cookies</h2>
              <p>All cookies used on this platform are <strong>essential</strong> to its operation. You can delete them at any time through your browser settings, but doing so will log you out of your account.</p>
              <p className="mt-3">Most browsers allow you to:</p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-sm">
                <li>View and delete cookies through browser developer tools</li>
                <li>Block cookies entirely (note: this will prevent login)</li>
                <li>Set cookie expiry preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Changes to This Policy</h2>
              <p>We may update this Cookie Policy from time to time. Any significant changes will be notified via email or a notice on our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Contact</h2>
              <p>Questions about our use of cookies? Contact us at <a href="mailto:support@clinicalresearchnexus.co.uk" className="text-[#0d2233] underline">support@clinicalresearchnexus.co.uk</a></p>
            </section>

          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/privacy" className="text-[#0d2233] hover:underline">Privacy Policy →</Link>
            <Link href="/terms" className="text-[#0d2233] hover:underline">Terms &amp; Conditions →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
