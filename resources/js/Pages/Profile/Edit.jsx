import AppLayout from '@/Components/Layout/UserLayout';
import { Head, router } from '@inertiajs/react';
import owner from '../../../images/kurpet.jpg';

export default function Profile({ mustVerifyEmail, status, user }) {
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

            <div className="max-w-7xl space-y-6 sm:pt-6 lg:pt-6 md:pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">

                    {/* CARD 1 */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 sm:rounded-lg">
                        <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-4">

                            {/* FOTO USER */}
                            <div className="flex flex-col justify-center items-center gap-3 lg:w-1/3">
                                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full">
                                    <img src={owner} alt="user" />
                                </div>

                                <div className="text-center space-y-1">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {user?.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* PEMISAH */}
                            <div className="hidden lg:block border-l border-gray-200 h-auto mx-6"></div>

                            {/* DETAIL */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-medium text-gray-800">{user.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">NIP</p>
                                    <p className="text-lg font-medium text-gray-800">{user.nip}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Email address</p>
                                    <p className="text-lg font-medium text-gray-800">{user.email}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-lg font-medium text-gray-800">{user.no_telp}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Satuan Kerja</p>
                                    <p className="text-lg font-medium text-gray-800">{user.satker}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2 — SETTING */}
                    <div className="w-full lg:w-fit rounded-2xl border border-gray-200 bg-white p-4 sm:rounded-lg md:p-6 sm:p-8">

                        <p className="text-xl font-bold text-center text-main-blue mb-4">
                            Setting
                        </p>

                        <div className="border-t border-gray-300 my-2"></div>

                        {/* EDIT PROFILE */}
                        <button
                            onClick={() => router.visit(route('profile.edit.info'))}
                            className="flex items-center gap-3 py-2 font-medium text-gray-700 rounded-lg group hover:bg-gray-100 transition"
                        >
                            <svg
                                className="w-5 h-5 fill-gray-500 group-hover:fill-gray-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5z" />
                            </svg>
                            <span>Edit Profile</span>
                        </button>

                        {/* UBAH PASSWORD */}
                        {/* <button
                            onClick={() => router.visit(route('password.edit'))}
                            className="flex items-center gap-3 py-2 font-medium text-gray-700 rounded-lg group hover:bg-gray-100 transition"
                        >
                            <svg
                                className="w-5 h-5 fill-gray-500 group-hover:fill-gray-700"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5S16.7 3.5 12 3.5z" />
                            </svg>
                            <span>Ubah Password</span>
                        </button> */}

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
