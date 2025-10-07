// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AppLayout from '@/Components/Layout/AppLayout';
import { Head } from '@inertiajs/react';
import owner from '../../../images/kurpet.jpg';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, user }) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <h1 className="text-xl font-bold">Profile</h1>
            <div>
                <div className="mx-auto max-w-7xl space-y-6 sm:pt-6 lg:pt-6">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="flex flex-col items-center justify-center w-full gap-4 text-center">
                            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <img src={owner} alt="user" />
                            </div>
                            <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                Musharof Chowdhury
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center justify-center xl:flex-row xl:gap-3 xl:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                Team Manager
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            {/* <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                                Personal Information
                            </h4> */}

                            <div className="pt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                                <div className="text-lg">
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    Name
                                </p>
                                <p className="mb-2 ont-medium text-gray-800 dark:text-white/90">
                                    Musharof
                                </p>
                                </div>

                                <div>
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    NIP
                                </p>
                                <p className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                    012345
                                </p>
                                </div>

                                <div>
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    Email address
                                </p>
                                <p className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                    randomuser@pimjo.com
                                </p>
                                </div>

                                <div>
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    Phone
                                </p>
                                <p className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                    +09 363 398 46
                                </p>
                                </div>

                                <div>
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    Bio
                                </p>
                                <p className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                    Team Manager
                                </p>
                                </div>

                                <div>
                                <p className="leading-normal text-gray-500 dark:text-gray-400">
                                    Satuan Kerja
                                </p>
                                <p className="mb-2 font-medium text-gray-800 dark:text-white/90">
                                    Team Manager
                                </p>
                                </div>
                            </div>
                            </div>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
