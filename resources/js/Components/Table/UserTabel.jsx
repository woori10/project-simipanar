import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/Components/Layout/TableAdminLayout';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/admin/users').then((res) => {
        setUsers(res.data.users);
        });

        // axios.get('/admin/users/{id}').then((res) => {
        // setUsers(res.data.users);
        // });

    }, []);
    return (
        <div className="overflow-hidden mt-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
            <Table>
            {/* Table Header */}
            <TableHeader>
                <TableRow>
                {[
                    "No",
                    "Nama",
                    "NIP",
                    "Satuan Kerja",
                    "Email",
                    "No Telp",
                    "Role",
                    "Action",
                ].map((header) => (
                    <TableCell
                    key={header}
                    isHeader
                    className={`${
                        header === "No" || header === "Action" ? "text-center" : "text-start"
                    }`}
                    >
                    {header}
                    </TableCell>
                ))}
                </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.length > 0 ? (
                    users.map((user, index) => (
                    <TableRow key={user.id}>

                        <TableCell className="text-center">{index + 1}</TableCell>

                        <TableCell>{user.name}</TableCell>

                        <TableCell>{user.nip}</TableCell>

                        <TableCell>{user.satker}</TableCell>

                        <TableCell>{user.email}</TableCell>

                        <TableCell>{user.no_telp}</TableCell>

                        <TableCell>{user.role}</TableCell>

                        <TableCell className="text-center">

                        <div className="flex flex-row justify-center gap-4">

                            <PencilSquareIcon
                                onClick={() => router.visit(`/admin/kelola-user/edit/${user.id}`)}
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
                        Tidak ada data user.
                    </TableCell>
                    </TableRow>
                )}

            </TableBody>
            </Table>
        </div>
        </div>
    );
    }
