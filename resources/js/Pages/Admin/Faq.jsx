import AppLayout from '@/Components/Layout/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ title }) {
  return (
    <AppLayout>
        <div className="p-6">
      <Head title={title} />
      <h1 className="text-2xl font-bold text-gray-800">Ini adalah tempat Kelola FAQ</h1>
      <p className="text-gray-600 mt-2">Hanya admin yang bisa melihat halaman ini.</p>
    </div>
    </AppLayout>

  );
}
