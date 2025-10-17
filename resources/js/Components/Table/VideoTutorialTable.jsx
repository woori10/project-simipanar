import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

// Data tabel video tutorial
const tableData = [
  {
    id: 1,
    namaAlat: "Sensor Suhu",
    kategori: "Elektronik",
    video: null,
    tanggal: "2025-10-14",
  },
  {
    id: 2,
    namaAlat: "Motor Servo",
    kategori: "Mekanik",
    video: null,
    tanggal: "2025-10-12",
  },
];

export default function VideoTutorialTable() {
  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {["No", "Judul Video", "Kategori", "Video", "Tanggal Unggah", "Action"].map(
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
                {/* No */}
                <TableCell className="text-center">
                  {item.id}
                </TableCell>

                {/* Nama Alat */}
                <TableCell>
                  {item.namaAlat}
                </TableCell>

                {/* Kategori */}
                <TableCell>
                  {item.kategori}
                </TableCell>

                {/* Video */}
                <TableCell>
                  <span className="italic text-gray-400">
                    {item.video ? item.video : "Belum ada"}
                  </span>
                </TableCell>

                {/* Tanggal Unggah */}
                <TableCell className="text-center">
                  {item.tanggal}
                </TableCell>

                {/* Action */}
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
