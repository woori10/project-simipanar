import { GroupIcon } from "@icons";

export default function ModulDiklatCard({ nama_alat, foto, onClick }) {

    const finalFoto = foto
        ? (foto.startsWith('http') ? foto : `/storage/${foto}`)
        : null;

    return (
        <div
            onClick={onClick}
            className="w-full sm:w-[250px] h-[320px] rounded-2xl border border-gray-200 bg-white p-5 md:p-6 cursor-pointer hover:shadow-sm transition flex flex-col"
        >
            {/* Kotak foto ukuran fix */}
            <div className="w-full h-[160px] rounded-xl flex items-center justify-center overflow-hiddens">
                {finalFoto ? (
                    <img
                        src={finalFoto}
                        alt={nama_alat}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                )}
            </div>

            {/* Judul nempel bawah */}
            <div className="mt-auto text-center">
                <h4 className="font-bold text-gray-800 text-title-sm">
                    {nama_alat}
                </h4>
                <span className="text-sm text-gray-500">Klik untuk Lihat</span>
            </div>
        </div>
    );
}
