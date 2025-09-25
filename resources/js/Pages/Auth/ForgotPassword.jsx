import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import logo from '../../../images/bea-cukai.png';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col justify-center px-6 sm:px-8 md:px-0 max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                <img className="w-16 h-auto" src={logo} alt="Logo Kemenkeu" />
            </div>

            <h1 className="text-2xl font-extrabold text-main-blue text-center mb-6">
                SiMiPaNar
            </h1>

            <div className="mb-4 text-sm text-center text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="w-full py-2.5 items-center justify-center" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
            </div>

        </GuestLayout>
    );
}
