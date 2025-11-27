import PrimaryButton from '@/Components/Button/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../../../images/bea-cukai.png';
import gedung from '../../../images/gedung_beacukai.jpg';
import LoaderOverlay from '@/Components/Loader/LoaderOverlay';

export default function Login({ status, canResetPassword }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nip: '',
        password: '',
        remember: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const finish = () => setLoading(false);

        document.addEventListener("inertia:start", start);
        document.addEventListener("inertia:finish", finish);

        return () => {
            document.removeEventListener("inertia:start", start);
            document.removeEventListener("inertia:finish", finish);
        };
    }, []);

    useEffect(() => {
        Object.entries(flash || {}).forEach(([key, message]) => {
            if (key === 'success' || key === 'status') {
                toast.success(message);
            } else if (key === 'error') {
                toast.error(message);
            }
        });
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <LoaderOverlay show={loading} />
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}



            {flash?.success && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                {flash.success}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

                {/* Foto */}
                <div className="hidden md:flex items-center justify-center">
                    <img
                    src={gedung}
                    alt="Gedung Bea Cukai"
                    className="rounded-xl object-cover max-h-[90%] max-w-[90%]"/>
                </div>

                <div className="flex flex-col justify-center px-8 md:px-16">
                    <div className="flex justify-center mb-2">
                        <img className="w-16 h-auto" src={logo} alt="Logo Kemenkeu" />
                    </div>

                    <h1 className="text-2xl mb-4 font-extrabold text-main-blue text-center">
                        SIMIPANAR
                    </h1>

                    <h2 className="text-2xl font-medium text-main-blue text-center mb-4">
                        Selamat Datang
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        {/* NIP */}
                        <div>
                        <InputLabel htmlFor="nip" className="text-main-blue" value="NIP" />
                        <TextInput
                            id="nip"
                            type="text"
                            name="nip"
                            value={data.nip}
                            className="mt-1 block w-full h-10 px-3 text-gray-500"
                            autoComplete="nip"
                            placeholder="Masukkan NIP"
                            onChange={(e) => setData('nip', e.target.value)}
                        />
                        <InputError message={errors.nip} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                        <InputLabel htmlFor="password" className="text-main-blue" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full h-10 px-3 text-gray-500"
                            autoComplete="current-password"
                            placeholder="Masukkan Password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember me & Reset */}
                        <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                            href={route('password.request')}
                            className="text-sm text-underline-blue underline hover:text-gray-900"
                            >
                            Forgot your password?
                            </Link>
                        )}
                        </div>

                        <PrimaryButton className="w-full py-2.5 items-center justify-center" disabled={processing}>
                        Log in
                        </PrimaryButton>

                        <div className="mt-2 flex justify-center items-center text-gray-600 rounded-md text-sm" >
                            Belum punya akun?
                            <Link href={route('register')}
                                className=" underline ml-1 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            style={{ color: '#1E4AE9' }}
                                >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>

            </div>





        </GuestLayout>
    );
}
