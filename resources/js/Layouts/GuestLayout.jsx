
export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="w-full max-w-5xl p-4 md:p-6 lg:p-0 bg-white">
                {children}
            </div>
        </div>
    );
}
