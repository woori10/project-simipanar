import AppLayout from '@/Components/Layout/UserLayout';
// import { ChevronDownIcon, Maximize2Icon, XIcon } from "@icons";
import { ArrowsPointingOutIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import { useState } from "react";


export default function ModulDiklat() {
  const [openIndex, setOpenIndex] = useState(null);
  const [fullscreenModul, setFullscreenModul] = useState(null); // ✅ buat mode fullscreen
  const { moduls } = usePage().props;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppLayout>
      <h1 className="text-xl font-bold mb-4">Modul Diklat</h1>

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
                {/* Header modul */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium p-2 text-gray-800">
                    {modul.nama_alat || "Judul Modul"}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Isi modul */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-[700px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 text-gray-600 space-y-3 relative">
                    {modul.dokumen ? (
                      <div className="w-full border rounded-lg overflow-hidden shadow-sm relative">
                        {/* Tombol fullscreen */}
                        <button
                          onClick={() => setFullscreenModul(modul)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-md p-1 shadow transition"
                          title="Fullscreen"
                        >
                          <ArrowsPointingOutIcon className="w-5 h-5" />
                        </button>

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
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Modal fullscreen */}
      {fullscreenModul && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <div className="relative w-[95%] h-[90%] bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Tombol tutup */}
            <button
              onClick={() => setFullscreenModul(null)}
              className="absolute top-3 right-3 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow"
              title="Tutup"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Dokumen fullscreen */}
            <iframe
              src={fullscreenModul.dokumen}
              title={`Fullscreen ${fullscreenModul.nama_alat}`}
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
