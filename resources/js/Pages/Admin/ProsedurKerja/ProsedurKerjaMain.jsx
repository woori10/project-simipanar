import SecondaryButton from '@/Components/Button/SecondaryButton';
import AppLayout from '@/Components/Layout/AdminLayout';
import ProsedurKerjaTable from '@/Components/Table/ProsedurKerjaTable.jsx';
import { PlusIcon } from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard({ title }) {

    const [prosedurKerjas, setProsedurKerjas] = useState([]);

        useEffect(() => {
            axios.get('/admin/prosedur-kerja')
            .then((res) => {
                setProsedurKerjas(res.data.prosedurKerjas);
            })
            .catch((err) => console.error('Gagal ambil data user:', err));
        }, []);

    return (
        <AppLayout>
            <Head title={title} />
            <h1 className="text-lg text-main-blue font-extrabold">Kelola Data Prosuder Kerja</h1>
                <div className="rounded-2xl border border-gray-200 bg-white my-4 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className='space-y-4'>
                        <SecondaryButton
                            className="gap-2"
                            onClick={() => Inertia.visit(route('admin.prosedurKerja.create'))}
                        >
                            <PlusIcon className="w-4 h-4 text-gray-600" />
                            Tambah Data
                        </SecondaryButton>
                        <ProsedurKerjaTable prosedurKerjas={prosedurKerjas} />
                    </div>

                </div>
        </AppLayout>

  );
}
