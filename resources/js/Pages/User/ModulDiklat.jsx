import AppLayout from '@/Components/Layout/AppLayout';
import { ChevronDownIcon } from "@icons";
import { useState } from "react";


const materi = [
  {
    question: "Ion Scan 500DT",
    answer:
      "Nanti ini isinya pdf materi",
  },
  {
    question: "Sabre 5000",
    answer:
      "Nanti ini isinya pdf materi",
  },
  {
    question: "Hamzat ID",
    answer:
      "Nanti ini isinya pdf materi",
  },
  {
    question: "Narkotes",
    answer:
      "Nanti ini isinya pdf materi",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppLayout>
        <h1 className="text-xl font-bold">Modul Diklat</h1>
        <div className="bg-grey-50 min-h-screen">
            <div className="py-6">
                <div className="space-y-6">
                {materi.map((materi, index) => (
                    <div
                    key={index}
                    className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                    >
                        <span className="font-medium py-2 text-gray-800">
                        {materi.question}
                        </span>
                        <ChevronDownIcon
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${
                            openIndex === index ? "rotate-180" : ""
                        }`}
                        />
                    </button>

                    {openIndex === index && (
                        <div className="px-4 pb-4 text-gray-600">{materi.answer}</div>
                    )}
                    </div>
                ))}
                </div>
            </div>
        </div>
    </AppLayout>
  );
}

