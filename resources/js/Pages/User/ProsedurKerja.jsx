import ProsedurKerjaCard from '@/Components/Card/ProsedurKerjaCard';
import AppLayout from '@/Components/Layout/UserLayout';
import { ArrowsPointingOutIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ProsedurKerja() {
  const { prosedurKerjas } = usePage().props;
  const [selected, setSelected] = useState(null);
  const [fullscreenDoc, setFullscreenDoc] = useState(null);

  // tampilan daftar card
  if (!selected) {
    return (
      <AppLayout>
        <h1 className="text-xl font-bold mb-6">Prosedur Kerja</h1>

        {prosedurKerjas.length === 0 ? (
          <p className="text-gray-500">Belum ada prosedur kerja.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {prosedurKerjas.map((item) => (
              <ProsedurKerjaCard
                key={item.id}
                judul={item.judul}
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
          className="flex items-center gap-2 py-2 rounded-lg text-gray-700 transition"
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
          src={selected.dokumen_url}
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
              src={fullscreenDoc.dokumen_url}
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
