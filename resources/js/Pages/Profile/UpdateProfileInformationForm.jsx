import PrimaryButton from '@/Components/Button/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import AppLayout from '@/Components/Layout/AdminLayout';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon } from "@heroicons/react/24/outline"; // 🔙 icon back dari Heroicons
import { router, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className=''}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    nip: user.nip,
    satker: user.satker,
    no_telp: user.no_telp
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <AppLayout>
      {/* 🔙 Tombol kembali ke halaman profil */}
      <div className="mb-6">
        <button
            onClick={() => router.visit(route('profile.edit'))} // route bawaan Jetstream
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="font-medium">Kembali</span>
        </button>
      </div>

      <section className={className}>
        <header>

        </header>

        <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 sm:rounded-lg">
                    {/* <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2> */}
                    <form onSubmit={submit} className="space-y-6">

                        <div>
                            <InputLabel htmlFor="name" value="Nama" />
                            <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="NIP" />
                            <TextInput
                            id="nip"
                            className="mt-1 block w-full"
                            value={data.nip}
                            onChange={(e) => setData('nip', e.target.value)}
                            required
                            autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Satuan Kerja" />
                            <TextInput
                            id="satker"
                            className="mt-1 block w-full"
                            value={data.satker}
                            onChange={(e) => setData('satker', e.target.value)}
                            required
                            autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="No Telp" />
                            <TextInput
                            id="no_telp"
                            className="mt-1 block w-full"
                            value={data.no_telp}
                            onChange={(e) => setData('no_telp', e.target.value)}
                            required
                            autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>




                        {/* Email Verification */}
                        {/* {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                            <p className="mt-2 text-sm text-gray-800">
                                Your email address is unverified.&nbsp;
                                <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-sm text-indigo-600 underline hover:text-indigo-800 focus:outline-none"
                                >
                                Click here to resend verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                                </div>
                            )}
                            </div>
                        )} */}

                        {/* Save Button */}
                        <div className="flex justify-end items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>

                            <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                            >
                            <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </div>


      </section>
    </AppLayout>
  );
}
