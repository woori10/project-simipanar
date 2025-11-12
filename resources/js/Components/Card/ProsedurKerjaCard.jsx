import {
    GroupIcon
} from "@icons";

export default function ProsedurKerjaCard({ judul, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl border border-gray-200 bg-white p-5 min-w-max md:p-6 cursor-pointer hover:shadow-md transition"
    >
      <div className="mx-auto flex items-center justify-center w-full h-40 bg-gray-100 rounded-xl">
        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
      </div>

      <div className="text-center mt-5">
        <h4 className="font-bold text-gray-800 text-title-sm">
          {judul}
        </h4>
        <span className="text-sm text-gray-500">Klik untuk Lihat</span>
      </div>
    </div>
  );
}
