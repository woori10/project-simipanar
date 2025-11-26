import AppLayout from '@/Components/Layout/UserLayout';
import { Head, router } from '@inertiajs/react';

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
                                <div className="w-20 h-20 overflow-hidden">
                                     <svg
                                        className="fill-gray-400 w-full h-full group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                                        fill=""
                                        />
                                    </svg>
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
