import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactFormSection from "@/components/contact/ContactFormSection";
import GetInTouchInfo from "@/components/contact/GetInTouchInfo";

export default function ContactUsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <ContactBreadcrumb />

      <div className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        {/* Contact Form - 7 Columns on Large Screens */}
        <div className="lg:col-span-7">
          <ContactFormSection />
        </div>

        {/* Info & Links - 5 Columns on Large Screens */}
        <div className="lg:col-span-5">
          <GetInTouchInfo />
        </div>
      </div>
    </main>
  );
}