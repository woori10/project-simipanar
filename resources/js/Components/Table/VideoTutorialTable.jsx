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


export default function VideoTutorialTable({ videos, onDeleteSuccess }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = async () => {
                try {
                    await axios.delete(`/admin/video-tutorial/${selectedId}`);
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
                {["No", "Judul Video", "Nama Alat", "Kategori", "Video", "Tanggal Unggah", "Action"].map(
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
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                    <TableRow key={video.id}>

                        {/* No */}
                        <TableCell className="text-center"> {index+1} </TableCell>

                        {/* Judul Video */}
                        <TableCell>
                        {video.judul_video}
                        </TableCell>


                        {/* Nama Alat */}
                        <TableCell>
                        {video.nama_alat}
                        </TableCell>

                        {/* Kategori */}
                        <TableCell>
                        {video.kategori}
                        </TableCell>

                        {/* Video */}
                        {/* <TableCell>
                        <span className="italic text-gray-400">
                            {video.video ? video.video : "Belum ada"}
                        </span>
                        </TableCell> */}

                        {/* Video */}
                        <TableCell>
                        {video.video ? (
                        <a
                            href={video.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Lihat Video
                        </a>
                        ) : (
                        <span className="italic text-gray-400">Belum ada</span>
                        )}
                        </TableCell>

                        {/* Tanggal Unggah */}
                        <TableCell className="text-center">
                        {video.tanggal}
                        </TableCell>

                        {/* Action */}
                        <TableCell  className="text-center">
                        <div className="flex flex-row justify-center gap-4">
                            <PencilSquareIcon
                            className="w-6 h-6 text-blue-500 hover:text-blue-500 transition"
                            onClick={() => router.visit(`/admin/kelola-video-tutorial/edit/${video.id}`)}
                            />
                            <TrashIcon
                                className="w-6 h-6 text-red-500 hover:text-red-500 transition"
                                onClick={() => {
                                    setSelectedId(video.id);
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
            message="Apakah kamu yakin ingin menghapus video  ini?"
        />

        <SuccessModal
            show={showSuccess}
            message="Video berhasil dihapus!"
        />

        </div>
    );
}
