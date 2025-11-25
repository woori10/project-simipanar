import DashboardCard from '@/Components/Card/DashboardCard';
import AppLayout from '@/Components/Layout/UserLayout';
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { FAQIcon, ModulDiklatIcon, ProsedurKerjaIcon, UserCircleIcon, VideoTutorialIcon } from "@icons";
import { useEffect, useState } from 'react';

export default function Dashboard() {

    const [counts, setCounts] = useState({
            prosedur: 0,
            alat: 0,
            modul: 0,
            faq: 0,
            video: 0,
            user: 0,
            requestUser: 0,
        });

        useEffect(() => {
                axios.get('/dashboard/counts')
                .then((res) => setCounts(res.data))
                .catch((err) => console.error("Gagal ambil data count:", err));
            }, []);

  return (
    <AppLayout>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className= "py-6">
            <div className="rounded-2xl border border-gray-200 bg-main-blue p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <h1 className="text-xl text-white font-bold">Informasi</h1>
                <p className="py-4 text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat autem deserunt, natus earum sequi necessitatibus aut magni repellendus quo! Quo similique repudiandae vero maiores ullam, natus nesciunt? Laborum, odit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente repellat autem deserunt, natus earum sequi necessitatibus aut magni repellendus quo! Quo similique repudiandae vero maiores ullam, natus nesciunt? Laborum, odit!
                </p>
            </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">

                            <DashboardCard
                                title="Total Prosedur Kerja"
                                count={counts.prosedur}
                                icon={ProsedurKerjaIcon}
                                bgColor="bg-main-yellow"
                            />

                            <DashboardCard
                                title="Total Alat"
                                count={counts.alat}
                                icon={Squares2X2Icon}
                                bgColor="bg-main-yellow"
                            />

                            <DashboardCard
                                title="Total Modul Diklat"
                                count={counts.modul}
                                icon={ModulDiklatIcon}
                                bgColor="bg-main-yellow"
                            />

                            <DashboardCard
                                title="Total FAQ"
                                count={counts.faq}
                                icon={FAQIcon}
                                bgColor="bg-main-yellow"
                            />

                            <DashboardCard
                                title="Total Video Tutorial"
                                count={counts.video}
                                icon={VideoTutorialIcon}
                                bgColor="bg-main-yellow"
                            />

                            <DashboardCard
                                title="Total User"
                                count={counts.user}
                                icon={UserCircleIcon}
                                bgColor="bg-main-yellow"
                            />

                        </div>



    </AppLayout>

  );
}
