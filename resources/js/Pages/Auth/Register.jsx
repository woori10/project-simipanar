import PrimaryButton from '@/Components/Button/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from '../../../images/bea-cukai.png';
import gedung from '../../../images/gedung_beacukai.jpg';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nip:'',
        satker:'',
        no_telp:'',
        email: '',
        password: '',
        // password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password'),
            // onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

                {/* Form */}
                <div className="flex flex-col justify-center px-8 md:px-16">
                    <div className="flex justify-center items-center">
                        <img className="w-16 h-auto" src={logo} alt="Logo Kemenkeu" />
                    </div>

                    <div className="flex justify-center items-center my-4">
                        <h1 className="text-2xl font-bold text-main-blue">
                            Selamat Datang di SIMIPANAR
                        </h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mt-2">
                            <InputLabel htmlFor="name" className="text-main-blue" value="Nama Lengkap" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="nip" className="text-main-blue" value="NIP" />

                            <TextInput
                                id="nip"
                                name="nip"
                                value={data.nip}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="nip"
                                isFocused={true}
                                onChange={(e) => setData('nip', e.target.value)}
                                placeholder="Masukkan NIP"
                                required
                            />

                            <InputError message={errors.nip} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="satker" className="text-main-blue" value="Satuan Kerja" />

                            <TextInput
                                id="satker"
                                name="satker"
                                value={data.satker}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="satker"
                                isFocused={true}
                                onChange={(e) => setData('satker', e.target.value)}
                                placeholder="Pilih Satuan Kerja"
                                required
                            />

                            <InputError message={errors.satker} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel  htmlFor="email" className="text-main-blue" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukkan Email"
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="no_telp" className="text-main-blue" value="No Telpon" />

                            <TextInput
                                id="no_telp"
                                type="tel"
                                name="No Telp"
                                value={data.no_telp}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="no_telp"
                                onChange={(e) => setData('no_telp', e.target.value)}
                                placeholder="Masukkan Nomor Telpon"
                                required
                            />

                            <InputError message={errors.no_telp} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="password" className="text-main-blue" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan Password"
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                style={{ color: '#00275d' }}
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full h-10"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="Konfirmasi Password"
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div> */}

                        <div className="mt-4 flex-col items-center justify-center">
                            <PrimaryButton className="w-full py-2.5 items-center justify-center"  disabled={processing}>
                                Register
                            </PrimaryButton>

                            <div className="mt-2 flex justify-center items-center text-gray-600 rounded-md text-sm" >
                                Sudah punya akun?
                                <Link href={route('login')}
                                className=" underline ml-1 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                style={{ color: '#1E4AE9' }}
                                >
                                Login
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Foto */}
                <div className="hidden md:flex items-center justify-center">
                    <img
                    src={gedung}
                    alt="Gedung Bea Cukai"
                    className="rounded-xl object-cover max-h-[90%] max-w-[90%]"/>
                </div>
            </div>


        </GuestLayout>
    );
}
