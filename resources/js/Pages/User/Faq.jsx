import AppLayout from '@/Components/Layout/UserLayout';
import { ChevronDownIcon } from "@icons";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const { faqs } = usePage().props; // Ambil data dari controller

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppLayout>
      <h1 className="text-xl font-bold mb-4">FAQ</h1>
      <div className="bg-gray-50 min-h-screen">
        <div className="space-y-4">
          {faqs.length === 0 ? (
            <p className="text-gray-500">Belum ada FAQ yang tersedia.</p>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-gray-800">
                    {faq.pertanyaan}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.jawaban}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
