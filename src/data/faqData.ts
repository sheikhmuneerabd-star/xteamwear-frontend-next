export interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  { question: "How long does production take?", answer: "Production begins within 24 hours after order placement and typically completes within 7 days, depending on order volume." },
  { question: "What is the estimated delivery time?", answer: "Delivery usually takes 5–7 business days to USA, UK, Canada, Australia; 5–15 business days to other regions. Actual timing depends on local carriers and customs." },
  { question: "Can I cancel or change my order?", answer: "Cancellations or modifications are accepted within 24 hours of ordering. Once production starts or your item ships, changes cannot be made." },
  { question: "Do you accept returns or refunds?", answer: "Returns or refunds are granted only if the issue is our mistake (incorrect customization, sizing error, or shipping damage). Custom items cannot be returned otherwise." },
  { question: "What printing method do you use?", answer: "We use sublimation printing where your design is embedded into the fabric—resulting in vibrant, durable, fade-resistant graphics." },
  { question: "Is there a minimum order quantity?", answer: "There is no minimum order requirement – customization is available from just 1 piece." },
  { question: "Can I request design changes after ordering?", answer: "Yes—contact us within 24 hours of placing your order. If production hasn't started, we can apply your requested changes." },
  { question: "Can you produce any custom design?", answer: "Yes—we create fully bespoke designs tailored to your branding. Upload your artwork and receive a free digital proof before production." },
  { question: "Who is XTeamwear?", answer: "XTeamwear is an in-house teamwear manufacturer serving nearly one million teams worldwide. We oversee design, production, and delivery to ensure speed and quality." },
  { question: "How can I contact support?", answer: "Email us at support@xteamwear.com or message via WhatsApp. We respond within 12 hours (9 AM–6 PM EST, 7 days/week)." },
];

export default faqData;