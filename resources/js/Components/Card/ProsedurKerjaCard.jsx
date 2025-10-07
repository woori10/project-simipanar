import {
    GroupIcon
} from "@icons";

export default function ProsedurKerjaCard() {
  return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 min-w-max dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="mx-auto flex items-center justify-center w-full h-40 bg-gray-100 rounded-xl dark:bg-gray-800">
                <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="text-center mt-5">
                <div>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    SOP Karyawan Baru
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                    Halo
                    </span>
                </div>
            </div>
        </div>


  );
}
