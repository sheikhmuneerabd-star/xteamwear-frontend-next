import React from "react";
import Link from "next/link";
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoMailOutline, IoLogoWhatsapp } from "react-icons/io5";

export const metadata = {
  title: "Privacy Policy | Custom Teamwear & Apparel",
  description: "Read our Privacy Policy to learn how we collect, use, and protect your personal details and custom design uploads.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[2560px] mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-black uppercase tracking-widest mb-3">
            <IoShieldCheckmarkOutline className="text-sm" /> Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
            Last Updated: August 2026 &bull; Effective Immediately
          </p>
        </div>

        {/* Intro */}
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            Welcome to our online store. We value your trust and are committed to protecting your personal information and design assets. This Privacy Policy explains how we collect, use, disclose, and safeguard your details when you visit our website, submit custom team logo assets, build player rosters, or purchase custom athletic apparel.
          </p>
          <p>
            By using our website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-black">1</span>
            Information We Collect
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-8">
            <p>We collect several types of information to provide and improve our services to you:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Personal Contact Information:</strong> Your name, email address, phone number, and shipping/billing address when placing an order.</li>
              <li><strong>Customisation & Design Data:</strong> Team names, custom notes, player roster details (names, numbers, sizes), and uploaded vector artwork/logos.</li>
              <li><strong>Payment Details:</strong> Encrypted payment transactions through secure third-party payment gateways (we do not store raw credit card details on our servers).</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, cookies, and device information to optimize web performance and user experience.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-black">2</span>
            How We Use Your Information & Design Assets
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-8">
            <p>Your details are used strictly to fulfill sportswear production and customer service requests:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>To process team customization, sublimation printing, and player roster orders.</li>
              <li>To generate free design mockups and communicate via email or WhatsApp regarding proof approvals.</li>
              <li>To dispatch orders via express tracked courier services.</li>
              <li>To prevent fraudulent transactions and improve web security.</li>
            </ul>
            <p className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs font-semibold mt-2">
              <strong>Note on Custom Logos:</strong> We respect your intellectual property. Uploaded crests, corporate logos, and custom artwork are exclusively used to print your requested products and will never be resold or distributed to third parties.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-black">3</span>
            Data Security & Protection
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-8">
            <p className="flex items-start gap-2">
              <IoLockClosedOutline className="text-xl text-amber-600 shrink-0 mt-0.5" />
              <span>
                We implement industry-standard SSL encryption and modern security protocols to ensure that your personal data and uploaded files remain secure against unauthorized access, loss, or alteration.
              </span>
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-black">4</span>
            Cookies Policy
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
            <p>
              We use cookies to maintain your shopping roster cart state, remember selected custom colors/sizes, and analyze website traffic. You can disable cookies through your browser settings, though some functional customizer features may be limited.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-black">5</span>
            Your Data Rights
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8 space-y-2">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate information or deletion of your design assets/rosters from our database.</li>
              <li>Opt-out of any promotional email newsletters at any time.</li>
            </ul>
          </div>
        </section>

        {/* Contact Footer */}
        <div className="border-t border-slate-100 pt-6 mt-8">
          <div className="bg-slate-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black uppercase text-amber-400">Questions About Privacy?</h3>
              <p className="text-xs text-slate-400 mt-1">Contact our data protection and customer support team directly.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="mailto:support@yourdomain.com"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all"
              >
                <IoMailOutline className="text-amber-400 text-base" /> Email Support
              </a>
              <Link 
                href="/cart"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase rounded-xl transition-all"
              >
                Back to Store
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}