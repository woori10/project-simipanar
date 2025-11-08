import ProsedurKerjaCard from '@/Components/Card/ProsedurKerjaCard';
import AppLayout from '@/Components/Layout/UserLayout';
import { ArrowLeftIcon } from "@icons";
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ProsedurKerja() {
  const { prosedurKerjas } = usePage().props;
  const [selected, setSelected] = useState(null);

  // kalau belum pilih card → tampilkan list card
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

  // kalau card diklik → tampilkan preview PDF
  return (
    <AppLayout>
      <div className="flex items-center mb-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span className="font-bold">{selected.judul}</span>
        </button>
      </div>

      {/* <h1 className="text-xl font-bold mb-4">{selected.judul}</h1> */}
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <embed
          src={selected.dokumen_url}
          type="application/pdf"
          width="100%"
          height="800px"
          className="rounded-lg"
        />
      </div>
    </AppLayout>
  );
}
