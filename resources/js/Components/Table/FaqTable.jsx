import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../Layout/TableAdminLayout";

export default function FaqTable() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('/admin/faqs')
      .then((res) => {
        setFaqs(res.data.faqs || []); // biar aman kalau res.data.faqs undefined
      })
      .catch((err) => console.error("Gagal ambil data FAQ:", err));
  }, []);

  return (
    <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {["No", "Pertanyaan", "Jawaban", "Tanggal Unggah", "Action"].map(
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
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <TableRow key={faq.id}>
                    
                  <TableCell className="text-center">{index + 1}</TableCell>

                  <TableCell>{faq.pertanyaan}</TableCell>

                  <TableCell>{faq.jawaban}</TableCell>

                  <TableCell className="text-center italic">
                    {faq.created_at
                      ? new Date(faq.created_at).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex flex-row justify-center gap-4">
                      <PencilSquareIcon
                      onClick={() => router.visit(`/admin/kelola-faq/edit/${faq.id}`)}
                      className="w-6 h-6 text-blue-500 hover:text-blue-600 transition"
                      />
                      <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center py-4">
                  Tidak ada data FAQ.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
