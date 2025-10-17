import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../Layout/TableAdminLayout";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Data tabel FAQ
const tableData = [
  {
    id: 1,
    nama_alat: "Bagaimana cara menggunakan aplikasi?",
    gambar: null,
    tanggal: "2025-10-10",
  },
  {
    id: 2,
    nama_alat: "Bagaimana cara reset password?",
    gambar: null,
    tanggal: "2025-10-12",
  },
];

export default function DaftarAlatTable() {
  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {["No", "Nama Alat", "Gambar", "Tanggal Unggah", "Action"].map(
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

          {/* Table Body */}
            <TableBody>
                {tableData.map((item) => (
                    <TableRow key={item.id}>
                    <TableCell className='text-center'>
                        {item.id}
                    </TableCell>

                    <TableCell>
                        {item.nama_alat}
                    </TableCell>

                    <TableCell>
                        <span className="italic text-gray-400">
                            {item.gambar ? item.gambar : "Belum ada"}
                        </span>
                    </TableCell>

                    <TableCell className='text-center'>
                        {item.tanggal}
                    </TableCell>

                    <TableCell  className="text-center">
                        <div className="flex flex-row justify-center gap-4">
                            <PencilSquareIcon className="w-6 h-6 text-blue-500 hover:text-blue-500 transition" />
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-500 transition" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
