import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';
import ConfirmUserApproveModal from '@/Components/Modal/ConfirmUserApprove';
import SuccessModal from '@/Components/Modal/SuccessModal';
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ReqUserTable() {

    const [tableData, setTableData] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmType, setConfirmType] = useState(null); // 'approve' | 'reject'
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [successModal, setSuccessModal] = useState({
        show: false,
        message: ""
    });

    const fetchRequests = async () => {
        try {
            const res = await axios.get('/admin/requests');
            // controller returns array of requests
            setTableData(res.data);
        } catch (err) {
            console.error(err);
            alert('Gagal load data request');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // single confirm handler for both approve & reject
    const confirmAction = async () => {
        if (!selectedUserId || !confirmType) {
            setShowConfirmModal(false);
            setSelectedUserId(null);
            setConfirmType(null);
            return;
        }

        try {
            if (confirmType === 'approve') {
                await axios.post(`/admin/requests/${selectedUserId}/approve`);

                // remove from table
                setTableData(prev => prev.filter(r => r.id !== selectedUserId));

                // HARD CODE MESSAGE DI FRONTEND
                setSuccessModal({
                    show: true,
                    message: "User berhasil diberikan akses."
                });

            } else if (confirmType === 'reject') {
                await axios.post(`/admin/requests/${selectedUserId}/reject`);

                setTableData(prev => prev.filter(r => r.id !== selectedUserId));

                // HARD CODE MESSAGE DI FRONTEND
                setSuccessModal({
                    show: true,
                    message: "User berhasil ditolak."
                });
            }

        } catch (err) {
            console.error(err);
            setSuccessModal({
                show: true,
                message: "Terjadi kesalahan saat memproses permintaan."
            });
        } finally {
            setShowConfirmModal(false);
            setSelectedUserId(null);
            setConfirmType(null);

            setTimeout(() => {
                setSuccessModal({ show: false, message: "" });
            }, 3000);
        }
    };


    // helper to open confirm modal
    const openConfirm = (id, type) => {
        setSelectedUserId(id);
        setConfirmType(type); // 'approve' or 'reject'
        setShowConfirmModal(true);
    };

    return (
        <>
            <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {["No", "Nama", "NIP", "Satuan Kerja", "Email", "Action"].map(
                                    (header) => (
                                        <TableCell
                                            key={header}
                                            isHeader
                                            className={`${
                                                header === "No"
                                                    ? "text-center text-gray-500"
                                                    : "text-start text-gray-500"
                                            }`}
                                        >
                                            {header}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {tableData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                        Tidak ada request pending
                                    </TableCell>
                                </TableRow>
                            )}

                            {tableData.map((order, index) => (
                                <TableRow key={order.id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.nip}</TableCell>
                                    <TableCell>{order.satker}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-4 justify-center">

                                            {/* APPROVE */}
                                            <CheckIcon
                                                className="w-6 h-6 text-green-600 hover:text-green-700 cursor-pointer"
                                                onClick={() => openConfirm(order.id, 'approve')}
                                            />

                                            {/* REJECT */}
                                            <XMarkIcon
                                                className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer"
                                                onClick={() => openConfirm(order.id, 'reject')}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Confirm modal (reuse your ConfirmUserApproveModal component) */}
            <ConfirmUserApproveModal
                show={showConfirmModal}
                onClose={() => {
                    setShowConfirmModal(false);
                    setSelectedUserId(null);
                    setConfirmType(null);
                }}
                onConfirm={confirmAction}
                message={
                    confirmType === 'approve'
                        ? "Yakin ingin memberikan user ini akses?"
                        : "Yakin ingin menolak user ini?"
                }
            />

            {/* Success modal (reuse existing SuccessModal) */}
            <SuccessModal
                show={successModal.show}
                message={successModal.message}
            />
        </>
    );
}
