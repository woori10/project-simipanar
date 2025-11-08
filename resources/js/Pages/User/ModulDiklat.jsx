import AppLayout from '@/Components/Layout/UserLayout';
import { ChevronDownIcon } from "@icons";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ModulDiklat() {
  const [openIndex, setOpenIndex] = useState(null);
  const { moduls } = usePage().props;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppLayout>
      <h1 className="text-xl font-bold">Modul Diklat</h1>
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="space-y-4">
          {moduls.length === 0 ? (
            <p className="text-gray-500 text-center">Belum ada modul diklat.</p>
          ) : (
            moduls.map((modul, index) => (
              <div
                key={index}
                className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium p-2 text-gray-800">
                    {modul.nama_alat || "Judul Modul"}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="p-4 text-gray-600 space-y-3">
                    {modul.dokumen ? (
                      <div className="w-full border rounded-lg overflow-hidden shadow-sm">
                        <iframe
                          src={modul.dokumen}
                          title={`Preview ${modul.nama_alat}`}
                          className="w-full h-[600px]"
                        ></iframe>
                      </div>
                    ) : (
                      <p className="italic text-gray-400">
                        Belum ada dokumen.
                      </p>
                    )}
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
