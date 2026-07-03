import ContactLinkBar from "@/components/contact/ContactLinkBar";
import ContactUsFields from "@/components/contact/ContactUsFields";
import GetInTouch from "@/components/contact/GetInTouch";

export default function ContactUsPage() {
  return (
    <div className="xl:w-[92%] w-[95%] mx-auto">
      <ContactLinkBar />
      <div className="flex md:flex-row flex-col justify-between mt-3">
        <ContactUsFields />
        <GetInTouch />
      </div>
    </div>
  );
}