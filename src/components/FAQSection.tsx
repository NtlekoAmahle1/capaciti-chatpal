
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    question: "What is CAPACITI?",
    answer:
      "CAPACITI is an innovative training program designed to empower individuals with digital skills and prepare them for careers in technology.",
  },
  {
    question: "How long are CAPACITI's programs?",
    answer:
      "Program lengths vary depending on the course and specialization chosen. Most programs range from 3 to 6 months of intensive training.",
  },
  {
    question: "What kind of support do students receive?",
    answer:
      "Students receive comprehensive support including mentoring, career guidance, project-based learning, and access to industry professionals.",
  },
  {
    question: "Are there any prerequisites?",
    answer:
      "Prerequisites vary by program. Basic computer literacy and a strong motivation to learn are generally required.",
  },
];

export const FAQSection = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-capaciti-navy mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_DATA.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
