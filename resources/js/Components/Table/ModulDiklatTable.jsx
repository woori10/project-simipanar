import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../Layout/TableAdminLayout";

export default function ModulDiklatTable({ moduls }) {
  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {["No", "Nama Alat", "Gambar", "File", "Tanggal Unggah", "Action"].map(
                (header) => (
                  <TableCell
                    key={header}
                    isHeader
                    className={`${
                      header === "No" || header === "Tanggal Unggah" || header === "Action"
                        ? "text-center"
                        : "text-start"
                    }`}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {moduls.length > 0 ? (
              moduls.map((modul, index) => (
                <TableRow key={modul.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>

                  <TableCell>{modul.nama_alat}</TableCell>

                  <TableCell className="text-center">
                    {modul.foto ? (
                      <img
                        src={modul.foto}
                        alt={modul.nama_alat}
                        className="w-24 h-24 object-cover rounded-md mx-auto"
                      />
                    ) : (
                      <span className="italic text-gray-400">Belum ada</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {modul.dokumen ? (
                      <a
                        href={modul.dokumen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Lihat File
                      </a>
                    ) : (
                      <span className="italic text-gray-400">Belum ada</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {modul.created_at
                      ? new Date(modul.created_at).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex flex-row justify-center gap-4">
                      <PencilSquareIcon
                        className="w-6 h-6 text-blue-500 hover:text-blue-500 transition"
                        onClick={() => router.visit(`/admin/kelola-modul-diklat/edit/${modul.id}`)}
                        />
                      <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700 transition" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center py-4">
                  {/* Tidak ada data modul. */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
