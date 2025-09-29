import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from '../../../images/bea-cukai.png';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="flex flex-col justify-center px-6 sm:px-8 md:px-0 max-w-md mx-auto">

                <div className="flex justify-center mb-4">
                    <img className="w-16 h-auto" src={logo} alt="Logo Kemenkeu" />
                </div>

                <h1 className="text-2xl font-extrabold text-main-blue text-center mb-4">
                    SIMIPANAR
                </h1>

                <div className="mb-4 text-sm text-center text-gray-600">
                    Thanks for signing up! Before getting started, could you verify
                    your email address by clicking on the link we just emailed to
                    you? If you didn't receive the email, we will gladly send you
                    another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-2 flex-col items-center justify-center">
                        <PrimaryButton className="w-full py-2.5 items-center justify-center" disabled={processing}>
                            Resend Verification Email
                        </PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full mt-2 flex-startrounded-md rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>


        </GuestLayout>
    );
}
