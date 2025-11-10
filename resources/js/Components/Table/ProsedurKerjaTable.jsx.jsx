import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';
import DeleteModal from '@/Components/Modal/DeleteModal';
import SuccessModal from '@/Components/Modal/SuccessModal';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function ProsedurKerjaTable() {

    const [prosedurKerjas, setProsedurKerjas] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`/admin/prosedur-kerja/${selectedId}`);
            setProsedurKerjas((prev) => prev.filter(item => item.id !== selectedId));
            setShowDeleteModal(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Gagal hapus data Prosedur Kerja:", error);
        }
    };

        useEffect(() => {
        axios.get('/admin/prosedur-kerja')
            .then((res) => {
            console.log("Response dari backend:", res.data);
            setProsedurKerjas(res.data);
            })
            .catch((err) => console.error('Gagal ambil data prosedur kerja:', err));
        }, []);

    return (
        <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
            <Table>
            {/* Table Header */}
            <TableHeader>
                <TableRow>
                {["No", "Judul", "File", "Tanggal Unggah", "Action"].map(
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
                {prosedurKerjas.length > 0 ? (
                    prosedurKerjas.map((prosedurKerja, index) => (

                        <TableRow key={prosedurKerja.id}>

                            <TableCell className="text-center">{index + 1}</TableCell>

                            <TableCell>
                                {prosedurKerja.judul}
                            </TableCell>

                            <TableCell>
                                <span className="italic text-gray-400">
                                {prosedurKerja.dokumen_url ? (
                                    <a
                                    href={prosedurKerja.dokumen_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                    >
                                    Lihat Dokumen
                                    </a>
                                ) : (
                                    "Belum ada"
                                )}
                                </span>
                            </TableCell>

                            <TableCell className='text-center'>
                                {prosedurKerja.tanggal}
                            </TableCell>

                            <TableCell  className="text-center">
                            <div className="flex flex-row justify-center gap-4">
                                <PencilSquareIcon
                                    className="w-6 h-6 text-blue-500 hover:text-blue-500 transition"
                                    onClick={() => router.visit(`/admin/kelola-prosedur-kerja/edit/${prosedurKerja.id}`)}
                                />
                                <TrashIcon
                                    className="w-6 h-6 text-red-500 hover:text-red-500 transition"
                                    onClick={() => {
                                        setSelectedId(prosedurKerja.id);
                                        setShowDeleteModal(true);
                                        }}
                                />
                            </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                        <TableRow>
                            <TableCell colSpan="8" className="text-center py-4">
                            {/* Tidak ada data Prosedur Kerja. */}
                            </TableCell>
                        </TableRow>
                )}
            </TableBody>
            </Table>
        </div>

        <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            message="Apakah kamu yakin ingin menghapus prosedur kerja ini?"
        />

        <SuccessModal
            show={showSuccess}
            message="Prosedur Kerja berhasil dihapus!"
        />
    </div>
  );
}
