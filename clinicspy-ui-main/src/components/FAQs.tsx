import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string | null;
}

interface FAQProps {
  people_also_ask: FAQ[];
}

const FAQs: React.FC<FAQProps> = ({ people_also_ask }) => {
  return (
    <div className="w-full container lg:p-10 p-4">
      <Accordion type="single" collapsible>
        {people_also_ask &&
          people_also_ask?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer ? faq.answer : "Answer not available."}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
