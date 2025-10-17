import UserCard from '@/Components/Card/UserCard';
import AppLayout from '@/Components/Layout/AdminLayout';
import ReqUserTable from '@/Components/Table/ReqUserTable';
import { ModulDiklatIcon, UserCircleIcon, VideoTutorialIcon } from "@icons";
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
                {/* <!-- Metric Item Start --> */}
                <div className="flex flex-row  gap-4 rounded-2xl w-full h-fit border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-main-yellow rounded-full dark:bg-gray-800">
                        <ModulDiklatIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h4 className="text-xl font-extrabold text-gray-800 dark:text-white/90">
                            3,782
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                            Total Modul Diklat
                            </span>

                        </div>
                    </div>
                </div>
                {/* <!-- Metric Item End --> */}

                 {/* <!-- Metric Item Start --> */}
                <div className="flex flex-row gap-4 rounded-2xl w-full h-fit border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-main-yellow rounded-full dark:bg-gray-800">
                        <VideoTutorialIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h4 className="text-xl font-extrabold text-gray-800 dark:text-white/90">
                            3,782
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                            Total Video Tutorial
                            </span>

                        </div>
                    </div>
                </div>
                {/* <!-- Metric Item End --> */}

                 {/* <!-- Metric Item Start --> */}
                <div className="flex flex-row gap-4 rounded-2xl w-full h-fit border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-main-yellow rounded-full dark:bg-gray-800">
                        <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h4 className="text-xl font-extrabold text-gray-800 dark:text-white/90">
                            3,782
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                            Total Request User
                            </span>

                        </div>
                    </div>
                </div>
                {/* <!-- Metric Item End --> */}

                 {/* <!-- Metric Item Start --> */}
                <div className="flex flex-row gap-4 rounded-2xl w-full h-fit border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-main-yellow rounded-full dark:bg-gray-800">
                        <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h4 className="text-xl font-extrabold text-gray-800 dark:text-white/90">
                            3,782
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                            Total User
                            </span>

                        </div>
                    </div>
                </div>
                {/* <!-- Metric Item End --> */}
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



            <div>

       </div>

    </AppLayout>


  );
}
