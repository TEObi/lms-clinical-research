import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Clinical Research Nexus',
  description: 'Frequently asked questions about Clinical Research Nexus courses, certificates, payments, and accounts.',
};

const FAQS = [
  {
    category: 'Courses & Learning',
    items: [
      {
        q: 'How long do I have access to a course after purchasing?',
        a: 'You have lifetime access to any course you purchase. There are no time limits or expiry dates on your enrolment.',
      },
      {
        q: 'Can I study at my own pace?',
        a: 'Yes. All courses are fully self-paced. You can start, pause, and resume at any time from any device.',
      },
      {
        q: 'What do I need to complete a course?',
        a: 'You need to complete all lessons in every module and pass any module quizzes (pass mark: 70%). Once 100% of lessons are completed, your certificate is issued automatically.',
      },
      {
        q: 'Are the courses aligned to UK regulatory standards?',
        a: 'Yes. All courses are aligned to the latest MHRA guidelines, ICH GCP E6(R3), and UK post-Brexit regulatory frameworks.',
      },
      {
        q: 'Can I re-take quizzes if I fail?',
        a: 'Yes. Each quiz allows up to 3 attempts by default. If you exhaust your attempts, contact support and we can reset them.',
      },
    ],
  },
  {
    category: 'Certificates',
    items: [
      {
        q: 'When is my certificate issued?',
        a: 'Certificates are issued automatically as soon as you complete 100% of a course\'s lessons. You\'ll also receive a notification email.',
      },
      {
        q: 'How do I view and download my certificate?',
        a: 'Go to My Certificates from your dashboard or the navigation menu. Each certificate can be viewed, and the verification code can be copied or shared.',
      },
      {
        q: 'How can an employer verify my certificate?',
        a: 'Direct them to the Verify Certificate page at /certificates/verify. They enter the unique verification code shown on your certificate card and the system confirms its authenticity in real-time.',
      },
      {
        q: 'Do certificates expire?',
        a: 'Most certificates do not expire. Some specialist courses may have an expiry date (typically 2–3 years) aligned to industry re-certification norms — this is noted on the course details page.',
      },
    ],
  },
  {
    category: 'Payments & Refunds',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) processed securely via Stripe. All transactions are in GBP (£).',
      },
      {
        q: 'Is payment secure?',
        a: 'Yes. All payments are processed by Stripe, a PCI-DSS Level 1 certified payment provider. We never store your card details.',
      },
      {
        q: 'What is your refund policy?',
        a: 'We offer a 5-day money-back guarantee. If you are not satisfied within 5 days of purchase, contact support@clinicalresearchnexus.co.uk for a full refund. Refunds cannot be processed once a certificate has been issued for the course.',
      },
      {
        q: 'Can my employer pay for my course?',
        a: 'Yes. If your employer is paying, they can complete the checkout on your behalf using a company card. The receipt will be emailed to the address entered at checkout.',
      },
    ],
  },
  {
    category: 'Account & Technical',
    items: [
      {
        q: 'How do I change my password?',
        a: 'Go to Account Settings from your dashboard. You can update your password, name, and country there.',
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'Click "Forgot password?" on the login page. Enter your email and we\'ll send a secure reset link valid for 1 hour.',
      },
      {
        q: 'Can I use the platform on mobile?',
        a: 'Yes. Clinical Research Nexus is fully responsive and works on all modern smartphones and tablets.',
      },
      {
        q: 'I bought a course but can\'t access it. What do I do?',
        a: 'After payment, your enrolment is confirmed by email with a direct login link. If you can\'t access your course, first try logging in at /login. If the issue persists, contact support@clinicalresearchnexus.co.uk with your payment receipt.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0d2233] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Support</p>
          <h1 className="text-4xl font-extrabold mb-3">Frequently Asked Questions</h1>
          <p className="text-cyan-100 text-lg max-w-2xl">
            Everything you need to know about courses, certificates, payments, and your account.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-10">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest mb-4">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="card p-0 group"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                      <span className="font-semibold text-gray-900 text-sm pr-4">{item.q}</span>
                      <span className="shrink-0 w-5 h-5 rounded-full bg-gray-100 group-open:bg-[#0d2233] flex items-center justify-center transition-colors">
                        <svg className="w-3 h-3 text-gray-500 group-open:text-white transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-[#0d2233] rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-extrabold uppercase mb-2">Still have questions?</h2>
            <p className="text-cyan-300 mb-5 text-sm">
              Our support team typically responds within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#c9a84c] hover:bg-[#b8973b] text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
