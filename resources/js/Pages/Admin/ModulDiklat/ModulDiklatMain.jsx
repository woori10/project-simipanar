import SecondaryButton from '@/Components/Button/SecondaryButton';
import AppLayout from '@/Components/Layout/AdminLayout';
import ModulDiklatTable from '@/Components/Table/ModulDiklatTable';
import { PlusIcon } from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard({ title }) {

    const [moduls, setModuls] = useState([]);

    useEffect(() => {
        axios.get('/admin/modul-diklat')
        .then((res) => {
            setModuls(res.data.modulDiklat);
        })
        .catch((err) => console.error('Gagal ambil data modul:', err));
    }, []);

  return (
    <AppLayout>
        <Head title={title} />
        <h1 className="text-lg text-main-blue font-extrabold">Kelola Data Modul Diklat</h1>
        <div className="rounded-2xl border border-gray-200 bg-white my-4 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className='space-y-4'>
                <SecondaryButton
                    className="gap-2"
                    onClick={() => Inertia.visit(route('admin.modulDiklat.create'))}
                >
                    <PlusIcon className="w-4 h-4 text-gray-600" />
                    Tambah Data
                </SecondaryButton>
                <ModulDiklatTable
                    moduls={moduls}
                    onDeleteSuccess={(deletedId) => {
                        setModuls((prev) => prev.filter((item) => item.id !== deletedId));
                    }}/>
            </div>

        </div>
    </AppLayout>

  );
}
