export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `h-10 inline-flex items-center rounded-lg border border-transparent bg-[#00275d] px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-[#001f4a] focus:bg-[#001b40] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-[#001633] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
