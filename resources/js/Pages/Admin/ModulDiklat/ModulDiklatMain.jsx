import SecondaryButton from '@/Components/Button/SecondaryButton';
import AppLayout from '@/Components/Layout/AdminLayout';
import ModulDiklatTable from '@/Components/Table/ModulDiklatTable';
import { PlusIcon } from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head } from '@inertiajs/react';

export default function Dashboard({ title }) {
  return (
    <AppLayout>
        <Head title={title} />
        <h1 className="text-xl font-bold">Kelola Data Modul Diklat</h1>
            <SecondaryButton
                className="my-4 gap-2"
                onClick={() => Inertia.visit(route('admin.modulDiklat.create'))}
            >
                <PlusIcon className="w-5 h-5 text-gray-600" />
                Tambah Data
            </SecondaryButton>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <ModulDiklatTable />
            </div>
    </AppLayout>

  );
}
