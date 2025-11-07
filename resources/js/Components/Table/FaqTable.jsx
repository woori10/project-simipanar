import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';
import DeleteModal from '@/Components/Modal/DeleteModal';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import toast from "react-hot-toast";
import Swal from 'sweetalert2';


export default function FaqTable() {

    const [faqs, setFaqs] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // ambil data faq dari backend
    useEffect(() => {
        axios.get('/admin/faqs')
            .then((res) => {
                setFaqs(res.data.faqs);
            })
            .catch((err) => console.error('Gagal ambil data FAQ:', err));
    }, []);

    // fungsi hapus data
    const handleDelete = async () => {
        try {
            await axios.delete(`/admin/faqs/${selectedId}`);
            setFaqs((prev) => prev.filter(item => item.id !== selectedId));
            setShowDeleteModal(false);

            Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data berhasil dihapus!',
            showConfirmButton: false,
            timer: 2500,
            });
        } catch (error) {
            console.error("Gagal hapus data FAQ:", error);
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
                            {["No", "Pertanyaan", "Jawaban", "Action"].map((header) => (
                                <TableCell key={header} isHeader className="text-center">
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <TableRow key={faq.id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{faq.pertanyaan}</TableCell>
                                    <TableCell>{faq.jawaban}</TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex flex-row justify-center gap-4">
                                            <PencilSquareIcon
                                                className="w-6 h-6 text-blue-500 hover:text-blue-500 transition"
                                                onClick={() => router.visit(`/admin/kelola-faq/edit/${faq.id}`)}
                                            />
                                            <TrashIcon
                                                className="w-6 h-6 text-red-500 hover:text-red-500 transition"
                                                onClick={() => {
                                                    setSelectedId(faq.id);
                                                    setShowDeleteModal(true);
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center py-4 text-gray-400">
                                    Tidak ada data FAQ.
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
                message="Apakah kamu yakin ingin menghapus FAQ ini?"
            />
        </div>
    );
}
