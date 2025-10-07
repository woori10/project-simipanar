import AppLayout from '@/Components/Layout/AppLayout';
import { ChevronDownIcon } from "@icons";
import { useState } from "react";


const faqs = [
  {
    question: "Do I get free updates?",
    answer:
      "Yes, you will get free updates for all future improvements and bug fixes as long as the product is maintained.",
  },
  {
    question: "Can I Customize TailAdmin to suit my needs?",
    answer:
      "Absolutely! TailAdmin is built with TailwindCSS and is highly customizable to match your project requirements.",
  },
  {
    question: "What does Unlimited Projects mean?",
    answer:
      "It means you can use this template in as many projects as you want without any limitation.",
  },
  {
    question: "Is TailAdmin suitable for production apps?",
    answer:
      "Yes, TailAdmin is fully production-ready and optimized for scalability and maintainability.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppLayout>
        <h1 className="text-xl font-bold">FAQ</h1>
       <div className="bg-gray-50 min-h-screen">
        <div className="py-6">
            <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                    <span className="font-medium text-gray-800">
                    {faq.question}
                    </span>
                    <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                    }`}
                    />
                </button>

                {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                )}
                </div>
            ))}
            </div>
        </div>
        </div>
    </AppLayout>
  );
}

