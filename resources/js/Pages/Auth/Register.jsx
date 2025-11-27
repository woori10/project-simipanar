import PrimaryButton from '@/Components/Button/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LoaderOverlay from "@/Components/Loader/LoaderOverlay";
import SuccessModal from '@/Components/Modal/SuccessModal';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import axios from "axios";
import { useEffect, useState } from "react";
import logo from '../../../images/bea-cukai.png';
import gedung from '../../../images/gedung_beacukai.jpg';

export default function Register() {

    const [data, setData] = useState({
        name: '',
        nip: '',
        satker: '',
        no_telp: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(route('register'), data);

            // tampilkan modal
            setSuccessMessage(res.data.message);
            setShowSuccess(true);

            // reset form
            setData({
                name: '',
                nip: '',
                satker: '',
                no_telp: '',
                email: '',
                password: '',
            });

            setErrors({});
            setSuggestions([]);

            // auto-close modal 3 detik
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    };

    const handleSatkerChange = async (e) => {
        const value = e.target.value;
        handleChange('satker', value);

        if (value.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const res = await axios.get(`/admin/satuan-kerja/search?query=${value}`);
            setSuggestions(res.data);
            setShowSuggestions(true);
        } catch (err) {
            console.error("Gagal ambil data satker:", err);
        }
    };

    const handleSelectSatker = (namaSatker) => {
        handleChange('satker', namaSatker);
        setShowSuggestions(false);
    };

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

    return (
        <GuestLayout>
            <LoaderOverlay show={loading} />
            <Head title="Register" />

            <SuccessModal
                show={showSuccess}
                message={successMessage}
            />

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

                        {/* Name */}
                        <div className="mt-2">
                            <InputLabel htmlFor="name" className="text-main-blue" value="Nama Lengkap" />
                            <TextInput
                                id="name"
                                value={data.name}
                                className="mt-1 block w-full h-10 text-gray-500"
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Masukkan Nama Lengkap"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* NIP */}
                        <div className="mt-2">
                            <InputLabel htmlFor="nip" className="text-main-blue" value="NIP" />
                            <TextInput
                                id="nip"
                                value={data.nip}
                                className="mt-1 block w-full h-10 text-gray-500"
                                onChange={(e) => handleChange('nip', e.target.value)}
                                placeholder="Masukkan NIP"
                                required
                            />
                            <InputError message={errors.nip} className="mt-2" />
                        </div>

                        {/* Satker */}
                        <div className="mt-2 relative">
                            <InputLabel htmlFor="satker" className="text-main-blue" value="Satuan Kerja" />
                            <TextInput
                                id="satker"
                                value={data.satker}
                                className="mt-1 block w-full h-10 text-gray-500"
                                autoComplete="off"
                                onChange={handleSatkerChange}
                                placeholder="Pilih Satuan Kerja"
                                required
                            />

                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
                                    {suggestions.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSelectSatker(item.satker)}
                                            className="px-3 py-2 text-gray-800 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                                        >
                                            {item.satker}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <InputError message={errors.satker} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div className="mt-2">
                            <InputLabel htmlFor="email" className="text-main-blue" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full h-10 text-gray-500"
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="Masukkan Email"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* No Telp */}
                        <div className="mt-2">
                            <InputLabel htmlFor="no_telp" className="text-main-blue" value="No Telpon" />
                            <TextInput
                                id="no_telp"
                                value={data.no_telp}
                                className="mt-1 block w-full h-10 text-gray-500"
                                onChange={(e) => handleChange('no_telp', e.target.value)}
                                placeholder="Masukkan Nomor Telpon"
                                required
                            />
                            <InputError message={errors.no_telp} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div className="mt-2">
                            <InputLabel htmlFor="password" className="text-main-blue" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full h-10 text-gray-500"
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="Masukkan Password"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 flex-col items-center justify-center">
                            <PrimaryButton className="w-full py-2.5 items-center justify-center">
                                Register
                            </PrimaryButton>

                            <div className="mt-2 flex justify-center items-center text-gray-600 rounded-md text-sm">
                                Sudah punya akun?
                                <Link href={route('login')}
                                    className=" underline ml-1 hover:text-red-900"
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
                        className="rounded-xl object-cover max-h-[90%] max-w-[90%]"
                    />
                </div>

            </div>

        </GuestLayout>
    );
}
