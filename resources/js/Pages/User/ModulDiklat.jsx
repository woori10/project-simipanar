import ModulDiklatCard from '@/Components/Card/ModulDiklatCard';
import AppLayout from '@/Components/Layout/UserLayout';
// import { ChevronDownIcon, Maximize2Icon, XIcon } from "@icons";
import { ArrowsPointingOutIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import { useState } from "react";


export default function ModulDiklat() {
    const { moduls } = usePage().props;
    const [selected, setSelected] = useState(null);
    const [fullscreenDoc, setFullscreenDoc] = useState(null);

    if (!selected) {
        return (
          <AppLayout>
            <h1 className="text-xl font-bold mb-6">Modul Diklat</h1>

            {moduls.length === 0 ? (
              <p className="text-gray-500">Belum ada modul diklat.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {moduls.map((item) => (
                  <ModulDiklatCard
                    key={item.id}
                    nama_alat={item.nama_alat}
                    foto={item.foto}
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            )}
          </AppLayout>
        );
      }

    // tampilan dokumen yang dipilih
    return (
        <AppLayout>
        {/* Tombol Back */}
        <div className="flex items-center mb-4">
            <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 rounded-lg text-gray-700 transition"
            >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="font-bold">Kembali</span>
            </button>
        </div>

        {/* Preview Dokumen */}
        <div className="relative border rounded-lg shadow-sm overflow-hidden">
            {/* Tombol Fullscreen */}
            <button
            onClick={() => setFullscreenDoc(selected)}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 rounded-md p-1 shadow transition"
            title="Fullscreen"
            >
            <ArrowsPointingOutIcon className="w-5 h-5" />
            </button>

            <embed
            src={selected.dokumen}
            type="application/pdf"
            width="100%"
            height="800px"
            className="rounded-lg"
            />
        </div>

        {/* ✅ Modal fullscreen */}
        {fullscreenDoc && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="relative w-[95%] h-[90%] bg-white rounded-lg overflow-hidden shadow-2xl">
                {/* Tombol Tutup */}
                <button
                onClick={() => setFullscreenDoc(null)}
                className="absolute top-3 right-3 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow"
                title="Tutup"
                >
                <XMarkIcon className="w-5 h-5" />
                </button>

                {/* Dokumen Fullscreen */}
                <embed
                src={fullscreenDoc.dokumen}
                type="application/pdf"
                width="100%"
                height="100%"
                className="rounded-lg"
                />
            </div>
            </div>
        )}
        </AppLayout>
    );
}
