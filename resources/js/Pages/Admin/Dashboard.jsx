import DashboardCard from '@/Components/Card/DashboardCard';
import UserCard from '@/Components/Card/UserCard';
import AppLayout from '@/Components/Layout/AdminLayout';
import ReqUserTable from '@/Components/Table/ReqUserTable';
import { Squares2X2Icon, UserPlusIcon } from "@heroicons/react/24/outline";
import { FAQIcon, ModulDiklatIcon, ProsedurKerjaIcon, UserCircleIcon, VideoTutorialIcon } from "@icons";
import { Head } from '@inertiajs/react';
import logo from '../../../images/bea-cukai.png';


export default function Dashboard({ title }) {

  return (
    <AppLayout>
         <div className="py-6">
            <Head title={title} />
            <div className="rounded-2xl border border-gray-200 bg-main-blue p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className='flex flex-row justify-center p-4 text-white lg:items-center gap-4'>
                    <div className='w-full space-y-4'>
                        <div className='space-y-2'>
                            <h2 className="text-2xl font-extrabold">
                                Selamat Datang di Dashboard
                            </h2>
                            <h2 className="text-2xl font-extrabold">
                                Admin Simipanar
                            </h2>
                        </div>

                        <p className='text-sm'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>
                    </div>
                    <div className="hidden lg:flex h-full ">
                        <img className="w-32 h-auto" src={logo} alt="Logo Kemenkeu" />
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">

                <DashboardCard
                    title="Total Prosedur Kerja"
                    count={0}
                    icon={ProsedurKerjaIcon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total Alat"
                    count={0}
                    icon={Squares2X2Icon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total Modul Diklat"
                    count={0}
                    icon={ModulDiklatIcon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total FAQ"
                    count={0}
                    icon={FAQIcon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total Video Tutorial"
                    count={0}
                    icon={VideoTutorialIcon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total User"
                    count={0}
                    icon={UserCircleIcon}
                    bgColor="bg-main-yellow"
                />

                <DashboardCard
                    title="Total Requset User"
                    count={0}
                    icon={UserPlusIcon}
                    bgColor="bg-main-yellow"
                />

            </div>

        </div>

        <h1 className="text-lg text-main-blue font-extrabold">Baru saja Mengunjungi</h1>
        <div className= "py-4 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
       </div>

        <h1 className="text-lg text-main-blue font-extrabold">User Request</h1>
        <ReqUserTable />

    </AppLayout>


  );
}
