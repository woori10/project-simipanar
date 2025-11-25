import { GroupIcon } from "@icons";

export default function ProsedurKerjaCard({ judul, onClick }) {
    return (
        <div
            onClick={onClick}
            className="w-full sm:w-[250px] h-[320px] rounded-2xl border border-gray-200 bg-white p-5 md:p-6 cursor-pointer hover:shadow-sm transition flex flex-col"
        >
            {/* Kotak icon fix ukuran 160px */}
            <div className="w-full h-[160px] rounded-xl flex items-center justify-center overflow-hidden bg-gray-100">
                <GroupIcon className="text-gray-800 size-5 dark:text-white/90" />
            </div>

            {/* Judul nempel ke bawah */}
            <div className="mt-auto text-center">
                <h4 className="font-bold text-gray-800 text-title-sm">
                    {judul}
                </h4>
                <span className="text-sm text-gray-500">Klik untuk Lihat</span>
            </div>
        </div>
    );
}
