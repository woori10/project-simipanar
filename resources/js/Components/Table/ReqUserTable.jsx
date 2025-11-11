import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ReqUserTable() {
    const [tableData, setTableData] = useState([]);

    // Fetch request pending
    const fetchRequests = async () => {
        try {
            const res = await axios.get('/admin/requests');
            setTableData(res.data); // asumsi backend kirim array user request
        } catch (err) {
            console.error(err);
            alert('Gagal load data request');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Approve user
    const handleApprove = async (id) => {
        try {
            await axios.post(`/admin/requests/${id}/approve`);
            setTableData(prev => prev.filter(r => r.id !== id)); // langsung remove row
            alert('User disetujui!');
        } catch (err) {
            console.error(err);
            alert('Gagal approve user');
        }
    };

    // Reject user
    const handleReject = async (id) => {
        try {
            await axios.post(`/admin/requests/${id}/reject`);
            setTableData(prev => prev.filter(r => r.id !== id)); // langsung remove row
            alert('User ditolak!');
        } catch (err) {
            console.error(err);
            alert('Gagal reject user');
        }
    };

    return (
        <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
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
                                    <div className="flex flex-row text-center gap-4">
                                        <CheckIcon
                                            className="w-6 h-6 text-green-600 hover:text-green-700 transition cursor-pointer"
                                            onClick={() => handleApprove(order.id)}
                                        />
                                        <XMarkIcon
                                            className="w-6 h-6 text-red-500 hover:text-red-600 transition cursor-pointer"
                                            onClick={() => handleReject(order.id)}
                                        />
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
