import DeleteModal from '@/Components/Modal/DeleteModal';
import SuccessModal from '@/Components/Modal/SuccessModal';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../Layout/TableAdminLayout";

export default function DaftarAlatTable({ alats, onDeleteSuccess }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = async () => {
            try {
                await axios.delete(`/admin/daftar-alat/${selectedId}`);
                setShowDeleteModal(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                if (onDeleteSuccess) onDeleteSuccess(selectedId);
            } catch (error) {
                console.error("Gagal hapus data Modul Diklat:", error);
            }
        };

    return (
        <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
            <Table>
            {/* Table Header */}
            <TableHeader>
                <TableRow>
                {["No", "Nama Alat", "Kategori", "Gambar", "Tanggal Unggah", "Action"].map(
                    (header) => (
                    <TableCell
                        key={header}
                        isHeader
                        className={`${
                        header === "No" ||
                        header === "Tanggal Unggah" ||
                        header === "Action" ||
                        header === "Gambar"
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
                        {alats.length > 0 ? (
                            alats.map((alat, index) => (
                            <TableRow key={alat.id}>

                            <TableCell className='text-center'>{index + 1}</TableCell>

                            <TableCell>
                                {alat.nama_alat}
                            </TableCell>

                            <TableCell>
                                {alat.kategori}
                            </TableCell>

                            <TableCell className="text-center">
                                {alat.foto ? (
                                    <img
                                    src={alat.foto}
                                    alt={alat.nama_alat}
                                    className="w-16 h-16 object-cover rounded-md mx-auto"
                                    />
                                ) : (
                                    <span className="italic text-gray-400">Belum ada</span>
                                )}
                            </TableCell>

                            <TableCell className="text-center">
                                {alat.tanggal}
                            </TableCell>

                            <TableCell  className="text-center">
                                <div className="flex flex-row justify-center gap-4">
                                    <PencilSquareIcon
                                        className="w-6 h-6 text-blue-500 hover:text-blue-500 transition"
                                        onClick={() => router.visit(`/admin/kelola-daftar-alat/edit/${alat.id}`)}
                                    />
                                    <TrashIcon
                                        className="w-6 h-6 text-red-500 hover:text-red-500 transition"
                                        onClick={() => {
                                            setSelectedId(alat.id);
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
                            {/* Tidak ada data alat. */}
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
            message="Apakah kamu yakin ingin menghapus alat  ini?"
        />

        <SuccessModal
            show={showSuccess}
            message="Alat berhasil dihapus!"
        />

        </div>
    );
}
