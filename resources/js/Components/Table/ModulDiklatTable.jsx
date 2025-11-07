import DeleteModal from '@/Components/Modal/DeleteModal';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../Layout/TableAdminLayout";

export default function ModulDiklatTable({ moduls, onDeleteSuccess }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

        const handleDelete = async () => {
                try {
                    await axios.delete(`/admin/modul-diklat/${selectedId}`);
                    // setDaftarAlat((prev) => prev.filter(item => item.id !== selectedId));
                    setShowDeleteModal(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Data berhasil dihapus!',
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    if (onDeleteSuccess) onDeleteSuccess(selectedId);
                } catch (error) {
                            console.error("Gagal hapus data Modul Diklat:", error);
                                Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Gagal menghapus data!',
                            });
                }
            };

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
                        <TrashIcon
                            className="w-6 h-6 text-red-500 hover:text-red-500 transition"
                            onClick={() => {
                                setSelectedId(modul.id);
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
                    {/* Tidak ada data modul. */}
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
                            message="Apakah kamu yakin ingin menghapus modul diklat  ini?"
                        />

        </div>
    );
}
